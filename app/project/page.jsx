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
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Project() {
  const { user } = useUserContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [projects, setProjects] = useState([]);
  console.log("🚀 ~ Profile ~ projects:", projects)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const formData = {
      name: name,
      description: description,
      end_date: end_date,
      created_by: user?.user?.id,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/project/list/`,
        formData
      );
      setProjects((prev) => [...prev, response.data]);
      console.log("Project Created:", response.data);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  useEffect(() => {
    if (!user?.user?.id) return;
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/project/list/?user_id=${user?.user?.id}`
        );
        console.log("🚀 ~ fetchProjects ~ response:", response?.data?.results)
        setProjects(response?.data?.results);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user?.user?.id]);
  if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error loading projects.</p>;
  return (
    <div className="p-10 flex flex-col items-start gap-4">
      <h1 className="text-2xl font-semibold">Create a new project</h1>
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-xl font-semibold py-2 px-6 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition ease-in-out duration-500 mt-4">
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
      <div class="container mx-auto p-4">
        <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.length ? (
            projects?.map((project) => (
              <Link 
                href={`/project/${project.id}`}
                key={project.id}
                class="bg-white border border-gray-200 rounded-lg shadow-md p-6 "
              >
                <h2 class="text-xl font-semibold text-gray-800 mb-2">
                  {project.name}
                </h2>
                <p class="text-gray-600 mb-4">{project.description}</p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">
                    End Date: {project.end_date}
                  </span>
                  <span class="text-sm text-gray-500">Created by User #1</span>
                </div>
              </Link>
            ))
          ) : (
            <h1 className="text-2xl font-semibold">No projects found</h1>
          )}
        </div>
      </div>
    </div>
  );
}
