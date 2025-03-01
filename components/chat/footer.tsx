import { FOOTER_MESSAGE } from "@/configuration/ui";
import Link from "next/link";

export default function ChatFooter() {
  return (
    <div className="w-full text-xs flex pt-2 text-gray-500 bg-transparent">
      <div className="flex-grow text-left">
        {/* Left Pane */}
        <Link href="/terms" className="hover:underline text-white">
          Terms of Service
        </Link>
      </div>
      <div className="flex-grow text-center text-white">
        {/* Center Pane */}
        {FOOTER_MESSAGE}
      </div>
      <div className="flex-grow text-right text-white">
        {/* Right Pane */}
        {/* Do not remove or modify the following message. Removal or modification violates the license agreement. */}
        <a
          href="http://www.ringel.ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          powered by ringel.AI
        </a>
      </div>
    </div>
  );
}
