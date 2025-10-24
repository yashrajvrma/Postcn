import React, { useState } from "react";
import { ChevronRight, Check, X, Edit3, Ellipsis } from "lucide-react";
import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { addRequest } from "@/actions/add-request";
import { NodeType } from "@/types";
import { authClient } from "@/lib/auth/auth-client";
import { addFolder } from "@/actions/add-folder";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  node: NodeModel;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onTextChange: (id: NodeModel["id"], value: string) => void;
  onDelete: (id: NodeModel["id"]) => void;
};

export const CustomNode: React.FC<Props> = ({
  node,
  depth,
  isOpen,
  onToggle,
  onTextChange,
  onDelete,
}) => {
  const queryClient = useQueryClient();

  const [hover, setHover] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { id, text, data } = node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const indent = depth * 24;

  const handleAddNewRequest = async (nodeId: string | number) => {
    console.log("item id is", nodeId);

    // const node = await addRequest({
    //   name: "hello motherfucker",
    //   parentId: nodeId,
    //   type: NodeType.FILE,
    // });

    console.log("result is", JSON.stringify(node));

    if (node) {
      queryClient.invalidateQueries({
        queryKey: ["fetchAllCollection"],
      });
    }
  };

  const handleAddNewFolder = async (nodeId: string | number) => {
    console.log("folder id is", nodeId);

    // const folder = await addFolder({
    //   name: "New Folder",
    //   parentId: nodeId,
    //   type: NodeType.FOLDER,
    // });

    console.log("folder is", JSON.stringify(folder));

    if (folder) {
      queryClient.invalidateQueries({
        queryKey: ["fetchAllCollection"],
      });
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(id);
  };

  const handleShowInput = () => {
    setVisibleInput(true);
    setDropdownOpen(false);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLabelText(e.target.value);

  const handleSubmit = () => {
    setVisibleInput(false);
    onTextChange(id, labelText);
  };

  const dragOverProps = useDragOver(id, isOpen, onToggle);

  return (
    <div
      className="flex items-center h-8 gap-x-2.5 select-none cursor-pointer px-2 hover:bg-sidebar-accent"
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {
        // @ts-ignore
        data.type === "FOLDER" && (
          <div
            onClick={handleToggle}
            className={`flex items-center justify-center w-6 h-6 transition-transform duration-100 text-muted-foreground ml-3.5 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            <ChevronRight strokeWidth={2} className="w-4 h-4" />
          </div>
        )
      }
      <div className="flex items-center gap-2 w-full">
        {visibleInput ? (
          <div
            className="flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-40"
              value={labelText}
              onChange={handleChangeText}
              autoFocus
            />
            <button
              className="p-0.5 rounded-md disabled:opacity-50 hover:bg-green-300"
              onClick={handleSubmit}
              disabled={labelText.trim() === ""}
            >
              <Check className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              className="p-0.5 text-red-500 hover:bg-red-100 rounded-md"
              onClick={handleCancel}
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <div className="flex text-sm w-full" onClick={handleToggle}>
              {text}
            </div>
            <div
              className="flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {(hover || dropdownOpen) && (
                <DropdownMenu
                  open={dropdownOpen}
                  onOpenChange={setDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Ellipsis
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(true);
                      }}
                      strokeWidth={2}
                      className="h-5 w-5 hover:bg-accent p-0.5"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="start">
                    <DropdownMenuGroup>
                      {
                        // @ts-ignore
                        data.type === "FOLDER" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleAddNewRequest(id)}
                            >
                              Add Request
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleAddNewFolder(id)}
                            >
                              Add Folder
                            </DropdownMenuItem>
                          </>
                        )
                      }

                      <DropdownMenuItem onClick={handleShowInput}>
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 hover:bg-red-500 hover:text-neutral-50"
                        onClick={() => onDelete(id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
