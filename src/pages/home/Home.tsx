import './Home.css';
import texts from '../../utils/texts';

const Home = () => {
  return (
    <div className="Home">
      <h1>{texts.home}</h1>
      <p>{import.meta.env.VITE_EXAMPLE_VARIABLE}</p>
    </div>
  );
};

export default Home;
