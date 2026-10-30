Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Runtime.WindowsRuntime

$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -match 'IAsyncOperation`1' } | Select-Object -First 1

function AwaitOperation($asyncOp, $type) {
    $m = $asTaskGeneric.MakeGenericMethod($type)
    $t = $m.Invoke($null, @($asyncOp))
    while (-not $t.IsCompleted) { [System.Threading.Thread]::Sleep(20) }
    if ($t.IsFaulted) { throw $t.Exception }
    return $t.Result
}

$asTaskAction = [System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -match 'IAsyncAction' } | Select-Object -First 1
function AwaitAction($asyncAct) {
    $t = $asTaskAction.Invoke($null, @($asyncAct))
    while (-not $t.IsCompleted) { [System.Threading.Thread]::Sleep(20) }
    if ($t.IsFaulted) { throw $t.Exception }
}

[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null

function Export-Pdf($pdfPath, $outDir, $prefix) {
    if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }
    $fileOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync((Resolve-Path $pdfPath).Path)
    $file = AwaitOperation $fileOp ([Windows.Storage.StorageFile])

    $docOp = [Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)
    $doc = AwaitOperation $docOp ([Windows.Data.Pdf.PdfDocument])

    Write-Output "[$prefix] Total pages: $($doc.PageCount)"

    for ($i = 0; $i -lt $doc.PageCount; $i++) {
        $page = $doc.GetPage($i)
        $stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
        $renderOp = $page.RenderToStreamAsync($stream)
        AwaitAction $renderOp

        $netStream = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($stream)
        $bmp = [System.Drawing.Bitmap]::FromStream($netStream)
        $outPath = Join-Path $outDir ("{0}_page_{1:D2}.jpg" -f $prefix, ($i + 1))
        $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $bmp.Dispose()
        $netStream.Dispose()
        $stream.Dispose()
        $page.Dispose()
        Write-Output "Generated: $outPath"
    }
}

$pdf1 = "C:\Users\chuxi\.gemini\antigravity\brain\2291f89f-eab3-46ee-993b-f26e85abc2e7\.user_uploaded\media_1793332862993_de72fcbb.pdf"
$pdf2 = "C:\Users\chuxi\.gemini\antigravity\brain\2291f89f-eab3-46ee-993b-f26e85abc2e7\.user_uploaded\media_1793332946649_b57bab8b.pdf"
$outDir = "C:\Users\chuxi\.gemini\antigravity\scratch\bespoke-portfolio\assets\pdf_renders"

Export-Pdf $pdf1 $outDir "portfolio"
Export-Pdf $pdf2 $outDir "credentials"
