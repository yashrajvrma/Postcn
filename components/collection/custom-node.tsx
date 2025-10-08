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
// import { CustomData } from "./types";

type Props = {
  node: NodeModel;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onTextChange: (id: NodeModel["id"], value: string) => void;
};

export const CustomNode: React.FC<Props> = ({
  node,
  depth,
  isOpen,
  onToggle,
  onTextChange,
}) => {
  const [hover, setHover] = useState<boolean>(false);

  const { id, text, droppable } = node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const indent = depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(id);
  };

  const handleShowInput = () => setVisibleInput(true);
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
      className="flex items-center h-8 select-none cursor-pointer ml-1.5"
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      onClick={handleToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {droppable && (
        <div
          //   onClick={handleToggle}
          className={`flex items-center justify-center w-6 h-6  transition-transform duration-100 text-muted-foreground ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          <ChevronRight strokeWidth={2} className="w-4 h-4" />
        </div>
      )}

      <div className="flex items-center gap-2 pl-2 w-full">
        {visibleInput ? (
          <div className="flex items-center gap-1">
            <input
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-40"
              value={labelText}
              onChange={handleChangeText}
              autoFocus
            />
            <button
              className="p-1 rounded-md disabled:opacity-50"
              onClick={handleSubmit}
              disabled={labelText.trim() === ""}
            >
              <Check className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              className="p-1 text-red-500 hover:bg-red-100 rounded-md"
              onClick={handleCancel}
            >
              <X className="w-4 h-5" strokeWidth={2} />
            </button>
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <div className="flex text-sm text-gray-800">
              {text}
              {/* {hover && (
                <button
                  className="pl-3 text-gray-600 hover:bg-gray-100 rounded-md"
                  onClick={handleShowInput}
                >
                  <Edit3 className="h-3 w-3" />
                </button>
              )} */}
              {hover && (
                // <button className="text-gray-600 hover:bg-gray-100 rounded-md">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="default">
                      <Ellipsis strokeWidth={2} className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Add Request</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShowInput}>
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                // </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
