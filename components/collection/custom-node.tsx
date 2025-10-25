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
import { Button } from "@/components/ui/button";
import { addRequest } from "@/actions/add-request";
import { NodeType } from "@/types";
import { addFolder } from "@/actions/add-folder";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import lodash from "lodash";

type Props = {
  node: NodeModel;
  depth: number;
  isOpen: boolean;
  isSelected: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onTextChange: (id: NodeModel["id"], value: string) => void;
  onDelete: (id: NodeModel["id"]) => void;
  onSelect: (node: NodeModel) => void;
};

export const CustomNode: React.FC<Props> = (props) => {
  const queryClient = useQueryClient();

  const { id, text, data } = props.node;
  const {
    onToggle,
    onTextChange,
    onDelete,
    onSelect,
    node,
    depth,
    isOpen,
    isSelected,
  } = props;

  const [hover, setHover] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState<string>("");

  const indent = props.depth * 24;

  const handleSelect = () => {
    onSelect(node);
    console.log("handleSelect", node);
  };

  const handleAddNewRequest = async (nodeId: string | number) => {
    console.log("item id is", nodeId);

    const request = await addRequest({
      name: "New Request",
      parentId: nodeId,
      type: NodeType.FILE,
    });

    console.log("result is", JSON.stringify(request));

    if (request) {
      queryClient.invalidateQueries({
        queryKey: ["fetchAllCollection"],
      });
      if (request?.parentId) {
        props.onToggle(request.parentId);
        console.log("toggled");
      }
    }
  };

  const handleAddNewFolder = async (nodeId: string | number) => {
    console.log("folder id is", nodeId);

    const folder = await addFolder({
      name: "New Folder",
      parentId: nodeId,
      type: NodeType.FOLDER,
    });

    console.log("folder is", JSON.stringify(folder));

    if (folder) {
      queryClient.invalidateQueries({
        queryKey: ["fetchAllCollection"],
      });
      if (folder?.parentId) {
        props.onToggle(folder.parentId);
        console.log("toggled");
      }
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
      className={cn(
        "flex items-center h-8 gap-x-2.5 cursor-pointer px-2",
        isSelected
          ? "bg-secondary text-secondary-foreground"
          : "hover:bg-sidebar-accent"
      )}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleToggle}
    >
      {
        // @ts-ignore
        data.type === "FOLDER" && (
          <div
            className={cn(
              "flex items-center justify-center w-6 h-6 transition-transform duration-100 text-muted-foreground ml-3.5",
              isOpen ? "rotate-90" : "rotate-0",
              isSelected && "text-secondary-foreground"
            )}
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
            <Input
              className="rounded-md text-sm focus:outline-none w-[90%] h-full"
              value={labelText}
              onChange={handleChangeText}
              autoFocus
            />
            <Button
              className="disabled:opacity-50"
              onClick={handleSubmit}
              disabled={labelText.trim() === ""}
              size="sm"
              variant="default"
            >
              <Check className="w-5 h-5" strokeWidth={2} />
            </Button>
            <Button
              variant="destructive"
              // className="text-accent-foreground bg-red-400"
              onClick={handleCancel}
              size="sm"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </Button>
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <div className="flex text-sm w-full" onClick={handleSelect}>
              {/* {text} */}
              {lodash.truncate(text, {
                length: 25,
              })}
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
                      // className="h-5 w-5 hover:bg-accent p-0.5"
                      className={cn(
                        "h-5 w-5 p-0.5",
                        isSelected ? "hover:bg-transparent" : "hover:bg-accent"
                      )}
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
