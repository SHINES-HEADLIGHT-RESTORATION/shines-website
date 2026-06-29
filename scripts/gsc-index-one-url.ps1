# Open Google Search Console URL Inspection for one URL (manual step still required).
param(
  [Parameter(Mandatory = $true)]
  [string]$Url
)

$encoded = [uri]::EscapeDataString($Url)
$gsc = "https://search.google.com/search-console/inspect?resource_id=sc-domain:shines.be&url=$encoded"
Write-Host "Opening GSC URL Inspection for:`n  $Url`n"
Start-Process $gsc
