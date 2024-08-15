/** @format */
"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUserContext } from "@/contexts/userContext";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import BlurImage from "@/public/blur.jpg"
import italiana from "@/lib/italiana";
import Base64Image from "@/public/ImageBase64";

export default function Flower({ params }) {
  const { user } = useUserContext();
  const [flower, setFlower] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const quantityRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleLoadFlower = () =>
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/flower/list/${params.id}`
      )
      .then((res) => {
        setFlower((prev) => res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  useEffect(() => {
    if (!flower) handleLoadFlower();
  }, [params?.id]);

  const handleChangeQuantity = (e) => {
    const { value } = e.target;
    if (value < 1) {
      toast({
        title: "Error",
        description: "Quantity must be greater than 0",
        variant: "destructive",
      });
      e.target.value = 1;
    }
    if (value > flower?.available) {
      toast({
        title: "Error",
        description: "Quantity must be less than available",
        variant: "destructive",
      });
      e.target.value = flower?.available;
    }
    setQuantity(e.target.value);
  };

  const handleChangeQuantity2 = (increase) => {
    const prevQuantity = parseInt(quantity);
    if (increase) {
      if (quantity >= flower?.available) {
        toast({
          title: "Error",
          description: "Quantity must be less than available",
          variant: "destructive",
        });
        return;
      }
      setQuantity((prev) => parseInt(prev) + 1);
      quantityRef.current.value = prevQuantity + 1;
    } else if (quantity > 1) {
      if (quantity <= 1) {
        toast({
          title: "Error",
          description: "Quantity must be greater than 0",
          variant: "destructive",
        });
        return;
      }
      setQuantity((prev) => parseInt(prev) - 1);
      quantityRef.current.value = prevQuantity - 1;
    }
  };
  const handleOrder = () => {
    setLoading(true);
    if (!user?.user?.id) {
      toast({
        title: "Error",
        description: "Please login to order",
        variant: "destructive",
      });
      setLoading(false);
      redirect("/login");
    }
    if (!flower?.id) {
      toast({
        title: "Error",
        description: "Sorry, something went wrong",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    if (flower?.available < 1) {
      toast({
        title: "Error",
        description: "Sorry, this flower is out of stock",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    const data = {
      customer: user?.id,
      flower: flower?.id,
      quantity: quantity,
      total_price: flower?.price * quantity,
    };
    const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/order/create/`, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.status === 200 && typeof window !== "undefined") {
          setLoading(false);
          window.location.replace(res?.data?.redirect_url);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="w-full p-4 xl:mt-10 xl:mb-20">
      <div className=" md:w-[95%] lg:w-10/12 grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto ">
        <Image
          src={flower?.image || BlurImage}
          alt={flower?.title}
          width={250}
          height={250}
          className="rounded-xl w-full h-auto sm:sticky top-10 sm:top-24"
          quality={100}
          placeholder="blur"
          blurDataURL={Base64Image}
        />
        <div className="flex flex-col justify-start gap-6 py-4">
          <h3  className={`text-3xl md:text-4xl ${italiana.className}`}>{flower?.title}</h3>
          <h3 className="text-xl font-medium">Category: {flower?.category}</h3>
          <h2 className="text-4xl font-bold text-lime-700">৳{flower?.price}</h2>
          <hr className="border border-lime-700" />
          <h2 className="text-xl font-medium">
            <span className="text-lime-700">{flower?.available}</span> Left.
            Make you order
          </h2>
          <h2 className="text-3xl font-medium">
            Total: ৳{flower?.price * quantity}
          </h2>
          <div className="flex justify-start items-center text-3xl gap-[1px]">
            <button
              onClick={() => handleChangeQuantity2(false)}
              className="px-4 py-1 bg-white rounded-s-md hover:bg-lime-300 active:scale-90 duration-200"
            >
              -
            </button>
            <input
              min={1}
              max={flower?.available}
              onChange={(e) => handleChangeQuantity(e)}
              className="w-1/6 px-4 ps-4 py-1 border border-white hover:border-lime-800"
              type="number"
              name="quantity"
              id=""
              defaultValue={quantity}
              ref={quantityRef}
            />
            <button
              onClick={() => handleChangeQuantity2(true)}
              className="px-4 py-1 bg-white rounded-e-md hover:bg-lime-300 active:scale-90 duration-200"
            >
              +
            </button>
          </div>
          <button
            onClick={handleOrder}
            className="mx-auto sm:mx-0 w-5/6 uppercase text-xl  border-2 border-lime-800 py-2 px-4 rounded-md hover:bg-lime-800 hover:text-white transition ease-in-out duration-500 mt-4 disabled:bg-lime-700 disabled:text-white flex justify-center items-center"
            disabled={loading}
          >
            <Loader2
              className={`mr-2 h-6 w-6 animate-spin ${loading ? "" : "hidden"}`}
            />
            <span>Buy Now</span>
          </button>
          <p className="text-lg py-4 text-justify">{flower?.description}</p>
        </div>
      </div>
    </div>
  );
}
