param([string]$DocxPath, [string]$PdfPath)
$ErrorActionPreference = 'Stop'
$cvWord = $null
$cvDoc = $null
$cvExportPath = Join-Path ([System.IO.Path]::GetDirectoryName($PdfPath)) ('cv-export-' + [guid]::NewGuid().ToString('N') + '.pdf')
try {
    $cvWord = New-Object -ComObject Word.Application
    $cvWord.Visible = $false
    $cvWord.DisplayAlerts = 0
    $cvDoc = $cvWord.Documents.Open($DocxPath, $false, $true, $false)
    $cvDoc.Repaginate()
    $cvDoc.ExportAsFixedFormat($cvExportPath, 17, $false, 0, 0, 1, 1, 0, $true, $true, 1, $true, $true, $false)
    Move-Item -LiteralPath $cvExportPath -Destination $PdfPath -Force
    Write-Output "PDF exportado con Microsoft Word. Paginas: $($cvDoc.ComputeStatistics(2))"
} finally {
    if ($null -ne $cvDoc) { $cvDoc.Close(0); [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($cvDoc) }
    if ($null -ne $cvWord) {
        if ($cvWord.Documents.Count -eq 0) { $cvWord.Quit() }
        [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($cvWord)
    }
}
