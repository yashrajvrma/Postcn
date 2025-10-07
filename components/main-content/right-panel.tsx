import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, CodeXml } from "lucide-react";

export default function RightPanel() {
  return (
    <Tabs defaultValue="code" className="flex flex-row gap-x-2 h-full">
      <div className="flex">
        <TabsList className="flex flex-col h-14 w-10">
          <TabsTrigger value="code">
            <CodeXml />
          </TabsTrigger>
          <TabsTrigger value="agent">
            <Bot />
          </TabsTrigger>
        </TabsList>
      </div>

      <div>
        <TabsContent value="code">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="agent">Change your password here.</TabsContent>
      </div>
    </Tabs>
  );
}
