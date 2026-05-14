const commitCheatsheetDownloadButton = document.getElementById("downloadCommitCheatsheet") as HTMLButtonElement | null;
const commitCheatsheetDownloadStatus = document.getElementById("downloadCommitCheatsheetStatus");
const commitCheatsheetMarkdownSource = document.getElementById("commitCheatsheetMarkdown");

function setCommitCheatsheetStatus(message: string): void {
  if (commitCheatsheetDownloadStatus) {
    commitCheatsheetDownloadStatus.textContent = message;
  }
}

function downloadCommitCheatsheetMarkdown(): void {
  if (!commitCheatsheetMarkdownSource?.textContent) {
    setCommitCheatsheetStatus("Markdown source was not found.");
    return;
  }

  const markdown = commitCheatsheetMarkdownSource.textContent.trim();
  const blob = new Blob([`${markdown}\n`], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "git-commit-github-cheatsheet.md";
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 0);
  setCommitCheatsheetStatus("Downloaded git-commit-github-cheatsheet.md");
}

if (commitCheatsheetDownloadButton) {
  commitCheatsheetDownloadButton.addEventListener("click", downloadCommitCheatsheetMarkdown);
}
