import { Plus, Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import CreateNewCollection from "./collection/create-new-collection";
import toast from "react-hot-toast";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <div className="flex gap-x-1 items-center">
      <CreateNewCollection />

      <form {...props}>
        <div
          className="relative"
          onClick={() =>
            toast("Coding hard to make it live", {
              icon: "😓",
            })
          }
        >
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search collections"
            className="h-8 pl-7"
            disabled
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </div>
      </form>
    </div>
  );
}
