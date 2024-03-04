'use client'
import Image from "next/image";
import { Modal } from "@mui/material";
import {Link} from "@mui/material";
import {Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  useEffect(() => {
    (async () => {
      const user = await getUser();
      console.log("user", user);

      if (!user) {
        return;
      }
      setEmail(user);
    })()
  }, [])

  const getUser = async() : Promise<any> => {
    try {
      const response = await fetch("http://localhost:3000/api/getSession");

      const data = await response.json();
      console.log(data);
      return data.token.email; 
    } catch (error: any) {
      return null;
    }
  }

  const signOut = async() : Promise<any> => {
    try {
      const response = await fetch("http://localhost:3000/api/signOut", {
        method: "POST"
      });
      const data = await response.json();
      console.log(data);
      setEmail("");
      router.push("/")
      return data;
    } catch (error: any) {
      return null;
    }
  }

  const updateEmail = async() => {
    try {
      const response = await fetch("http://localhost:3000/api/updateEmail", {
        method: "PUT",
        body: JSON.stringify({
          newEmail: newEmail,
        })
      })
      const data = await response.json();
      console.log(data);
      return window.location.reload();
    } catch (error) {
      return null;
    }
  }

  return (
    <>
      <div className="w-screen h-32 border-blue-600 border-b-2 flex items-center justify-between">
        <p className="text-4xl text-blue-600 ml-20">
          Header
        </p>
        <div className="flex gap-10 mr-20 text-2xl">
          <Link href="#" underline="hover">Home</Link>
          <Link href="#" underline="hover">About</Link>
          <Link href="#" underline="hover">Contact Us</Link>
          {email ? <Link href="#" underline="hover">{email}</Link> : null}
          {email ? <Link underline="hover" onClick={() => signOut()} className="cursor-pointer">Sign Out</Link> : <Link href="/signup" underline="hover">Sign Up</Link>}
        </div>
      </div>
      <div className="w-screen h-screen flex flex-col items-center gap-10">
        <p className="text-3xl text-blue-600 mt-20">Update Email</p>
            <input 
              type="text" 
              placeholder="Email" 
              className="border-b-blue-600 border-2 border-l-0 border-r-0 border-t-0 pl-2 text-2xl outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={true}
            />
            <input
              type="text" 
              placeholder="New Email" 
              className="border-b-blue-600 border-2 border-l-0 border-r-0 border-t-0 pl-2 text-2xl outline-none"
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}
            />
            <button className="border-2 border-blue-600 px-10 py-3 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white duration-500" onClick={() => updateEmail()}>Update</button>
      </div>
    </>
  );
}
