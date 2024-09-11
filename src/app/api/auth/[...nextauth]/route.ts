import { authOption } from "@/lib/auth/authOption";
import nextAuth from "next-auth";

const handler = nextAuth(authOption)

export {handler as GET,handler as POST}