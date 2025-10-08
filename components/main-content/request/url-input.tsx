// @ts-nocheck

import { ChevronDown } from "lucide-react";
import { MethodSelector } from "./method-selector";
import { Input } from "@/components/ui/input";

export const UrlInput = ({
  url,
  onUrlChange,
  method,
  onMethodChange,
  onSend,
}) => {
  return (
    <div className="flex items-center px-4 py-3  border-b ">
      <div className="flex items-center flex-1 rounded overflow-hidden">
        <MethodSelector method={method} onChange={onMethodChange} />
        <Input
          type="text"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          className="flex-1 px-4 py-2 focus:outline-none"
          placeholder="Enter request URL"
        />
      </div>
      <button
        onClick={onSend}
        className="ml-3 flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded"
      >
        Send
        <ChevronDown className="w-3 h-3" />
      </button>
    </div>
  );
};
