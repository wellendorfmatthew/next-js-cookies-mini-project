import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { serialize } from "cookie";

export const POST = async (req: NextRequest) => {
    try {
        const cookie = cookies().set("session", "", { maxAge: 0 });
        console.log("delete cookie ", cookie)
        const serialized = serialize("session", "", {
            maxAge: 0,
            path: "/"
        })
        return NextResponse.json({message: "Signed out"}, {status: 200, headers: {"Set-Cookie": serialized}});   
    } catch (error) {
        return NextResponse.json({error : "Couldn't delete session cookie"}, {status: 400});
    }
}
