"use client";

import { useEffect, useState } from 'react';

const AllRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null); // Track any errors
  const [loading, setLoading] = useState(true); // Track loading state
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Track the selected recipe for details

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('/api/recipes');
        const data = await res.json();

        if (data.success) {
          setRecipes(data.data); // Set recipes using the 'data' key
        } else {
          setError(data.error); // Set error if no recipes found
        }
      } catch (error) {
        setError('Error fetching recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipeId) => {
    // Find the clicked recipe from the recipes array
    const clickedRecipe = recipes.find((recipe) => recipe.id === recipeId);
    setSelectedRecipe(clickedRecipe);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Recipes</h1>
      
      {/* Error message */}
      {error && <p>{error}</p>}

      {/* Recipe Cards */}
      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
            onClick={() => handleRecipeClick(recipe.id)}
          >
            <h3>{recipe.name}</h3>
            {recipe.imageUrl && (
              <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
            )}
            {!recipe.imageUrl && <div className="no-image">No Image</div>}
          </div>
        ))}
      </div>

      {/* Recipe Details */}
      {selectedRecipe && (
        <div className="recipe-details">
          <h2>{selectedRecipe.name}</h2>
          {selectedRecipe.imageUrl && (
            <img src={selectedRecipe.imageUrl} alt={selectedRecipe.name} className="recipe-image" />
          )}
          <h3>Cooking Steps:</h3>
          <ul>
            {selectedRecipe.cookingSteps?.map((step, index) => (
              <li key={index}>{step.template}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllRecipesPage;