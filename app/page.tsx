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
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg p-6 rounded-2xl h-[70vh] overflow-y-auto scrollbar-hide transition duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Billboard Top 100: 1-50</h2>
            <ul className="text-white">
              {billboardData.first_half.map((entry, index) => (
                <li key={index} className="mb-2">
                  <span className="font-bold mr-2 text-large">{index + 1}.</span>
                  <span className="font-bold text-base mr-2">{entry.title}</span>
                  <span className="text-sm">by {entry.artist}</span>
                </li>
              ))}
            </ul>
            <style jsx global>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </div>
        </Tilt>

        {/* Center: Chat Messages */}
        <div className="flex flex-col max-w-screen-lg w-full h-full p-5">
          <ChatMessages messages={messages} indicatorState={indicatorState} />
        </div>

        {/* Right Tilt Panel: Second Half */}
        <Tilt className="w-1/4 p-4" tiltMaxAngleX={10} tiltMaxAngleY={10}>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg p-6 rounded-2xl h-[70vh] overflow-y-auto scrollbar-hide transition duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Billboard Top 100: 51-100</h2>
            <ul className="text-white">
              {billboardData.second_half.map((entry, index) => (
                <li key={index} className="mb-2">
                  <span className="font-bold mr-2 text-large">{index + 51}.</span>
                  <span className="font-bold text-base mr-2">{entry.title}</span>
                  <span className="text-sm">by {entry.artist}</span>
                </li>
              ))}
            </ul>
            <style jsx global>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
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
