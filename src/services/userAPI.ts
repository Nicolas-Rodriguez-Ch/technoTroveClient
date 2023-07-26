import Cookies from "js-cookie";
import { LoginResponse, User } from "../store/reducers/users/userInterfaces";
import { token as tknCookie } from "../constants/cookies";
import { API_URL, AUTH_URL } from "../constants/apiURL";
import { FormValues } from "../types/formInterfaces";

export const createUser = async (user: FormValues) => {
  const formData = new FormData();

  Object.entries(user).forEach(([key, value]) => {
    if (key === "contactInfo" && Array.isArray(value)) {
      const contactInfoString = value.map((item) => item.field).join(", ");
      formData.append(key, contactInfoString);
    } else if (key === "image" && value instanceof FileList) {
      formData.append("file", value[0]);
    } else if (typeof value === "string") {
      formData.append(key, value);
    }
  });
  const response = await fetch(`${AUTH_URL}local/signup`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Server responded with a non-200 status code");
  }

  const data = await response.json();
  return data;
};

export const authenticateUser = async (credentials: {
  email: string;
  password: string;
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
  return fetch(`${API_URL}profile`, {
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
