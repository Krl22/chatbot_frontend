import logo from "../assets/logo.jpeg";
import name from "../assets/name/jpeg";
import { useAuthContext } from "@asgardeo/auth-react";

const Navbar = () => {
  const { state, signIn, signOut } = useAuthContext();
  return (
    <>
      <nav className="h-20 bg-rose-900">
        <div className="flex items-center justify-between h-20 px-4 mx-auto ">
          <div className="p-2 text-5xl text-ccab-white py-auto">
            <img src={logo} alt="Logo" className="h-16 rounded-2xl" />
          </div>

          <div className="flex items-center h-4/6 w-[150px] justify-around text-2xl font-semibold text-white">
            {state.isAuthenticated ? (
              <a
                onClick={() => signOut()}
                className="flex items-center h-full p-4 transition duration-300 rounded-lg cursor-pointer bg-rose-900 hover:brightness-125"
              >
                Logout
              </a>
            ) : (
              <a
                onClick={() => signIn()}
                className="flex items-center h-full p-4 transition duration-300 rounded-lg cursor-pointer bg-rose-900 hover:brightness-125"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
