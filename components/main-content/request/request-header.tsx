import React, { useState } from "react";
import {
  ChevronDown,
  Save,
  Share,
  Link,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

export const RequestHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3  border-b ">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-secondary text-sm">
          <span className="font-mono">≡≡≡</span>
          <span className="">backend</span>
          <span className="">/</span>
          <span className="">test</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm  hover: rounded">
          <Save className="w-4 h-4" />
          Save
          <ChevronDown className="w-3 h-3" />
        </button>
        <button className="px-4 py-1.5 text-sm   hover: rounded">Share</button>
        <button className="p-1.5  hover: rounded">
          <Link className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
