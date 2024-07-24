import Image from "next/image";
import "./globals.css";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Section 1</h2>
            <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Section 2</h2>
            <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Section 3</h2>
            <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </main>
    </div >
  );
}
