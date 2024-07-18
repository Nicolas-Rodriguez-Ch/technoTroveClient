// EditProject component
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectById, updateProject } from "../../services/projectAPI";
import { ToastContainer, toast } from "react-toastify";
import ProjectForm from "../../components/projectForm/ProjectForm";
import { ProjectForm as ProjectFormType } from "../../types/formInterfaces";
import texts from "../../utils/texts";

const EditProject = () => {
  const { id } = useParams<string>();
  const [project, setProject] = useState<ProjectFormType | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const { data } = await getProjectById(id);
          setProject(data);
        } catch (error) {
          if (error instanceof Error) {
            toast.error(`Error: ${error.message}`);
          }
        }
      }
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (data: ProjectFormType) => {
    try {
      if (id) {
        await updateProject(id, data);
        toast.success("Project updates successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <section className="flex flex-col items-center bg-custom-black text-custom-mint p-4 gap-2">
      <ToastContainer />
      <h1 className="font-bold text-xl md:text-3xl">{texts.portfolio}</h1>
      <p className="text-center md:text-left text-sm md:text-base">
        {texts.portfolioText}
      </p>
      {project && (
        <ProjectForm
          defaultValues={project}
          onSubmit={handleSubmit}
          disabled={false}
        />
      )}
    </section>
  );
};

export default EditProject;
