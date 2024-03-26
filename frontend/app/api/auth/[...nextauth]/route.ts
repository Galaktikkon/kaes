import NextAuth from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };
