import { API_URL } from '../constants/apiURL';
import { ProjectForm } from '../types/formInterfaces';
import { token as tknCookie } from '../constants/cookies';
import Cookies from 'js-cookie';

export const createProject = async (project: ProjectForm) => {
  const formData = new FormData();
  const token = Cookies.get(tknCookie);

  Object.entries(project).forEach(([key, value]) => {
    if (key === 'links' && Array.isArray(value)) {
      const linksString = value.map((item) => item.field).join(', ');
      formData.append(key, linksString);
    } else if (key === 'images' && Array.isArray(value)) {
      value.forEach((img) => {
        const fileList = img.imageField as FileList;
        if (fileList instanceof FileList) {
          Array.from(fileList).forEach((file: File) => {
            formData.append('file', file);
          });
        }
      });
    } else if (typeof value === 'string') {
      formData.append(key, value);
    }
  });

  const response = await fetch(`${API_URL}projects`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Server responded with a non-200 status code');
  }
  const data = await response.json();
  return data;
};

export const deleteProject = async (id: string) => {
  const token = Cookies.get(tknCookie);
  const response = await fetch(`${API_URL}projects/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Server responded with a non-200 status code');
  }
  const data = await response.json();
  return data;
};
export const getProjectById = async (id: string) => {
  const response = await fetch(`${API_URL}projects/${id}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export const updateProject = async (id: string, body: ProjectForm) => {
  const formData = new FormData();
  const token = Cookies.get(tknCookie);
  Object.entries(body).forEach(([key, value]) => {
    if (value) {
      if (key === 'links' && Array.isArray(value)) {
        value.forEach((link) => {
          if (link.field.trim() !== '') {
            formData.append('links', link.field);
          }
        });
      } else if (key === 'images' && Array.isArray(value)) {
        const nonEmptyImages = value.filter(imageObj => imageObj.imageField.length > 0);
        if (nonEmptyImages.length > 0) {
          nonEmptyImages.forEach((imageObj: { imageField: FileList }) => {
            Array.from(imageObj.imageField).forEach((file) => {
              formData.append('images', file);
            });
          });
        }
      } else if (typeof value === 'string' && value.trim() !== '') {
        formData.append(key, value);
      }
    }
  });

  const response = await fetch(`${API_URL}projects/${id}`, {
    method: 'PUT',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Server responded with a non-200 status code');
  }

  const data = await response.json();
  return data;
};
