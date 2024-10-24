import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "@/config/authOptions";

const getAuth = async () =>
  typeof window === "undefined"
    ? await getServerSession(authOptions)
    : await getSession();

export const jwtToken = async () => {
  const session = await getAuth();
  return session?.user?.accessToken || false;
};

export const authUser = async () => {
  const session = await getAuth();
  return session?.user && (delete session.user.accessToken, session.user);
};
