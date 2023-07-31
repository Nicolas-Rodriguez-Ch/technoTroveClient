import PortfolioCard from "../../components/portfolioCard/PortfolioCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import texts from "../../utils/texts";
import NewProjectForm from "../../components/newProjectForm/NewProjectForm";

const Portfolio = () => {
  const { status, data: user } = useSelector((state: RootState) => state.user);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col items-center bg-custom-black text-custom-mint p-4 gap-2">
      <h1 className="font-bold text-xl md:text-3xl">{texts.portfolio}</h1>
      <p className="text-center md:text-left text-sm md:text-base">{texts.portfolioText}</p>
      <PortfolioCard
        title={texts.portoflioFirstTitle}
        projects={user?.data.Project ?? []}
      />
      <PortfolioCard title={texts.portoflioSecondTitle} menuOpen={false}>
        <NewProjectForm />
      </PortfolioCard>
    </section>
  );
};

export default Portfolio;
