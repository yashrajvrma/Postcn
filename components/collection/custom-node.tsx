import React, { useState } from "react";
import { ChevronRight, Check, X, Edit3 } from "lucide-react";
import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
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
      className="flex items-center h-8 pr-2 select-none cursor-pointer"
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      onClick={handleToggle}
    >
      {droppable && (
        <div
          //   onClick={handleToggle}
          className={`flex items-center justify-center w-6 h-6  transition-transform duration-100 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          <ChevronRight size={16} />
        </div>
      )}

      <div className="flex items-center gap-2 pl-2">
        {visibleInput ? (
          <div className="flex items-center gap-1">
            <input
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
              value={labelText}
              onChange={handleChangeText}
              autoFocus
            />
            <button
              className="p-1 text-green-600 hover:bg-green-100 rounded-md disabled:opacity-50"
              onClick={handleSubmit}
              disabled={labelText.trim() === ""}
            >
              <Check size={16} />
            </button>
            <button
              className="p-1 text-red-500 hover:bg-red-100 rounded-md"
              onClick={handleCancel}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <div className="group text-sm text-gray-800 pr-2">
              {text}
              <button
                className="invisible group-hover:visible pl-3 text-gray-600 hover:bg-gray-100 rounded-md"
                onClick={handleShowInput}
              >
                <Edit3 className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
