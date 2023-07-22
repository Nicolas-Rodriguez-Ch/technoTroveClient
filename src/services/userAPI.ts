import Cookies from "js-cookie";
import { LoginResponse, User } from "../store/reducers/users/userInterfaces";
import { token as tknCookie } from "../constants/cookies";
import { API_URL, AUTH_URL } from "../constants/apiURL";

export const authenticateUser = async (credentials: {
  email: string,
  password: string
}): Promise<LoginResponse> => {
  const response = await fetch(`${AUTH_URL}local/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Server responded with a non-200 status code");
  }

  const data: LoginResponse = await response.json();
  return data;
};

export const getUser = () => {
  const token = Cookies.get(tknCookie);
  return fetch(`${API_URL}users/${token}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserAsync = async (user: FormData): Promise<User> => {
  const token = Cookies.get(tknCookie);
  const response = await fetch(`${API_URL}users`, {
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

export const deleteUserAsync = async () => {
  const token = Cookies.get(tknCookie);
  const response = await fetch(`${API_URL}users`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Server responded with a non-200 status code");
  }
};
