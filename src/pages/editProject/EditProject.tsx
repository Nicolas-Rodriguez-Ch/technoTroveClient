import { AppDispatch } from '../../store/store';
import { fetchUser } from '../../store/reducers/users/userSlice';
import { getProjectById, updateProject } from '../../services/projectAPI';
import { ProjectForm as ProjectFormType } from '../../types/formInterfaces';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ProjectForm from '../../components/projectForm/ProjectForm';
import routePaths from '../../constants/routePaths';
import texts from '../../utils/texts';

const EditProject = () => {
  const { id } = useParams<string>();
  const [isDisabled, setIsDisabled] = useState(false);
  const [project, setProject] = useState<ProjectFormType | null>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

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
      setIsDisabled(true);
      if (id) {
        await updateProject(id, data);
        toast.success(texts.editProjectSucces);
        dispatch(fetchUser());
        setTimeout(() => {
          navigate(`${routePaths.portfolio}`);
        }, 5750);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
        setIsDisabled(false);
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
          disabled={isDisabled}
        />
      )}
    </section>
  );
};

export default EditProject;
