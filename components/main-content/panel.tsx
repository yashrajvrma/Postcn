import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ResponsePanel from "@/components/main-content/response-panel";
import RightPanel from "@/components/main-content/right-panel";
import RequestPanel from "@/components/main-content/request/request-panel";

export default function Panel() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full w-full overflow-hidden"
    >
      <ResizablePanel defaultSize={80} className="h-full">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={55}>
            {/* <div className="flex items-center justify-center h-full">
              <span className="font-semibold">one</span>
            </div> */}
            <RequestPanel />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            className="sm:min-h-9"
            defaultSize={45}
            maxSize={80}
            // minSize={4}
          >
            <ResponsePanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={20}
        // minSize={2.5}
        maxSize={40}
        className="h-full sm:min-w-10"
      >
        <RightPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
