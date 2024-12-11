"use client";

import React, { useState } from "react";
import axios from "axios";
import { useSpring, useTransition, animated } from "@react-spring/web";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/search", {
        params: { name: searchTerm },
      });

      setSearchResults(response.data.recipes);
    } catch (error) {
      setError("An error occurred while searching.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Animations for loading and error
  const loadingSpring = useSpring({ opacity: loading ? 1 : 0 });
  const errorSpring = useSpring({ opacity: error ? 1 : 0 });

  const transitions = useTransition(searchResults, {
    keys: (recipe) => recipe.id,
    from: { opacity: 0, transform: "translateY(10px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-10px)" },
  });

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Search Recipes</h2>

      {/* Search input */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-center w-full max-w-lg space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name, tag, or ingredient"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </form>

      {/* Loading Indicator */}
      {loading && <animated.p style={loadingSpring} className="text-gray-500">Loading...</animated.p>}

      {/* Error Message */}
      {error && <animated.p style={errorSpring} className="text-red-500">{error}</animated.p>}

      {/* Display search results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mt-6">
        {transitions((style, recipe) => (
          <animated.div
            key={recipe.id}
            style={style}
            className="p-4 bg-white border rounded-lg shadow-md"
          >
            <h4 className="text-lg font-semibold">{recipe.name}</h4>
            {recipe.imageUrl && (
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-32 object-cover rounded-md mt-2"
              />
            )}
            <p className="text-gray-600 mt-2">
              Tags: {recipe.tags.map((tag) => tag.name).join(", ")}
            </p>
            <p className="text-gray-600">
              Ingredients: {recipe.ingredients.map((ingredient) => ingredient.name).join(", ")}
            </p>
          </animated.div>
        ))}
      </div>

      {/* No results */}
      {searchResults.length === 0 && searchTerm && !loading && (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default Search;