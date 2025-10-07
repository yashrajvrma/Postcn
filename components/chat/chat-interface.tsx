import { AiChat } from "@/components/animated-ai-input";
import { Command } from "lucide-react";

export default function ChatInterface() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col justify-center items-center my-auto text-center px-5 sm:visible invisible">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square p-3 items-center justify-center rounded-lg">
          <Command className="w-10 h-10" />
        </div>

        <div className="font-semibold text-xl py-3">Ask Postcn Agent</div>
        <div className="text-muted-foreground text-base max-w-sm px-10">
          AI can make mistakes. Remember to review the changes once they’re
          applied.
        </div>
      </div>
      {/* Bottom input */}
      <div className="">
        <AiChat />
      </div>
    </div>
  );
}
