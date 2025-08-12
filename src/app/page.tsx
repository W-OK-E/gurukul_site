import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Gurukul</h1>

      <main>
        <Hero />
      </main>
      {/* Temporary filler */}
      <div style={{ height: "150vh", background: "#E1E9C9" }}></div>

      <p className="mt-4">End of content!</p>
    </div>
  );
}
