/** @format */

import axios from "axios";

export default async function register(data) {
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEDN_URL}/customer/register/`, data)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}