param(
    [string]$pdfPath,
    [string]$outDir,
    [string]$prefix
)

if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }

$bytes = [System.IO.File]::ReadAllBytes($pdfPath)
$len = $bytes.Length

$soi = [byte[]]@(0xFF, 0xD8)
$eoi = [byte[]]@(0xFF, 0xD9)

$count = 0
$i = 0
while ($i -lt ($len - 1)) {
    if ($bytes[$i] -eq 0xFF -and $bytes[$i+1] -eq 0xD8) {
        $start = $i
        $j = $start + 2
        while ($j -lt ($len - 1)) {
            if ($bytes[$j] -eq 0xFF -and $bytes[$j+1] -eq 0xD9) {
                $end = $j + 2
                $imgLen = $end - $start
                if ($imgLen -gt 15000) { # Filter out tiny icons
                    $count++
                    $imgBytes = New-Object byte[] $imgLen
                    [System.Array]::Copy($bytes, $start, $imgBytes, 0, $imgLen)
                    $outPath = Join-Path $outDir ("{0}_img_{1:D3}.jpg" -f $prefix, $count)
                    [System.IO.File]::WriteAllBytes($outPath, $imgBytes)
                    Write-Output "Extracted: $outPath ($imgLen bytes)"
                }
                $i = $end
                break
            }
            $j++
        }
        if ($j -ge ($len - 1)) { $i++ }
    } else {
        $i++
    }
}
Write-Output "[$prefix] Total extracted images: $count"
