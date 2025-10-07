import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, CodeXml } from "lucide-react";
import ChatInterface from "@/components/chat/chat-interface";

export default function RightPanel() {
  return (
    <Tabs
      defaultValue="agent"
      className="flex flex-row h-screen w-full overflow-hidden"
    >
      <div className="flex h-full">
        <TabsList className="flex flex-col h-14 w-10">
          <TabsTrigger value="code">
            <CodeXml />
          </TabsTrigger>
          <TabsTrigger value="agent">
            <Bot />
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="flex flex-col h-full w-full pr-2">
        <TabsContent value="code" className="h-full">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="agent" className="h-full">
          <ChatInterface />
        </TabsContent>
      </div>
    </Tabs>
  );
}
