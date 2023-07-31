import Cookies from "js-cookie";
import { Project } from "../store/reducers/users/userInterfaces";
import { token as tknCookie } from "../constants/cookies";
import { API_URL } from "../constants/apiURL";
import { ProjectForm } from "../types/formInterfaces";

export const createProject = async (project: ProjectForm) => {
  const formData = new FormData();
  const token = Cookies.get(tknCookie);

  Object.entries(project).forEach(([key, value]) => {
    if (key === "links" && Array.isArray(value)) {
      const linksString = value.map((item) => item.field).join(", ");
      formData.append(key, linksString);
    } else if (key === "images" && Array.isArray(value)) {
      value.forEach((img) => {
        const fileList = img.imageField as FileList;
        if (fileList instanceof FileList) {
          Array.from(fileList).forEach((file: File) => {
            formData.append("file", file);
          });
        }
      });
    } else if (typeof value === "string") {
      formData.append(key, value);
    }
  });

  const response = await fetch(`${API_URL}projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const deleteProject = async (id: string) => {
  const token = Cookies.get(tknCookie);
  const response = await fetch(`${API_URL}projects/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
