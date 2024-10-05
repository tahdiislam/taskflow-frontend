/** @format */
"use client";
import { useUserContext } from "@/contexts/userContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// DnD
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { Inter } from 'next/font/google';

// Components
import Container from '@/components/Container';
import Items from '@/components/Item';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { Button } from '@/components/Button';

const inter = Inter({ subsets: ['latin'] });

export default function Dashboard({ params }) {
  const { user } = useUserContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [project, setProject] = useState({});
  console.log("🚀 ~ Dashboard ~ project:", project)
  const [task, setTask] = useState([])
  console.log("🚀 ~ Dashboard ~ task:", task)
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
      items: []
    },
    {
      id: 3,
      title: "Completed",
      items: []
    },
  ]);
  console.log("🚀 ~ Home ~ containers:", containers);
  const [activeId, setActiveId] = useState(null);
  const [currentContainerId, setCurrentContainerId] = useState();
  const [containerName, setContainerName] = useState('');
  const [itemName, setItemName] = useState('');
  console.log("🚀 ~ Home ~ itemName:", itemName);
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);





  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );


  

  useEffect(() => {
    if (!params?.id) return;
    const fetchProjects = async () => {
      // load current project by project id
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
      // load all task based on project id
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/task/list/?project_id=${params?.id}`
        );
        console.log("🚀 ~ fetchProjects ~ response:", response?.data);
        setTask(response?.data?.results);
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








  

  const onAddContainer = () => {
    if (!containerName) return;
    const id = `container-${uuidv4()}`;
    setContainers([
      ...containers,
      {
        id,
        title: containerName,
        items: [],
      },
    ]);
    setContainerName('');
    setShowAddContainerModal(false);
  };

  const onAddItem = () => {
    if (!itemName) return;
    const id = `item-${uuidv4()}`;
    const container = containers.find((item) => item.id === currentContainerId);
    if (!container) return;
    container.items.push({
      id,
      title: itemName,
    });
    setContainers([...containers]);
    setItemName('');
    setShowAddItemModal(false);
  };

  // Find the value of the items
  function findValueOfItems(id, type) {
    if (type === 'container') {
      return containers.find((item) => item.id === id);
    }
    if (type === 'item') {
      return containers.find((container) =>
        container.items.find((item) => item.id === id),
      );
    }
  }

  const findItemTitle = (id) => {
    const container = findValueOfItems(id, 'item');
    if (!container) return '';
    const item = container.items.find((item) => item.id === id);
    if (!item) return '';
    return item.title;
  };

  const findContainerTitle = (id) => {
    const container = findValueOfItems(id, 'container');
    if (!container) return '';
    return container.title;
  };

  const findContainerItems = (id) => {
    const container = findValueOfItems(id, 'container');
    if (!container) return [];
    return container.items;
  };

  // DND Handlers

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragMove = (event) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('item') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'item');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id,
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id,
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id,
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex,
        );

        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1,
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem,
        );
        setContainers(newItems);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'container');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id,
      );

      // Find the index of the active item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id,
      );

      // Remove the active item from the active container and add it to the over container
      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1,
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
  };

  // This is the function that handles the sorting of the containers and items when the user is done dragging.
  function handleDragEnd(event) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes('container') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id,
      );
      // Swap the active and over container
      let newItems = arrayMove(containers, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('item') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'item');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id,
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id,
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id,
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex,
        );
        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1,
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem,
        );
        setContainers(newItems);
      }
    }

    // Handling item dropping into Container
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'container');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id,
      );

      // Find the index of the active item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id,
      );

      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1,
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }

    setActiveId(null);
  }
    
  return (
    // <div className="p-10 flex flex-col items-start gap-4">
    //   <h1 className="text-3xl font-bold">{project?.name}</h1>
    //   <div className="flex gap-4 ">
    //     <div className="w-1/5">
    //       <ul>
    //         <li>hello world</li>
    //         <li>hello world</li>
    //         <li>hello world</li>
    //         <li>hello world</li>
    //         <li>hello world</li>
    //         <li>hello world</li>
    //         <li>hello world</li>
    //       </ul>
    //     </div>
    //     <div className="w-4/5">
    //       <div>
    //         <li>Tahdi Islam</li>
    //         <li>Hello world</li>
    //       </div>
    //       <div className="grid grid-cols-3  gap-2">
    //         <div>
    //           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
    //           sint illo repellat mollitia, fugit quis magnam! Sed quo expedita
    //           nisi. Error cum vero beatae iste accusamus dignissimos voluptas
    //           obcaecati esse minima dolor, quam doloremque corporis commodi
    //           repudiandae exercitationem expedita blanditiis fugit id libero
    //           saepe praesentium. Nobis similique, fuga consequuntur voluptatibus
    //           odit esse cumque quod culpa praesentium provident facilis eligendi
    //           unde at recusandae suscipit minus rerum veniam, voluptates sint
    //           eius quaerat. Fugiat repudiandae vel aspernatur dolorem
    //           accusantium pariatur officiis eum magni facere aut tenetur
    //           voluptatem quis, eaque numquam laudantium minima ex sed enim totam
    //           quibusdam. Recusandae ab consectetur quibusdam molestias,
    //           voluptatem neque assumenda incidunt reiciendis repellendus atque
    //           voluptate fugiat, ducimus dicta laboriosam perspiciatis enim
    //           provident voluptatum vitae nihil quam debitis. Nostrum dignissimos
    //           quibusdam est aliquam dolorum eveniet iusto exercitationem dolore!
    //           Accusantium ad corporis qui eum adipisci, fugit eveniet molestias
    //           repellendus ipsa error! Dignissimos temporibus dolor iste quaerat?
    //           Et iste tempora quidem harum dicta aliquam vel nobis sunt
    //           accusamus, nostrum pariatur possimus quam dolor, repudiandae id
    //           facere hic eius odit quibusdam molestias labore amet. Ut
    //           veritatis, eaque iste, explicabo illum officia alias vel vero
    //           eligendi quae ipsum ad aperiam ab labore dolor dignissimos
    //           delectus hic reiciendis dolorum est natus cum in! Ullam?
    //         </div>
    //         <div>
    //           Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    //           Accusantium, repellendus maiores! Delectus minus incidunt fuga
    //           natus dignissimos reiciendis quidem quos dolorum dolores
    //           excepturi, suscipit fugit illo quam veniam ab non corporis odit,
    //           consequuntur repellat debitis distinctio libero ullam officiis in?
    //           Asperiores voluptate nam debitis, sint, voluptas fugiat voluptatem
    //           nihil quod officia temporibus fuga illum quaerat, eveniet incidunt
    //           atque eos voluptatum vel repellat perferendis optio earum iste
    //           animi repellendus. Corporis tenetur eveniet placeat quaerat.
    //           Veniam debitis odio perspiciatis impedit soluta quae, dolorem
    //           blanditiis maxime delectus. Velit id dicta necessitatibus unde,
    //           libero nostrum repellat deleniti harum consequatur omnis. Quos
    //           expedita commodi laboriosam labore fugiat a reprehenderit, iste
    //           quas eligendi sit recusandae, odit laudantium. Quasi veritatis
    //           suscipit exercitationem tempora sit aliquam dicta eum recusandae
    //           molestiae non numquam voluptatum architecto, quaerat eveniet
    //           deserunt omnis excepturi doloremque necessitatibus illo vel alias
    //           eligendi consectetur. Dignissimos amet iure corporis similique
    //           perferendis atque! Libero, voluptas ducimus odit tempore, cum
    //           alias, cupiditate reiciendis corporis sequi quasi possimus
    //           explicabo repellat placeat. Est cum pariatur velit libero
    //           reprehenderit inventore laudantium at consequuntur, enim tenetur
    //           iste modi dolore quisquam excepturi minima earum rerum accusamus
    //           consequatur, molestias ratione quae? Autem nihil, enim totam et
    //           consectetur distinctio, molestiae adipisci quae eos nisi
    //           temporibus earum?
    //         </div>
    //         <div>
    //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
    //           repellendus ad impedit magni culpa, alias consequuntur cumque
    //           aliquid expedita iure quasi pariatur fuga voluptas facere,
    //           perspiciatis nisi sunt amet error? Voluptas ad magni a odio ab
    //           enim numquam, ut quam tempore possimus laudantium aliquam commodi
    //           quo incidunt dolore! Magnam, doloribus. A iste molestiae beatae
    //           repudiandae consequatur velit similique fugiat culpa quam? Esse
    //           tenetur similique nostrum in itaque rerum commodi ut, autem nulla
    //           velit quos impedit nobis laborum? Deserunt in ipsum nulla repellat
    //           delectus praesentium eius perferendis expedita quos non, harum
    //           illum, quam qui magni molestias. Iste incidunt magnam consequuntur
    //           ipsum illo officia quae suscipit nemo? Minus neque commodi
    //           sapiente voluptatem, a illum voluptas veniam officia recusandae
    //           distinctio sunt quaerat harum tempore ipsum quasi doloremque. A
    //           sequi velit nisi maiores impedit officiis aspernatur beatae itaque
    //           dolorem aliquam ad similique dolorum provident, nostrum porro hic
    //           sunt, autem molestiae est eligendi soluta? Corporis, voluptatum
    //           totam maxime laudantium cupiditate deserunt praesentium
    //           repellendus placeat incidunt velit veritatis doloremque dolore
    //           quidem minima mollitia voluptates eius accusamus temporibus itaque
    //           deleniti quis esse, maiores optio. Voluptatum ab, provident ipsum
    //           repellendus quae tempore corporis quis ut minima molestiae
    //           sapiente at veniam quaerat, saepe commodi assumenda! Rem ipsam ad
    //           labore!
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="mx-auto max-w-7xl py-10">
      {/* Add Container Modal */}
      <Modal
        showModal={showAddContainerModal}
        setShowModal={setShowAddContainerModal}
      >
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-3xl font-bold">Add Container</h1>
          <Input
            type="text"
            placeholder="Container Title"
            name="containername"
            value={containerName}
            onChange={(e) => setContainerName(e.target.value)}
          />
          <Button onClick={onAddContainer}>Add container</Button>
        </div>
      </Modal>
      
      {/* Add Item Modal */}
      <Modal showModal={showAddItemModal} setShowModal={setShowAddItemModal}>
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-3xl font-bold">Add Item</h1>
          <Input
            type="text"
            placeholder="Item Title"
            name="itemname"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button onClick={onAddItem}>Add Item</Button>
        </div>
      </Modal>
      {/* Add container modal */}
      <div className="flex items-center justify-between gap-y-2">
        <h1 className="text-gray-800 text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => setShowAddContainerModal(true)}>
          Add Container
        </Button>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-3 gap-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={containers.map((i) => i.id)}>
              {containers.map((container) => (
                <Container
                  id={container.id}
                  title={container.title}
                  key={container.id}
                  onAddItem={() => {
                    setShowAddItemModal(true);
                    setCurrentContainerId(container.id);
                  }}
                >
                  <SortableContext items={container.items.map((i) => i.id)}>
                    <div className="flex items-start flex-col gap-y-4">
                      {container.items.map((i) => (
                        <Items title={i.title} id={i.id} key={i.id} />
                      ))}
                    </div>
                  </SortableContext>
                </Container>
              ))}
            </SortableContext>
            <DragOverlay adjustScale={false}>
              {/* Drag Overlay For item Item */}
              {activeId && activeId.toString().includes('item') && (
                <Items id={activeId} title={findItemTitle(activeId)} />
              )}
              {/* Drag Overlay For Container */}
              {activeId && activeId.toString().includes('container') && (
                <Container id={activeId} title={findContainerTitle(activeId)}>
                  {findContainerItems(activeId).map((i) => (
                    <Items key={i.id} title={i.title} id={i.id} />
                  ))}
                </Container>
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
