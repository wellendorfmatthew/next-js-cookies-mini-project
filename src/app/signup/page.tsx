'use client'
import React from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })

      if (!response.ok) {
        throw new Error("rip");
      }

      console.log(response);
      const data = response.json();
      console.log(data);
      router.push("/")
      return data;

    } catch (error: any) {
      return error;
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex justify-center gap-8 flex-col items-center border-black border-2 rounded-3xl p-10">
            <p className="text-4xl">Sign Up</p>
            <input 
              type="text" 
              placeholder="Email" 
              className="border-b-black border-2 border-l-0 border-r-0 border-t-0 pl-2 text-2xl outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
               />
            <input
              type="password" 
              placeholder="Password" 
              className="border-b-black border-2 border-l-0 border-r-0 border-t-0 pl-2 text-2xl outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
               />
            <button className="border-black border-2 px-10 py-3 rounded-2xl hover:bg-black hover:text-white duration-500" onClick={() => handleSignup()}>Sign Up</button>
        </div>
      </div>
    </>
  );
}
