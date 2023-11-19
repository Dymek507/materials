import { useState } from "react";
import { Link } from "react-router-dom";
import { companies_2, materials_1 } from "../../assets";
import ActionCard from "./ActionCard";
import ImportFromExcel from "../Company/Products/ImportFromExcel/root";
const Home = () => {
  const [showImportModal, setShowImportModal] = useState(true);

  return (
    <div className="gap-4 wh-full flex-center">
      <Link to="products">
        <ActionCard title="Materiały" image={materials_1} description="Zestawienie materiałów" />
      </Link>
      <Link to="companies">
        <ActionCard title="Firmy" image={companies_2} description="Zestawienie firm" />
      </Link>
      {/* <ImportFromExcel open={showImportModal} onClose={() => setShowImportModal(false)} /> */}
    </div>
  );
};

export default Home;
