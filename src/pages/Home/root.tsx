import { Link } from "react-router-dom";
import { companies_2, materials_1 } from "../../assets";
import ActionCard from "./ActionCard";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const Home = () => {


  const auth = getAuth();
  const registerHandler = () => {
    createUserWithEmailAndPassword(auth, "damian@124.pl", "1234567")
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        // ..
      });
  }
  return (
    <div className="gap-4 wh-full flex-center">
      <button onClick={registerHandler}>CLICK</button>
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
