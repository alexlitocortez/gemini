"use client";

import Image from "next/image";
import "./globals.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState, ChangeEvent } from "react";

// 

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

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string
  const apiModel = process.env.NEXT_PUBLIC_MODEL_NAME as string
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: apiModel })

  const prompt = "Give me a workout for biceps";
  const [genText, setGenText] = useState<string>()
  const [checkboxes, setCheckboxes] = useState<CheckboxState>(initialCheckboxState);

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

  const fetchData = async () => {
    try {
      const result = await model.generateContent(createWorkoutPlan())
      setGenText(result.response.text())
      console.log(result.response.text())
    } catch (error) {
      console.error("Error generating content:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          <h1>Select muscle groups to create a workout plan</h1>
          <div className="flex flex-col items-start mb-4 p-4 border border-gray-300 rounded-lg shadow-lg">
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
            {/* <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-2xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Back</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Biceps</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Chest</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Triceps</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Shoulders</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Legs</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Abs</label>
            </div>
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Calves</label>
            </div> */}
          </div>
          <button className="border border-gray-50" onClick={() => alert(fetchData())}>Submit</button>
          <div className="bg-black p-6 rounded-lg shadow-md">
            <p className="text-white">{genText}</p>
          </div>
        </div>
      </main >
    </div >
  );
}
