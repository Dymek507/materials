import { Link } from "react-router-dom";
import { companies_2, materials_1 } from "../../assets";
import ActionCard from "./ActionCard";

const Home = () => {
  return (
    <div className="gap-4 wh-full flex-center">
      <Link to="products">
        <ActionCard title="Materiały" image={materials_1} description="Zestawienie materiałów" />
      </Link>
      <Link to="companies">
        <ActionCard title="Firmy" image={companies_2} description="Zestawienie firm" />
      </Link>

    </div>
  );
};

export default Home;
