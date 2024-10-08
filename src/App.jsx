import React, { useState } from "react";
import Icons from "./components/Icons";
import HouseCalculator from "./components/HouseCalculator";
import TileCalculator from "./components/TileCalculator";
import PaintCalculator from "./components/PaintCalculator";
import PlumbingCalculator from "./components/PlumbingCalculator";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    { name: "House", color: "text-green-500", link: "#house-page" },
    { name: "Floor & Wall tile", color: "text-blue-500", link: "#tile-page" },
    { name: "Paint", color: "text-yellow-500", link: "#paint" },
    { name: "Plumbing", color: "text-cyan-500", link: "#plumbing" },
    { name: "Electrical", color: "text-orange-500", link: "#electrical" },
    {
      name: "Doors & Windows",
      color: "text-purple-500",
      link: "#doors-windows",
    },
  ];

  return (
    <div className="min-auto-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 relative">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Tool Website</div>
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white text-2xl focus:outline-none"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
          <ul
            className={`lg:flex lg:space-x-4 lg:static lg:bg-transparent lg:w-auto
                        ${isMenuOpen ? "block" : "hidden"}
                        absolute right-0 top-full bg-gray-800 w-48 p-4 mt-2 rounded-lg
                        shadow-lg z-10 transition-all duration-300 ease-in-out`}
          >
            {["Home", "About", "Tools", "Contact", "Policy", "FAQ"].map(
              (item) => (
                <li key={item} className="mb-2 lg:mb-0">
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-gray-300 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>
      </header>

      <main className="container mt-5 mx-auto p-4">
        <section id="about" className="mb-20">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-gray-300">
            Tool Websites Hub is dedicated to providing accurate and helpful
            tools for house construction planning and budget estimation in
            India. Our goal is to empower homeowners and builders with the
            information they need to make informed decisions about their
            construction projects.
          </p>
        </section>

        <section id="tools" className="mb-20">
          <h2 className="text-2xl font-bold mb-4">Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.link}
                className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Icons name={category.name} color={category.color} />
                <p className="mt-2 text-center">{category.name}</p>
              </a>
            ))}
          </div>
          <p className="mt-4 text-center text-gray-400">
            We are continuously adding new tools to our platform.
          </p>
        </section>
      </main>
      <HouseCalculator />
      <TileCalculator />
      <PaintCalculator />
      <PlumbingCalculator />

      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center text-gray-400">
          &copy; {new Date().getFullYear()} Tool Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
