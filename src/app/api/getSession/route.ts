import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export const GET = async (req: NextRequest) => {
    const cookie = cookies();

    const token = cookie.get("session");

    if (!token) {
        return NextResponse.json({error: "Unauthorized Access"}, {status: 403});
    }

    const { value } = token;
    const secret = process.env.SECRET || "";

    try {
        const result = verify(value, secret);
        console.log("result ", result)
        return NextResponse.json({token: result}, {status: 200});   
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
