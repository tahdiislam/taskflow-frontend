/** @format */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserContext } from "@/contexts/userContext";
import axios from "axios";
import { useState } from "react";

export default function Profile({ params }) {
  const { user } = useUserContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [end_date, setEnd_date] = useState("");

  const handleSubmit = async () => {
    const formData = {
      name: name,
      description: description,
      end_date: end_date,
      created_by: user?.user?.id,
    };
    console.log("🚀 ~ handleSubmit ~ formData:", formData);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/project/list/`,
        formData
      );
      console.log("Project Created:", response.data);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  return (
    <div className="p-10 flex flex-col items-start gap-4">
      <h1 className="text-2xl font-semibold">Create a new project</h1>
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-xl font-semibold py-2 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition ease-in-out duration-500 mt-4">
            Create new
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Fill in the form below to create a new project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="Task Flow"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                placeholder="Redesign the company website with a modern UI/UX."
                className="col-span-3"
                maxLength={200}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                End Date
              </Label>
              <input
                onChange={(e) => setEnd_date(e.target.value)}
                type="date"
                name="end_date"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h1 className="text-2xl font-semibold">Your projects</h1>
      <div>
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">
            Website Redesign
          </h2>
          <p class="text-gray-600 mb-4">
            Redesign the company website with a modern UI/UX.
          </p>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">End Date: 2024-12-15</span>
            <span class="text-sm text-gray-500">Created by User #1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
