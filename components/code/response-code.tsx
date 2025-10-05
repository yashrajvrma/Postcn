import { Clipboard, Copy } from "lucide-react";
import CodeEditor from "./code-mirror";
import { Button } from "../ui/button";
import { CopyButton } from "../copy-button";

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

  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="text-sm">JSON</div>
        <div>
          <CopyButton
            className="text-foreground bg-transparent hover:bg-accent"
            content={responseContent}
            size="default"
          />
        </div>
      </div>
      <CodeEditor content={responseContent} />
    </div>
  );
}
