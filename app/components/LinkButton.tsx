// This is a "Child Component". Its only job is to look like a button.
// It receives "Props" (properties) from the parent page.

interface LinkButtonProps {
  label: string;
  url: string;
  onItemClick: () => void; // A function that tells the parent "I was clicked!"
}

export default function LinkButton({ label, url, onItemClick }: LinkButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onItemClick}
      className="block w-full p-4 text-center bg-white border-2 border-gray-100 rounded-2xl font-semibold shadow-sm hover:shadow-md hover:border-blue-400 hover:-translate-y-1 transition-all duration-200"
    >
      {label}
    </a>
  );
}