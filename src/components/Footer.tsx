export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm p-4 space-y-1">
      <p>© {new Date().getFullYear()} Gurukul. All rights reserved.</p>
      <p className="text-gray-500">
        Icons by{" "}
      <a href="https://www.flaticon.com/free-icons/" title="music icons">Freepik - Flaticon</a>
      </p>
    </footer>
  );
}
