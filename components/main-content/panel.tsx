import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { CodeXml, Bot } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

export default function Panel() {
  return (
    <div>
      {/* <ResizablePanelGroup direction="horizontal" className="h-screen">
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>one</ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25}>two</ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20} minSize={2.5} maxSize={30}>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="flex flex-col h-full">
              <TabsTrigger value="account">
                <CodeXml />
              </TabsTrigger>
              <TabsTrigger value="password">
                <Bot />
              </TabsTrigger>
            </TabsList>
            <TabsContent className="text-wrap" value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup> */}
      <ResizablePanelGroup
        direction="horizontal"
        // className="max-w-md rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={80} className="h-screen">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={55}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">one</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={45} maxSize={80} minSize={12}>
              <div className="flex items-center justify-center p-6">
                <span className="font-semibold">two</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20} minSize={2.5} maxSize={30}>
          {/* <div className="flex items-center justify-center p-6">
            <span className="font-semibold">three</span>
          </div> */}
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="flex flex-col h-full">
              <TabsTrigger value="account">
                <CodeXml />
              </TabsTrigger>
              <TabsTrigger value="password">
                <Bot />
              </TabsTrigger>
            </TabsList>
            <TabsContent className="text-wrap" value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
