"use client";

import { useState, useEffect } from "react";
import {
  Tree,
  getBackendOptions,
  MultiBackend,
  NodeModel,
  getDescendants,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { CustomNode } from "@/components/collection/custom-node";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// interface FileType {
//   type: "FOLDER" | "FILE";
// }

// type Node = {
//   id: string | number;
//   parent: string | number;
//   text: string;
//   data: FileType;
// };

const fetchAllCollection = async () => {
  const response = await axios.get("/api/collection/fetch");
  return response.data.collection;
};

export default function FileTree() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["fetchAllCollection"],
    queryFn: fetchAllCollection,
  });

  // 👇 initialize empty array instead of undefined
  const [treeData, setTreeData] = useState<NodeModel[]>([]);

  // when `data` is fetched, update treeData
  useEffect(() => {
    if (data) {
      setTreeData(data);
    }
  }, [data]);

  // if (isSuccess) {
  //   setTreeData(data);
  // }

  const handleDrop = (newTreeData: NodeModel[]) => {
    // @ts-ignore
    setTreeData(newTreeData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Some error occurred</div>;

  const handleTextChange = (id: NodeModel["id"], value: string) => {
    setTreeData((prev) =>
      prev.map((node) => (node.id === id ? { ...node, text: value } : node))
    );
  };

  const handleDelete = (id: NodeModel["id"]) => {
    const deleteIds = [
      id,
      ...getDescendants(treeData, id).map((node) => node.id),
    ];
    setTreeData((prev) => prev.filter((node) => !deleteIds.includes(node.id)));
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className="w-full">
        <Tree
          tree={treeData}
          rootId={0}
          onDrop={handleDrop}
          sort={false}
          render={(node, { depth, isOpen, onToggle }) => (
            <CustomNode
              node={node}
              depth={depth}
              isOpen={isOpen}
              onToggle={onToggle}
              onTextChange={handleTextChange}
              onDelete={handleDelete}
            />
          )}
        />
      </div>
    </DndProvider>
  );
}
