import { NextResponse, NextRequest } from "next/server";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export const PUT = async (req: NextRequest) => {
    const body = await req.json();
    const { newEmail } = body;

    const secret = process.env.SECRET || "";

    const email = newEmail;

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

    return NextResponse.json({message: "Session Updated"}, {status: 200, headers: { "Set-Cookie": serialized}});
}
