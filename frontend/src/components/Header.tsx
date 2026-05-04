import { Link } from "react-router";
import { Button } from "./ui/button";
import useAuth from "@/hooks/useAuth";

const Header = () => {
  const { isAuthenticated } = useAuth();
  return (
    <header className="flex p-8 flex-row justify-between">
      <div className="text-4xl font-extrabold">Falconia</div>
      {!isAuthenticated ? (
        <div className="flex gap-2 flex-row">
          <Link to="/login">
            <Button className="cursor-pointer text-xl" size="lg">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="cursor-pointer text-xl" size="lg">
              Register
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <Button
              className="cursor-pointer text-white text-xl bg-red-700"
              size="lg"
            >
              Logout
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
