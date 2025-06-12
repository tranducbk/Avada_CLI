export default function formatRelativeTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date; // milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 1) return `${days} days ago`;
  if (days === 1) return 'a day ago';
  if (hours > 1) return `${hours} hours ago`;
  if (hours === 1) return 'an hour ago';
  if (minutes > 1) return `${minutes} minutes ago`;
  if (minutes === 1) return 'a minute ago';
  return 'just now';
} 