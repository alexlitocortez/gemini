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
        setGenText(result.response.text())
        console.log(result.response.text());
      } catch (error) {
        console.error("Error generating content:", error);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Enter Prompt</label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input type="text" name="prompt" id="prompt" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Enter Prompt" />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label className="sr-only">Enter Prompt</label>
              </div>
            </div>
          </div>
          <div>
            <input type="radio" id="option1" name="options" value="1" className="hidden" />
            <label className="inline-flex items-center cursor-pointer">
              <span className="w-4 h-4 inline-block mr-2 border border-gray-300 rounded-full flex-no-shrink"></span>
              Back
            </label>
          </div>
          <div>
            <input type="radio" id="option2" name="options" value="2" className="hidden" />
            <label className="inline-flex items-center cursor-pointer">
              <span className="w-4 h-4 inline-block mr-2 border border-gray-300 rounded-full flex-no-shrink"></span>
              Biceps
            </label>
          </div>
          <div>
            <input type="radio" id="option2" name="options" value="2" className="hidden" />
            <label className="inline-flex items-center cursor-pointer">
              <span className="w-4 h-4 inline-block mr-2 border border-gray-300 rounded-full flex-no-shrink"></span>
              Chest
            </label>
          </div>
          <div>
            <input type="radio" id="option2" name="options" value="2" className="hidden" />
            <label className="inline-flex items-center cursor-pointer">
              <span className="w-4 h-4 inline-block mr-2 border border-gray-300 rounded-full flex-no-shrink"></span>
              Triceps
            </label>
          </div>
          <div>
            <input type="radio" id="option2" name="options" value="2" className="hidden" />
            <label className="inline-flex items-center cursor-pointer">
              <span className="w-4 h-4 inline-block mr-2 border border-gray-300 rounded-full flex-no-shrink"></span>
              Shoulders
            </label>
          </div>
          <div>
            <input type="radio" id="option2" name="options" value="2" className="hidden" />
            <label className="inline-flex items-center cursor-pointer">
              <span className="w-4 h-4 inline-block mr-2 border border-gray-300 rounded-full flex-no-shrink"></span>
              Legs
            </label>
          </div>
          <div>
            <input type="radio" id="option2" name="options" value="2" className="hidden" />
            <label className="inline-flex items-center cursor-pointer">
              <span className="w-4 h-4 inline-block mr-2 border border-gray-300 rounded-full flex-no-shrink"></span>
              Abs
            </label>
          </div>
          <div>
            <input type="radio" id="option2" name="options" value="2" className="hidden" />
            <label className="inline-flex items-center cursor-pointer">
              <span className="w-4 h-4 inline-block mr-2 border border-gray-300 rounded-full flex-no-shrink"></span>
              Calfs
            </label>
          </div>

          <div className="bg-black p-6 rounded-lg shadow-md">
            <p className="text-white">{genText}</p>
          </div>
        </div>
      </main>
    </div >
  );
}
