import Form from "../../components/Form/root";
import { productData } from "../../components/Form/data_product";
const Home = () => {

  const submitHandler = (categories: string[], e: any) => {
    console.log(categories)
    console.log(e)
    const data = new FormData(e.currentTarget);
    console.log(data.get("material"))
  }

  return (
    <div className="gap-4 wh-full flex-center">
      <Form inputData={productData()} getData={submitHandler} />
      {/* <Link to="products">
        <ActionCard title="Materiały" image={materials_1} description="Zestawienie materiałów" />
      </Link>
      <Link to="companies">
        <ActionCard title="Firmy" image={companies_2} description="Zestawienie firm" />
      </Link> */}

    </div>
  );
};

export default Home;
