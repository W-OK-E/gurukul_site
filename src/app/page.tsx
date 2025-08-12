import Hero from "@/components/Hero";


export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Gurukul</h1>
      <p className="text-lg mb-6">Scroll down to see the footer...</p>

      <main>
        <Hero />
      </main>
      {/* Temporary filler */}
      <div style={{ height: '150vh', background: '#E1E9C9' }}></div>

      <p className="mt-4">End of content!</p>
    </div>
  );
}
