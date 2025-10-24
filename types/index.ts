export enum NodeType {
  FILE = "FILE",
  FOLDER = "FOLDER",
}

export type RequestType = {
  name: string;
  droppable?: boolean;
  parentId: string | number;
  type: NodeType;
};

export type FolderType = {
  name: string;
  droppable?: boolean;
  parentId: string | number;
  type: NodeType;
};
