import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResponseCode from "../code/response-code";

export default function ResponsePanel() {
  return (
    <Tabs defaultValue="body" className="w-full">
      <TabsList className="flex justify-between w-full p-1">
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
      <div className="p-1">
        <TabsContent value="body">
          <ResponseCode />
        </TabsContent>
        <TabsContent value="cookies">Cookies here</TabsContent>
        <TabsContent value="headers">Headers here</TabsContent>
      </div>
    </Tabs>
  );
}
