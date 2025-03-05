"use client";
import { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import ChatInput from "@/components/chat/input";
import ChatMessages from "@/components/chat/messages";
import useApp from "@/hooks/use-app";
import ChatHeader from "@/components/chat/header";

interface BillboardEntry {
  title: string;
  artist: string;
}

interface BillboardData {
  first_half: BillboardEntry[];
  second_half: BillboardEntry[];
}

export default function Chat() {
  const {
    messages,
    handleInputChange,
    handleSubmit,
    input,
    isLoading,
    indicatorState,
    clearMessages,
  } = useApp();

  const [billboardData, setBillboardData] = useState<BillboardData>({
    first_half: [],
    second_half: [],
  });

  useEffect(() => {
    async function fetchBillboard() {
      try {
        const res = await fetch("/billboard.json");
        if (!res.ok) {
          console.error("Error fetching Billboard data:", res.statusText);
          return;
        }
        const data = await res.json();
        setBillboardData(data);
      } catch (err) {
        console.error("Error fetching Billboard data:", err);
      }
    }
    fetchBillboard();
  }, []);

  return (
    <>
      <ChatHeader clearMessages={clearMessages} />
      <div className="flex justify-center items-center h-screen">
        {/* Left Tilt Panel: First Half */}
        <Tilt className="w-1/4 p-4" tiltMaxAngleX={10} tiltMaxAngleY={10}>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg p-6 rounded-2xl h-[70vh] overflow-y-auto transition duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Top 100 - First Half</h2>
            <ul className="text-white">
              {billboardData.first_half.map((entry, index) => (
                <li key={index} className="mb-2">
                  <span className="font-bold mr-2">{index + 1}.</span>
                  <span className="text-sm">{entry.title}</span> by {entry.artist}
                </li>
              ))}
            </ul>
          </div>
        </Tilt>

        {/* Center: Chat Messages */}
        <div className="flex flex-col max-w-screen-lg w-full h-full p-5">
          <ChatMessages messages={messages} indicatorState={indicatorState} />
        </div>

        {/* Right Tilt Panel: Second Half */}
        <Tilt className="w-1/4 p-4" tiltMaxAngleX={10} tiltMaxAngleY={10}>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg p-6 rounded-2xl h-[70vh] overflow-y-auto transition duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Top 100 - First Half</h2>
            <ul className="text-white">
              {billboardData.second_half.map((entry, index) => (
                <li key={index} className="mb-2">
                  <span className="font-bold mr-2">{index + 1}.</span>
                  <span className="text-sm">{entry.title}</span> by {entry.artist}
                </li>
              ))}
            </ul>
          </div>
        </Tilt>


      </div>
      <ChatInput
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        isLoading={isLoading}
      />
    </>
  );
}
