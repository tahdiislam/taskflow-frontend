/** @format */
"use client";
import { useUserContext } from "@/contexts/userContext";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "@/public/spinner.svg";
import Container from "@/components/Container";
import Items from "@/components/Item";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Image from "next/image";

export default function Dashboard({ params }) {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [containers, setContainers] = useState([
    {
      id: 1,
      title: "Pending",
      items: [],
    },
    {
      id: 2,
      title: "In Progress",
      items: [],
    },
    {
      id: 3,
      title: "Completed",
      items: [],
    },
  ]);
  const [itemName, setItemName] = useState("");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [taskUpdateLoading, setTaskUpdateLoading] = useState(true);

  // push the task based on status
  const handleSetTask = (index, task) => {
    setContainers((prevContainers) => {
      // Create a copy of the previous state
      const newContainers = [...prevContainers];

      // Check if the task already exists in the container
      const exist = newContainers[index].items.find(
        (item) => item.id === task.id
      );

      // If the task doesn't exist, add it to the container
      if (!exist) {
        newContainers[index] = {
          ...newContainers[index],
          items: [
            ...newContainers[index].items,
            { id: task?.id, title: task?.title },
          ],
        };
      }

      // Return the updated containers to update the state
      return newContainers;
    });
  };

  useEffect(() => {
    if (!params?.id) return;
    setLoading(false);
    const fetchProjects = async () => {
      // load all task based on project id
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/task/list/?project_id=${params?.id}`
        );
        /* 
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
        */
        response?.data?.forEach((task) => {
          if (task?.status === "Pending") {
            handleSetTask(0, task);
          } else if (task?.status === "In Progress") {
            handleSetTask(1, task);
          } else if (task?.status === "Completed") {
            handleSetTask(2, task);
          }
        });
      } catch (err) {
        setError(err);
      }
    };

    fetchProjects();
    setLoading(false);
  }, [params?.id]);

  const onAddItem = async () => {
    if (!itemName) return;
    const data = {
      title: itemName,
      assigned_to: user?.user?.id,
      project: params?.id,
      status,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/task/list/`,
        data
      );
      if (response?.status === 201) {
        if (response?.data?.status === "Pending") {
          handleSetTask(0, response?.data);
        } else if (response?.data?.status === "In Progress") {
          handleSetTask(1, response?.data);
        } else if (response?.data?.status === "Completed") {
          handleSetTask(2, response?.data);
        }
      }
    } catch (err) {
      console.log("🚀 ~ onAddItem ~ err:", err);
    }
    setItemName("");
    setShowAddItemModal(false);
  };

  const handleSetUpdateTask = (id, prev_status, index) => {
    const container = containers.find(
      (container) => container.title === prev_status
    );
    const task = container?.items?.find((item) => item.id === id);
    setContainers([...containers]);
    container.items = container.items.filter((item) => item.id !== id);
    containers[index].items.push(task);
  };

  const handleUpdateTask = async (id, status, prev_status) => {
    setTaskUpdateLoading(false);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/task/update-status/${id}/`,
        { status: status }
      );
      if (response?.status === 200) {
        if (response?.data?.status === "Pending") {
          handleSetUpdateTask(id, prev_status, 0);
        } else if (response?.data?.status === "In Progress") {
          handleSetUpdateTask(id, prev_status, 1);
        } else if (response?.data?.status === "Completed") {
          handleSetUpdateTask(id, prev_status, 2);
        }
      }
      setTaskUpdateLoading(true);
    } catch (err) {
      console.log("🚀 ~ onAddItem ~ err:", err);
      setTaskUpdateLoading(true);
    }
  };
  if (loading) {
    console.log("🚀 ~ Dashboard ~ loading:", loading);
    return (
      <section className="py-80 flex justify-center items-center">
        <Image src={Spinner} alt="Spinner" className="w-12 h-12" />
      </section>
    );
  }
  return (
    <div className="mx-auto max-w-7xl py-10">
      {/* Add Container Modal */}
      <section
        className={`flex justify-center items-center ${
          taskUpdateLoading && "hidden"
        }`}
      >
        <Image src={Spinner} alt="Spinner" className="w-10 h-10" />
      </section>
      {/* Add Item Modal */}
      <Modal showModal={showAddItemModal} setShowModal={setShowAddItemModal}>
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-3xl font-bold">Add Task</h1>
          <Input
            type="text"
            placeholder="Item Title"
            name="itemname"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onAddItem}
          >
            Add Task
          </button>
        </div>
      </Modal>
      {/* Add container modal */}
      <div className="flex items-center justify-between gap-y-2">
        <h1 className="text-gray-800 text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="mt-10 overflow-x-auto whitespace-nowrap">
        <div className="grid grid-cols-3 gap-6 min-w-[1000px]">
          {containers?.map((container) => (
            <Container
              id={container.id}
              title={container.title}
              key={container.id}
              onAddItem={() => {
                setShowAddItemModal(true);
                setStatus(container.title);
              }}
            >
              <div className="flex items-start flex-col gap-y-4">
                {container?.items?.length > 0 &&
                  container?.items?.map((i) => (
                    <Items
                      title={i?.title}
                      id={i?.id}
                      key={i?.id}
                      status={container?.title}
                      handleUpdateTask={handleUpdateTask}
                    />
                  ))}
              </div>
            </Container>
          ))}
        </div>
      </div>
    </div>
  );
}
