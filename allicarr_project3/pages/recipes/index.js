"use client";

import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const AllRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('/api/recipes');
        const data = await res.json();

        if (data.success) {
          setRecipes(data.data);
        } else {
          setError(data.error);
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
    const clickedRecipe = recipes.find((recipe) => recipe.id === recipeId);
    setSelectedRecipe(clickedRecipe);
  };

  // Define animations for the cards
  const cardAnimation = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.95)' },
    config: { tension: 200, friction: 20 },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-8 px-4">
      <h1 className="text-4xl font-bold text-center font-Doto tracking-wide">All Recipes</h1>
      
      {/* Error message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Recipe Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <animated.div
            key={recipe.id}
            style={cardAnimation}
            className="recipe-card bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer"
            onClick={() => handleRecipeClick(recipe.id)}
          >
            <h3 className="text-xl font-semibold text-green-800">{recipe.name}</h3>

            {/* Tags section */}
            <div className="mt-2 flex flex-wrap gap-2">
              {recipe.tags?.length > 0 ? (
                recipe.tags.map((tag, index) => (
                  <span key={index} className="bg-green-100 text-green-700 text-sm py-1 px-2 rounded-full">{tag}</span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">No Tags Available</span>
              )}
            </div>

            {/* Ingredients section */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-700">Ingredients:</h4>
              {recipe.ingredients?.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No Ingredients Available</p>
              )}
            </div>

            {/* Recipe Image or No Image message */}
            <div className="mt-4">
              {recipe.imageUrl ? (
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="text-center text-gray-400">No Image</div>
              )}
            </div>
          </animated.div>
        ))}
      </div>

      {/* Recipe Details */}
      {selectedRecipe && (
        <div className="recipe-details mt-8">
          <h2 className="text-3xl font-semibold text-green-800">{selectedRecipe.name}</h2>
          {selectedRecipe.imageUrl && (
            <img
              src={selectedRecipe.imageUrl}
              alt={selectedRecipe.name}
              className="mt-4 w-full h-64 object-cover rounded-lg"
            />
          )}
          <h3 className="mt-4 text-2xl font-semibold">Cooking Steps:</h3>
          <ul className="mt-2 list-disc list-inside">
            {selectedRecipe.cookingSteps?.map((step, index) => (
              <li key={index} className="text-lg text-gray-700">{step.template}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllRecipesPage;
