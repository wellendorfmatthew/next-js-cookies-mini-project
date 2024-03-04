import { NextResponse, NextRequest } from "next/server";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { email, password } = body;

    const secret = process.env.SECRET || "";

    const token = sign({
        email,
    }, secret, {
        expiresIn: 60 * 60 * 24 * 1000
    })

    const serialized = serialize("session", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
        path: "/"
    })

    return NextResponse.json({message: "Success"}, {status: 200, headers: { "Set-Cookie": serialized}});
}
