export const formatBalanceFromRaw = (wei: string): string => {
  return `${(Number(wei) / 1e9).toFixed(2)}`;
};

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: false,
  });
}

export const formatAddress = (address: string): string => {
  if (!address || address.length < 8) return address;
  return `${address.slice(0, 10)}...${address.slice(-10)}`;
};
