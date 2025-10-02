"use client";

import { Clipboard, Copy } from "lucide-react";
import CodeEditor from "./code-mirror";
import { Button } from "../ui/button";

export default function ResponseCode() {
  const responseContent = `{
    "success": true,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFlcy5jb20iLCJpYXQiOjE3NTkxNzkyNDIsImV4cCI6MTc1OTI2NTY0Mn0.TuhbBBV8BgHClPqY8ntDfFwPeKFH-M9I06mpn_iu3dA",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFlcy5jb20iLCJpYXQiOjE3NTkxNzkyNDIsImV4cCI6MTc1OTQzODQ0Mn0.n4uy2J477DvBXfyZcY8-xH6HjJRE0_aapGo5zFwlEQY",
        "role": "admin"
    },
    "message": "Login successful"
}`;

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      console.log("code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };
  return (
    <div>
      <div className="flex justify-between w-full">
        <div>JSON</div>
        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleCopy(responseContent)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CodeEditor content={responseContent} />
    </div>
  );
}
