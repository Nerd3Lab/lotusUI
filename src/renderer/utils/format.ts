export const formatBalanceWei = (wei: string): string => {
  return `${(Number(wei) / 1e18).toFixed(4)} ETH`;
};

export function formatTimestamp(timestamp: number): string {
  console.log(timestamp);
  return new Date(timestamp).toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: false,
  });
}
