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
      <h1 className="text-3xl font-bold">{project?.name}</h1>
      <div className="flex gap-4 ">
        <div className="w-1/5">
          <ul>
            <li>hello world</li>
            <li>hello world</li>
            <li>hello world</li>
            <li>hello world</li>
            <li>hello world</li>
            <li>hello world</li>
            <li>hello world</li>
          </ul>
        </div>
        <div className="w-4/5">
          <div>
            <li>Tahdi Islam</li>
            <li>Hello world</li>
          </div>
          <div className="grid grid-cols-3  gap-2">
            <div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
              sint illo repellat mollitia, fugit quis magnam! Sed quo expedita
              nisi. Error cum vero beatae iste accusamus dignissimos voluptas
              obcaecati esse minima dolor, quam doloremque corporis commodi
              repudiandae exercitationem expedita blanditiis fugit id libero
              saepe praesentium. Nobis similique, fuga consequuntur voluptatibus
              odit esse cumque quod culpa praesentium provident facilis eligendi
              unde at recusandae suscipit minus rerum veniam, voluptates sint
              eius quaerat. Fugiat repudiandae vel aspernatur dolorem
              accusantium pariatur officiis eum magni facere aut tenetur
              voluptatem quis, eaque numquam laudantium minima ex sed enim totam
              quibusdam. Recusandae ab consectetur quibusdam molestias,
              voluptatem neque assumenda incidunt reiciendis repellendus atque
              voluptate fugiat, ducimus dicta laboriosam perspiciatis enim
              provident voluptatum vitae nihil quam debitis. Nostrum dignissimos
              quibusdam est aliquam dolorum eveniet iusto exercitationem dolore!
              Accusantium ad corporis qui eum adipisci, fugit eveniet molestias
              repellendus ipsa error! Dignissimos temporibus dolor iste quaerat?
              Et iste tempora quidem harum dicta aliquam vel nobis sunt
              accusamus, nostrum pariatur possimus quam dolor, repudiandae id
              facere hic eius odit quibusdam molestias labore amet. Ut
              veritatis, eaque iste, explicabo illum officia alias vel vero
              eligendi quae ipsum ad aperiam ab labore dolor dignissimos
              delectus hic reiciendis dolorum est natus cum in! Ullam?
            </div>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Accusantium, repellendus maiores! Delectus minus incidunt fuga
              natus dignissimos reiciendis quidem quos dolorum dolores
              excepturi, suscipit fugit illo quam veniam ab non corporis odit,
              consequuntur repellat debitis distinctio libero ullam officiis in?
              Asperiores voluptate nam debitis, sint, voluptas fugiat voluptatem
              nihil quod officia temporibus fuga illum quaerat, eveniet incidunt
              atque eos voluptatum vel repellat perferendis optio earum iste
              animi repellendus. Corporis tenetur eveniet placeat quaerat.
              Veniam debitis odio perspiciatis impedit soluta quae, dolorem
              blanditiis maxime delectus. Velit id dicta necessitatibus unde,
              libero nostrum repellat deleniti harum consequatur omnis. Quos
              expedita commodi laboriosam labore fugiat a reprehenderit, iste
              quas eligendi sit recusandae, odit laudantium. Quasi veritatis
              suscipit exercitationem tempora sit aliquam dicta eum recusandae
              molestiae non numquam voluptatum architecto, quaerat eveniet
              deserunt omnis excepturi doloremque necessitatibus illo vel alias
              eligendi consectetur. Dignissimos amet iure corporis similique
              perferendis atque! Libero, voluptas ducimus odit tempore, cum
              alias, cupiditate reiciendis corporis sequi quasi possimus
              explicabo repellat placeat. Est cum pariatur velit libero
              reprehenderit inventore laudantium at consequuntur, enim tenetur
              iste modi dolore quisquam excepturi minima earum rerum accusamus
              consequatur, molestias ratione quae? Autem nihil, enim totam et
              consectetur distinctio, molestiae adipisci quae eos nisi
              temporibus earum?
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              repellendus ad impedit magni culpa, alias consequuntur cumque
              aliquid expedita iure quasi pariatur fuga voluptas facere,
              perspiciatis nisi sunt amet error? Voluptas ad magni a odio ab
              enim numquam, ut quam tempore possimus laudantium aliquam commodi
              quo incidunt dolore! Magnam, doloribus. A iste molestiae beatae
              repudiandae consequatur velit similique fugiat culpa quam? Esse
              tenetur similique nostrum in itaque rerum commodi ut, autem nulla
              velit quos impedit nobis laborum? Deserunt in ipsum nulla repellat
              delectus praesentium eius perferendis expedita quos non, harum
              illum, quam qui magni molestias. Iste incidunt magnam consequuntur
              ipsum illo officia quae suscipit nemo? Minus neque commodi
              sapiente voluptatem, a illum voluptas veniam officia recusandae
              distinctio sunt quaerat harum tempore ipsum quasi doloremque. A
              sequi velit nisi maiores impedit officiis aspernatur beatae itaque
              dolorem aliquam ad similique dolorum provident, nostrum porro hic
              sunt, autem molestiae est eligendi soluta? Corporis, voluptatum
              totam maxime laudantium cupiditate deserunt praesentium
              repellendus placeat incidunt velit veritatis doloremque dolore
              quidem minima mollitia voluptates eius accusamus temporibus itaque
              deleniti quis esse, maiores optio. Voluptatum ab, provident ipsum
              repellendus quae tempore corporis quis ut minima molestiae
              sapiente at veniam quaerat, saepe commodi assumenda! Rem ipsam ad
              labore!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
