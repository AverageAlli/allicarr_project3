import { useEffect, useState } from 'react';

const AllRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null); // Track any errors
  const [loading, setLoading] = useState(true); // Track loading state

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Recipes</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllRecipesPage;