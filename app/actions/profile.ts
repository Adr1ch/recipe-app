"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProfile() {
  const data = await fetch(`${API_URL}/api/profile`);
  console.log("LOREMVDVDVD: ", data);

  // const response = await data.json();
  return data;
}
