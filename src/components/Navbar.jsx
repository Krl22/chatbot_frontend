import logo from "../assets/logo.jpeg";
import { useAuthContext } from "@asgardeo/auth-react";

const Navbar = () => {
  const { state, signIn, signOut } = useAuthContext();
  return (
    <>
      <nav className="h-20 bg-rose-900">
        <div className="flex items-center justify-between h-20 px-4 mx-auto ">
          <div className="flex p-2 text-5xl text-ccab-white py-auto">
            <img src={logo} alt="Logo" className="h-16 rounded-2xl" />
            <div className="flex items-center justify-center "></div>
          </div>

          <div className="flex items-center justify-around w-auto text-2xl font-semibold text-white h-4/6">
            {state.isAuthenticated ? (
              <div className="dropdown dropdown-end w-[350px]">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center justify-center h-full p-4 transition duration-300 rounded-lg cursor-pointer bg-rose-900 hover:brightness-125"
                >
                  {state.username}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a onClick={() => signOut()} className="text-black">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <a
                onClick={() => signIn()}
                className="w-[150px] flex items-center h-full justify-center p-4 transition duration-300 rounded-lg cursor-pointer bg-rose-900 hover:brightness-125"
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
