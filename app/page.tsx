"use client";

import React from "react";
import ChatInput from "@/components/chat/input";
import ChatMessages from "@/components/chat/messages";
import useApp from "@/hooks/use-app";
import ChatHeader from "@/components/chat/header";
import BillboardTilt from "@/components/BillboardTilt";
import useBillboardData from "@/hooks/useBillboardData";

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

  const { billboardData, loading, error } = useBillboardData();

  if (loading) return <p>Loading billboard data...</p>;
  if (error) return <p>Error loading billboard data.</p>;

  // Split the Billboard data into two halves (positions 1-50 and 51-100)
  const firstHalf = billboardData.slice(0, 50);
  const secondHalf = billboardData.slice(50, 100);

  return (
    <>
      <ChatHeader clearMessages={clearMessages} />
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-screen-lg w-full h-full p-5">
          {/* Billboard Tilt Components */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="md:w-1/2">
              <BillboardTilt songs={firstHalf} title="Billboard Top 100 (1-50)" />
            </div>
            <div className="md:w-1/2">
              <BillboardTilt songs={secondHalf} title="Billboard Top 100 (51-100)" />
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
