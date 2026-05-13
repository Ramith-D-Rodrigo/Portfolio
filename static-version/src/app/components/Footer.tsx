export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center py-2 text-gray-100 bg-gray-800">
      <p>© {year} Ramith Rodrigo. All rights reserved.</p>
    </footer>
  );
}
