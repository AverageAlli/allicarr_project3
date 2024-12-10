"use client";

import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Perform the search query when the user types
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return; // Don't search if empty

    setLoading(true);
    setError(null);
    
    try {
      // Sending GET request to the search API (you need to update the URL to your actual API)
      const response = await axios.get('/api/search', {
        params: { name: searchTerm }, // You can also add tag or ingredient here based on the search type
      });
      
      // Update the state with the search results
      setSearchResults(response.data.recipes); // Assuming the response data has a 'recipes' key
    } catch (error) {
      setError('An error occurred while searching.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Search Recipes</h2>

      {/* Search input */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name, tag, or ingredient"
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading Spinner */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p>{error}</p>}

      {/* Display search results as cards */}
      {searchResults.length > 0 && (
        <div className="recipe-cards">
          {searchResults.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h4>{recipe.name}</h4>
              {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} />}
              <p>Tags: {recipe.tags.map(tag => tag.name).join(', ')}</p>
              <p>Ingredients: {recipe.ingredients.map(ingredient => ingredient.name).join(', ')}</p>
            </div>
          ))}
        </div>
      )}

      {/* If no results */}
      {searchResults.length === 0 && searchTerm && !loading && <p>No results found.</p>}
    </div>
  );
};

export default Search;