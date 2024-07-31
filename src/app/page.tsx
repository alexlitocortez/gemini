"use client";

import Image from "next/image";
import "./globals.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useState, ChangeEvent } from "react";
import { Puff } from "react-loader-spinner";

// MAKE PAGE LOOK NICE

type CheckboxState = {
  [key: string]: boolean;
};

const initialCheckboxState: CheckboxState = {
  back: false,
  biceps: false,
  chest: false,
  triceps: false,
  shoulders: false,
  legs: false,
  abs: false,
  calves: false,
};

interface TextWithLineBreaksProps {
  sentences: string[];
}

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string
  const apiModel = process.env.NEXT_PUBLIC_MODEL_NAME as string
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: apiModel })

  const prompt = "Give me a workout for biceps";
  const [genText, setGenText] = useState<string[]>([]);
  const [checkboxes, setCheckboxes] = useState<CheckboxState>(initialCheckboxState);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setCheckboxes((prev) => ({
      ...prev,
      [id]: checked,
    }));

    console.log("checkboxes", checkboxes)
  };

  // Function to get checked values as a string
  const getCheckedValuesString = () => {
    const checkedValues = Object.keys(checkboxes).filter((key) => checkboxes[key]);
    const newValues = checkedValues.join(', ');
    console.log("newValues", newValues)
    return newValues;
  };

  // Function to submit prompt to Gemini
  const createWorkoutPlan = () => {
    const checkedValuesString = getCheckedValuesString();
    return `Create workout plan for: ${checkedValuesString}`
  }

  const TextWithLineBreaks: React.FC<TextWithLineBreaksProps> = ({ sentences }) => {
    const formattedText = [];

    for (let i = 0; i < sentences.length; i++) {
      formattedText.push(sentences[i]);
      if ((i + 1) % 2 === 0 && i !== sentences.length - 1) {
        formattedText.push(
          <>
            <br key={`br-${i}`} />
            <br />
          </>
        );
      }
    }

    return <div>{formattedText}</div>;
  };

  const fetchData = async () => {
    try {
      setTimeout(() => {
        setLoading(false); // Set loading to false when fetch completes
      }, 3000)
    } catch (error) {
      console.error("Error generating content:", error)
    } finally {
      setLoading(true)
      const result = await model.generateContent(createWorkoutPlan())
      const resultWithoutAsterisks = result?.response?.text().replace(/[#*]/g, '')
      const lineBreaks = resultWithoutAsterisks?.match(/[^.!?]+[.!?]+/g) || []
      setGenText(lineBreaks)
      console.log("genText", genText)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white justify-center">
      <h1 className="gradient-text text-4xl p-3 font-extrabold">WorkoutPlan</h1>
      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          <div className="flex flex-col mb-4 p-4 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-b from-blue-500 to-purple-600">
            <h3 className="text-white p-3 mb-3">Select muscle groups to create a workout plan</h3>
            <div>
              {Object.keys(checkboxes).map((key) => (
                <div key={key} className="flex items-center mb-4">
                  <input
                    id={key}
                    type="checkbox"
                    checked={checkboxes[key]}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={key} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize">
                    {key}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button className="p-3 rounded transition-transform transform hover:scale-105 bg-purple-950 lg:w-1/2" onClick={() => fetchData()}>Submit</button>
            </div>
          </div>

          <div className="p-6 rounded-lg shadow-md bg-gradient-to-b from-pink-500 to-orange-500">
            {loading ? (
              <div className="flex justify-center">
                <Puff
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              </div>
            ) : (
              genText.length > 0 && <TextWithLineBreaks sentences={genText} /> // Show content when loaded
            )}
          </div>
        </div>
      </main >
    </div >
  );
}
