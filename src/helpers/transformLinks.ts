import { ProjectField } from '../types/formInterfaces';

export const transformLinks = (
  links: ProjectField[]
): { id: string; field: string }[] => {
  return links.map((link, index) => ({
    id: index.toString(),
    field: link.field,
  }));
};

