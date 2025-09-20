import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-[80px] flex justify-center items-center bg-blue-500 text-white">
      <div className="container mx-auto flex justify-between">
        <h2>Header</h2>
        <ul className="flex gap-10">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/phone"}>Phone</Link>
          </li>
          <li>
            <Link to={"/phone"}>About</Link>
          </li>
          <li>
            <Link to={"/phone"}>Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
