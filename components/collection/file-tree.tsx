"use client";

import { useState } from "react";
import {
  Tree,
  getBackendOptions,
  MultiBackend,
  NodeModel,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  File,
  Folder,
} from "lucide-react";
import { CustomNode } from "@/components/collection/custom-node";
// import initialData from "./sample-default.json";

const initialData = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: "Folder 1",
    data: {
      type: "folder",
    },
  },
  {
    id: 2,
    parent: 1,
    text: "File 1-1",
    data: {
      type: "file",
    },
  },
  {
    id: 3,
    parent: 1,
    text: "File 1-2",
    data: {
      type: "file",
    },
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: "Folder 2",
    data: {
      type: "folder",
    },
  },
  {
    id: 5,
    parent: 4,
    droppable: true,
    text: "Folder 2-1",
    data: {
      type: "folder",
    },
  },
  {
    id: 6,
    parent: 5,
    text: "File 2-1-1",
    data: {
      type: "file",
    },
  },
];

export default function FileTree() {
  const [treeData, setTreeData] = useState(initialData);
  const handleDrop = (newTreeData: any) => setTreeData(newTreeData);

  const handleTextChange = (id: NodeModel["id"], value: string) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text: value,
        };
      }

      return node;
    });

    setTreeData(newTree);
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      {/* <Tree
        tree={treeData}
        rootId={0}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          <div
            className="flex items-center align-middle gap-x-1"
            style={{ marginLeft: depth * 30 }}
          >
            {node.droppable && (
              <span onClick={onToggle}>
                {isOpen ? <ChevronDown /> : <ChevronRight />}
              </span>
            )}
            {node.data?.type === "folder" ? (
              <Folder className="w-4 h-4" />
            ) : (
              <File className="h-4 w-4" />
            )}
            {node.text}
          </div>
        )}
      /> */}
      <div className="w-full">
        <Tree
          tree={treeData}
          rootId={0}
          onDrop={handleDrop}
          sort={false}
          render={(node, { depth, isOpen, onToggle }) => (
            // <div className="hover:bg-accent px-2">
            <CustomNode
              node={node}
              depth={depth}
              isOpen={isOpen}
              onToggle={onToggle}
              onTextChange={handleTextChange}
            />
            // </div>
          )}
        />
      </div>
    </DndProvider>
  );
}
