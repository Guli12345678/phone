import { Route, Routes } from "react-router-dom";
import Phone from "./pages/phone/Phone";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/phone" element={<Phone />}></Route>
      </Routes>
    </>
  );
}

export default App;
