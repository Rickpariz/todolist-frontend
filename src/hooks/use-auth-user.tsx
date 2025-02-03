import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getAuthToken } from "@/lib/utils";

interface UserPayload {
  id: string;
  name: string;
  email: string;
}

export const useAuthUser = () => {
  const token = getAuthToken();

  const user = useMemo(() => {
    if (!token) return null;

    try {
      const decoded = jwtDecode<UserPayload>(token);
      return decoded;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [token]);

  return user;
};
