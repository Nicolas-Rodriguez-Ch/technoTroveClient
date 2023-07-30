import { useRef, useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { Project } from "../../store/reducers/users/userInterfaces";
import ProjectCard from "../projectCard/ProjectCard";

interface PortfolioCardProps {
  title: string;
  projects?: Project[];
}

const PortfolioCard = ({ title, projects }: PortfolioCardProps) => {
  const [showMenu, setShowMenu] = useState(true);
  const [height, setHeight] = useState("0px");

  const contentArea = useRef<HTMLDivElement | null>(null);

  const toggleAccordion = () => {
    setShowMenu(!showMenu);
    setHeight(showMenu ? "0px" : `${contentArea.current?.scrollHeight}px`);
  };

  useEffect(() => {
    if (showMenu) {
      setHeight(`${contentArea.current?.scrollHeight}px`);
    }
  }, [projects, showMenu]);

  return (
    <main className="border-2 border-custom-blue text-center md:text-left w-72 md:w-full">
      <section className="bg-custom-light-blue font-bold flex justify-between">
        <h1>{title}</h1>
        <section className="cursor-pointer" onClick={toggleAccordion}>
          {!showMenu ? <BsPlus size={30} /> : <BiMinus size={30} />}
        </section>
      </section>
      <section
        ref={contentArea}
        style={{ maxHeight: `${height}` }}
        className={`overflow-hidden transition-all duration-500 ease-in-out`}
      >
        {projects &&
          projects.map((project: Project) => {
            return (
              <div key={project.id} className="m-4">
                <ProjectCard
                  image={project.images[0]}
                  title={project.title}
                  description={project.description}
                />
              </div>
            );
          })}
      </section>
    </main>
  );
};

export default PortfolioCard;
