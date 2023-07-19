import Cookies from "js-cookie";
import { User } from "../store/reducers/users/userInterfaces";

export const getUser = () => {
  const token = Cookies.get("token");
  return fetch(`api/user/${token}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserAsync = async (user: FormData): Promise<User> => {
  const token = Cookies.get("token");
  const response = await fetch(`/api/user`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: user,
  });

  if (!response.ok) {
    throw new Error("Server responded with a non-200 status code");
  }

  const data: User = await response.json();
  return data;
};


export const deleteUser = async () => {
  const token = Cookies.get("token");
  const response = await fetch("/api/user/delete", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Server responded with a non-200 status code");
  }
};
