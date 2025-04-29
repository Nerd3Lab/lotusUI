export function formatTimestamp(timestamp: number): string {
  console.log(timestamp);
  return new Date(timestamp).toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: false
  });
}
