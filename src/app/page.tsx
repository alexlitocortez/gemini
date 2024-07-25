"use client";

import Image from "next/image";
import "./globals.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";

// FIND OUT A WAY TO ADD ENV KEYWORDS WITHOUT ACTUALLY USING ACTUAL STRINGS


export default function Home() {
  const apiKey = process.env.API_KEY as string
  const apiModel = process.env.MODEL_NAME as string
  const genAI = new GoogleGenerativeAI("AIzaSyDituK8rBLGWGiIpo0t2krESRCFEJ2dH80");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const prompt = "Write a story about basketball.";
  const [genText, setGenText] = useState<string>()

  useEffect(() => {
    // Define an async function
    const fetchData = async () => {
      try {
        const result = await model.generateContent(prompt);
        // setGenText(result.response.text())
        console.log(result.response.text());
      } catch (error) {
        console.error("Error generating content:", error);
      }
    };

    // Call the async function
    fetchData();
  }, [model, prompt]);

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
          <div className="bg-black p-6 rounded-lg shadow-md">
            {/* <p className="text-white">{genText}</p> */}
          </div>
        </div>
      </main>
    </div >
  );
}
