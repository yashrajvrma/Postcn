import { AppSidebar } from "@/components/app-sidebar";
import Panel from "@/components/main-content/panel";
import { SiteHeader } from "@/components/site-header";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth/auth-server";
import { Bot, CodeXml } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// export const iframeHeight = "800px";

// export const description = "A sidebar with a header and a search form.";

export default function Page() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            {/* <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div> */}
            {/* <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={80}>One</ResizablePanel>
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
            <Panel />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
