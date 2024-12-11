"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const GenerateRecipePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [cookingMethods, setCookingMethods] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCookingMethod, setSelectedCookingMethod] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingredientsResponse = await fetch("/api/ingredients");
        const tagsResponse = await fetch("/api/tags");
        const methodsResponse = await fetch("/api/cooking-methods");

        if (!ingredientsResponse.ok || !tagsResponse.ok || !methodsResponse.ok) {
          throw new Error("Failed to fetch data from the server");
        }

        const ingredientsData = await ingredientsResponse.json();
        const tagsData = await tagsResponse.json();
        const methodsData = await methodsResponse.json();

        setIngredients(ingredientsData);
        setTags(tagsData);
        setCookingMethods(methodsData);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!recipeName || !selectedCookingMethod) {
      setErrorMessage("Recipe name and cooking method are required.");
      setIsSubmitting(false);
      return;
    }

    if (selectedIngredients.length === 0) {
      setErrorMessage("Please select at least one ingredient.");
      setIsSubmitting(false);
      return;
    }

    if (selectedTags.length === 0) {
      setErrorMessage("Please select at least one tag.");
      setIsSubmitting(false);
      return;
    }

    const newRecipe = {
      name: recipeName,
      imageUrl: imageUrl,
      ingredients: selectedIngredients,
      tags: selectedTags,
      cookingMethod: selectedCookingMethod,
    };

    try {
      const response = await fetch("/api/create-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        router.push("/recipes");
      } else {
        setErrorMessage("Error creating recipe.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrorMessage("Error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Recipe</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block">Recipe Name:</label>
            <input
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="space-y-2">
            <label className="block">Recipe Image URL:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="space-y-2">
            <label className="block">Ingredients:</label>
            <select
              multiple
              value={selectedIngredients}
              onChange={(e) =>
                setSelectedIngredients([...e.target.selectedOptions].map(option => option.value))
              }
              className="w-full p-2 border border-gray-300 rounded"
            >
              {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block">Tags:</label>
            <select
              multiple
              value={selectedTags}
              onChange={(e) =>
                setSelectedTags([...e.target.selectedOptions].map(option => option.value))
              }
              className="w-full p-2 border border-gray-300 rounded"
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block">Cooking Method:</label>
            <select
              value={selectedCookingMethod}
              onChange={(e) => setSelectedCookingMethod(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a method</option>
              {cookingMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 text-white bg-green-700 rounded-md shadow-sm hover:bg-green-500focus:outline-none ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "Creating..." : "Create Recipe"}
          </button>
        </form>
      )}
    </div>
  );
};

export default GenerateRecipePage;