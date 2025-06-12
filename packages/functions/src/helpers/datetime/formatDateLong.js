export default function formatDateToLongString(dateStr = new Date()) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `From ${month} ${day}, ${year}`;
} 