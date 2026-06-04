# Helper: append indexing result (browser automation runs via Cursor MCP)
param(
  [string]$Url,
  [ValidateSet('SUCCESS','FAIL','QUOTA')]
  [string]$Status,
  [string]$Message = ''
)
$line = "$(Get-Date -Format 'yyyy-MM-dd') $Status $Url"
if ($Message) { $line += " $Message" }
Add-Content -Path "$PSScriptRoot\..\tasks\indexing-progress.log" -Value $line
