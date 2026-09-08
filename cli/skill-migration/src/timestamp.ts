function pad(value: number): string {
  return String(value).padStart(2, "0");
}

// Format requested: skills-backup-YYYY-DD-MM-HH-MM-SS
export function backupTimestamp(date = new Date()): string {
  const year = date.getFullYear();
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${day}-${month}-${hours}-${minutes}-${seconds}`;
}
