import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResponseCode from "../code/response-code";
import CodeEditor from "../code/code-mirror";

export default function ResponsePanel() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="flex justify-between w-full">
        <div>
          <TabsTrigger value="body">Body</TabsTrigger>
          <TabsTrigger value="cookies">Cookies</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
        </div>
        <div>
          <TabsTrigger value="statusCode">200 OK</TabsTrigger>
          <TabsTrigger value="responseTime">700ms</TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="body">
        {/* <ResponseCode /> */}
        <CodeEditor
          filename="index.js"
          content={`
            {
    "success": true,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFlcy5jb20iLCJpYXQiOjE3NTkxNzkyNDIsImV4cCI6MTc1OTI2NTY0Mn0.TuhbBBV8BgHClPqY8ntDfFwPeKFH-M9I06mpn_iu3dA",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFlcy5jb20iLCJpYXQiOjE3NTkxNzkyNDIsImV4cCI6MTc1OTQzODQ0Mn0.n4uy2J477DvBXfyZcY8-xH6HjJRE0_aapGo5zFwlEQY",
        "role": "admin"
    },
    "message": "Login successful"
}`}
        />
      </TabsContent>
      <TabsContent value="cookies">Cookies here</TabsContent>
      <TabsContent value="headers">Headers here</TabsContent>
    </Tabs>
  );
}
