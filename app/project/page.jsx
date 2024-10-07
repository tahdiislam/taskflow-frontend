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
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import Spinner from "@/public/spinner.svg";
import { Loader2 } from "lucide-react";

export default function Project() {
  const { user } = useUserContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [projects, setProjects] = useState({});
  // console.log("🚀 ~ Profile ~ projects:", projects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [createLoading, setCreateLoading] = useState(false);
  const [minDate, setMinDate] = useState("");

  const handleLoadProjects = (pg) => {
    if (pg < 1 || pg > Math.ceil(parseFloat(projects?.count / 8))) return;
    setLoading(true);
    if (!user?.user?.id) return;
    setPage((prev) => pg);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/project/list/?page=${pg}&user_id=${user?.user?.id}`,
      )
      .then((res) => {
        setProjects((prev) => res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!projects?.count) handleLoadProjects(1);
  }, [user?.user?.id, projects?.count]);

  const handleSubmit = async () => {
    setCreateLoading(true);
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

      if (response.status === 201) {
        toast({
          title: "Project created successfully",
        });
        setName("");
        setDescription("");
        setEnd_date("");
        handleLoadProjects(1);
        setCreateLoading(false);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      setCreateLoading(false);
    }
  };

  useEffect(() => {
    // Get today's date in the local time zone
    const today = new Date();

    // Format the date as YYYY-MM-DD
    const formattedDate =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");

    // Set the min date for the input field
    setMinDate(formattedDate);
  }, []); // Runs once when the component is mounted

  if (loading)
    return (
      <section className="py-80 flex justify-center items-center">
        <Image src={Spinner} alt="Spinner" className="w-12 h-12" />
      </section>
    );
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
              <Textarea
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
                min={minDate}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-800 hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-300"
              disabled={createLoading}
            >
              <Loader2
                className={`${
                  !createLoading ? "hidden" : "block"
                } mr-2 h-4 w-4 animate-spin`}
              />
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h1 className="text-2xl font-semibold">Your projects</h1>
      <div class="container mx-auto p-4">
        <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.count ? (
            projects?.results?.map((project) => (
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
            <h1 className="text-2xl font-semibold py-20">No projects found</h1>
          )}
        </div>
      </div>
      {projects?.count ? (
        <Pagination className="my-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={"cursor-pointer"}
                onClick={() => handleLoadProjects(page - 1)}
              />
            </PaginationItem>
            {Array(Math.ceil(parseFloat(projects?.count / 8)) || 1)
              ?.fill()
              ?.map((_, index) => index + 1)
              ?.map((num) => (
                <PaginationItem key={num}>
                  <PaginationLink
                    onClick={() => handleLoadProjects(num)}
                    isActive={num === page}
                    className={"cursor-pointer"}
                  >
                    {num}
                  </PaginationLink>
                </PaginationItem>
              ))}
            <PaginationItem>
              <PaginationNext
                className={"cursor-pointer"}
                onClick={() => handleLoadProjects(page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : (
        <></>
      )}
    </div>
  );
}
