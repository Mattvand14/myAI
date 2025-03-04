"use client";


import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import ChatInput from "@/components/chat/input";
import ChatMessages from "@/components/chat/messages";
import ChatHeader from "@/components/chat/header";
import useApp from "@/hooks/use-app";

// Define the type for a Billboard entry
interface BillboardEntry {
  rank: number;
  title: string;
  artist: string;
  weeks: number;
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

  // Annotate the state with the BillboardEntry type
  const [billboardData, setBillboardData] = useState<BillboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBillboard() {
      try {
        const res = await fetch("http://localhost:5000/billboard"); // Update URL if needed
        const data = await res.json();
        setBillboardData(data);
      } catch (err: any) {
        console.error("Error fetching Billboard data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBillboard();
  }, []);

  if (loading) return <p>Loading billboard data...</p>;
  if (error) return <p>Error loading billboard data.</p>;

  // Split the data into two halves (positions 1–50 and 51–100)
  const firstHalf = billboardData.slice(0, 50);
  const secondHalf = billboardData.slice(50, 100);

  return (
    <>
      <ChatHeader clearMessages={clearMessages} />
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-screen-lg w-full h-full p-5">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* First 50 songs */}
            <div className="md:w-1/2">
              <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05} className="w-full">
                <div className="p-4 border rounded shadow bg-white">
                  <h2 className="text-xl font-bold mb-2">Billboard Top 100 (1-50)</h2>
                  <ul className="text-sm space-y-1">
                    {firstHalf.map((song, index) => (
                      <li key={index}>
                        {song.rank}. {song.title} - {song.artist} ({song.weeks} wk
                        {song.weeks !== 1 ? "s" : ""})
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt>
            </div>
            {/* Songs 51-100 */}
            <div className="md:w-1/2">
              <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05} className="w-full">
                <div className="p-4 border rounded shadow bg-white">
                  <h2 className="text-xl font-bold mb-2">Billboard Top 100 (51-100)</h2>
                  <ul className="text-sm space-y-1">
                    {secondHalf.map((song, index) => (
                      <li key={index}>
                        {song.rank}. {song.title} - {song.artist} ({song.weeks} wk
                        {song.weeks !== 1 ? "s" : ""})
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt>
            </div>
          </div>
          <ChatMessages messages={messages} indicatorState={indicatorState} />
        </div>
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
