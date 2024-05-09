import { useAuthContext } from "@asgardeo/auth-react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./components/glass.css";

function App() {
  const { state, signIn } = useAuthContext();

  return (
    <>
      <Navbar></Navbar>
      {state.isAuthenticated ? (
        <>
          <Home></Home>
        </>
      ) : (
        <div className="bg">
          <ul className="h-full glass">
            <div className="flex items-center justify-center h-2/3">
              <div className="absolute inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg">
                <div className="max-w-4xl p-8 px-4 mx-auto bg-white bg-opacity-50 rounded-lg shadow-lg sm:px-6 lg:px-8">
                  <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
                    Welcome to my Analyst Assistant!
                  </h2>
                  <p className="mb-8 text-lg text-center text-gray-700">
                    In this website I'm offering a complete solution for
                    analizyng tables, taking important notes, and communicating
                    efficiently with a Artificial Ingeligence. My platform allow
                    the user to feed an assistant with data from csv files and
                    notes so you can get a precise answer.
                  </p>
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4 mb-8 md:w-1/3">
                      <div className="p-6 bg-white rounded-lg shadow-md bg-opacity-70">
                        <h3 className="mb-4 text-xl font-semibold text-gray-800">
                          Custom Tables
                        </h3>
                        <p className="text-gray-700">
                          Need to analyze your tables? With my intuitive tools,
                          you can upload and manage your own tables efficiently.
                          From csv files you can get your tables in the platform
                          for the assistant.
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4 mb-8 md:w-1/3">
                      <div className="p-6 bg-white rounded-lg shadow-md bg-opacity-70">
                        <h3 className="mb-4 text-xl font-semibold text-gray-800">
                          Quick Notes
                        </h3>
                        <p className="text-gray-700">
                          Adding quick and useful notes! My note-taking system
                          allows you to capture ideas, task lists, and important
                          details all in one place. this notes will be
                          considered for the bot response.
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4 mb-8 md:w-1/3">
                      <div className="p-6 bg-white rounded-lg shadow-md bg-opacity-70">
                        <h3 className="mb-4 text-xl font-semibold text-gray-800">
                          Integrated Chat
                        </h3>
                        <p className="text-gray-700">
                          And when it comes to analyze csv tables with AI, you
                          might find a little challenging to transfer your data
                          from your tables to the chat so this is a good
                          solution!
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-8 text-lg text-center text-gray-700">
                    <a className="link" onClick={() => signIn()}>
                      Login
                    </a>{" "}
                    to start with the analysis!
                  </p>
                </div>
              </div>
            </div>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
