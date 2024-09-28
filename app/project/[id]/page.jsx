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
import { useEffect, useState } from "react";

export default function Dashboard({ params }) {
  const { user } = useUserContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [project, setProject] = useState({});
  console.log("🚀 ~ Profile ~ projects:", project);
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
      setProject((prev) => [...prev, response.data]);
      console.log("Project Created:", response.data);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  useEffect(() => {
    if (!params?.id) return;
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/project/list/${params?.id}`
        );
        console.log("🚀 ~ fetchProjects ~ response:", response?.data);
        setProject(response?.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [params?.id]);
  if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error loading projects.</p>;
  return (
    <div className="p-10 flex flex-col items-start gap-4">
        <h1 className="text-3xl font-bold">
            {project?.name}
        </h1>
    </div>
  );
}
