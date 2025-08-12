import HoverPrefetchLink from "@/components/hover-prefetch";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <HoverPrefetchLink href="/" className="text-2xl font-bold">
        Gurukul
      </HoverPrefetchLink>
      <div className="space-x-6 text-lg">
        <HoverPrefetchLink href="/about">About</HoverPrefetchLink>
        <HoverPrefetchLink href="/courses">Courses</HoverPrefetchLink>
        <HoverPrefetchLink href="/contact">Contact</HoverPrefetchLink>
      </div>
    </nav>
  );
}
