"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const createCollection = async (name: string) => {
  console.log("name in client is ", name);
  const response = await axios.post("/api/collection/create", { name });
  return response.data;
};

export default function CreateNewCollection() {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: (name: string) => createCollection(name),
    onSuccess: () => {
      console.log("✅ Collection created successfully!");
      setOpen(false);
    },
    onError: (error) => {
      console.error("❌ Error creating collection:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("collectionName") as string;
    if (!name.trim()) return;
    mutation.mutate(name);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 hover:bg-primary-foreground"
        >
          <Plus strokeWidth={2} className="w-5 h-5 text-muted-foreground" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Collection</DialogTitle>
            <DialogDescription>
              Add a new blank collection in your workspace.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 py-4">
            <Label htmlFor="collectionName">Collection Name</Label>
            <Input
              id="collectionName"
              name="collectionName"
              defaultValue="New Collection"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
