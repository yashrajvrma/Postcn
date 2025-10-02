import { AppSidebar } from "@/components/app-sidebar";
import Panel from "@/components/main-content/panel";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// export const iframeHeight = "800px";

// export const description = "A sidebar with a header and a search form.";

// export default function Page() {
//   return (
//     <div className="[--header-height:calc(--spacing(14))]">
//       <SidebarProvider className="flex flex-col">
//         <SiteHeader />
//         <div className="flex flex-1">
//           <AppSidebar />
//           <SidebarInset>
//             <div className="overflow-hidden">
//               <Panel />
//             </div>
//           </SidebarInset>
//         </div>
//       </SidebarProvider>
//     </div>
//   );
// }

export default function Page() {
  return (
    <div className="h-screen [--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col h-full">
        <SiteHeader />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <SidebarInset className="flex-1 overflow-hidden">
            <Panel />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
