import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <TabsContent value="body">Make changes to your body here.</TabsContent>
      <TabsContent value="cookies">Cookies here</TabsContent>
      <TabsContent value="headers">Headers here</TabsContent>
    </Tabs>
  );
}
