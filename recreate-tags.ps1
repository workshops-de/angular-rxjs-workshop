# First, delete all old tags
$deletedTags = git tag | ForEach-Object { git tag -d $_ }

# Read all commits (one per line)
$logs = git log --oneline

# Process each line of the git log
$logs -split "`n" | ForEach-Object {
    # Split the line into SHA and the rest of the message by the first space
    $parts = $_ -split ' ', 2
    $sha = $parts[0]
    $message = $parts[1]

    # Replace special characters in the commit message
    $message = $message -replace ' ', '-'
    $message = $message -replace '\*', ''
    $message = $message -replace '\(', ''
    $message = $message -replace '\)', ''

    # Create the tag and output the message
    git tag $message $sha
    Write-Output $message
}