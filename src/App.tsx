import { Navbar } from "./components";
import { Home, Settings} from "./pages";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container ">
        <Route path="/" element={<Home />} />
        <Route path="/Settings" element={<Settings />} />
      </div>
    </>
  );
};

export default App;
