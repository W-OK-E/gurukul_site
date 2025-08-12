// import HoverPrefetchLink from 'next/HoverPrefetchLink';

import HoverPrefetchLink from '@/components/hover-prefetch';

// Okay so below you will see that in the HoverPrefetchLinks where the tag where HoverPrefetchLink has been used, the 
// HoverPrefetchLink prefetches the content when you hover over it, if normal tags are used, the HoverPrefetchLink doesn't 
// prefetch it ad there is a noticeable delay in the loading of the page.
export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <HoverPrefetchLink href="/" className="text-2xl font-bold">
        Gurukul
      </HoverPrefetchLink>
      <div className="space-x-4 text-lg">
        <HoverPrefetchLink href="/about" className="hover:text-gray-300">About</HoverPrefetchLink>
        <HoverPrefetchLink href="/courses" className="hover:text-gray-300">Courses</HoverPrefetchLink>
        <HoverPrefetchLink href="/contact" className="hover:text-gray-300">Contact</HoverPrefetchLink>
      </div>
    </nav>
  );
}
