
interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
}

const ProjectCard = ({ image, title, description }: ProjectCardProps) => {
  return (
    <section className="flex flex-col items-center p-4 gap-4 border-2 border-custom-blue bg-custom-mint text-custom-black rounded-lg transition duration-300 ease-in-out hover:bg-custom-black hover:text-custom-mint">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
        />
        <div className="gap-2 flex flew-col md:flex-row">
          <h1 className="font-bold">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4 md:mt-0">
        <button className="bg-custom-red w-auto p-2 font-bold rounded-3xl text-custom-mint border-2 border-custom-black hover:text-custom-red hover:bg-custom-mint">
          Delete
        </button>
        <button className="bg-custom-blue w-auto p-2 font-bold rounded-2xl text-custom-mint border-2 border-custom-black hover:text-custom-black hover:bg-custom-mint">
          Edit
        </button>
      </div>
    </section>
  );
};

export default ProjectCard;
