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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "../spinner";
import toast from "react-hot-toast";

const CreateNewCollectionFn = (name: string) => {
  return axios.post("/api/collection/create", { name });
};

export default function CreateNewCollection() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: createNewCollection, isPending } = useMutation({
    mutationFn: CreateNewCollectionFn,
    onSuccess: (data) => {
      console.log("data is", JSON.stringify(data));
      queryClient.invalidateQueries({
        queryKey: ["fetchAllCollection"],
      });
      toast.success(`${data.data.message}`);
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(`${error.response.data}`);
      console.error("Error creating collection:", error);
      setOpen(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("collectionName") as string;
    if (!name.trim()) return;
    createNewCollection(name);
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
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex justify-center items-center align-middle gap-x-2">
                  Create
                  <Spinner className="w-5 h-5" variant="default" />
                </div>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
