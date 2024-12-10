"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Next.js useRouter hook

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
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage button state
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
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable button when submitting

    // Validate form input
    if (!recipeName || !selectedCookingMethod) {
      setErrorMessage("Recipe name and cooking method are required.");
      setIsSubmitting(false); // Re-enable button on failure
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

    // Prepare the data to send to the backend
    const newRecipe = {
      name: recipeName,
      imageUrl: imageUrl,
      ingredients: selectedIngredients,  // Array of ingredient IDs
      tags: selectedTags,                // Array of tag IDs
      cookingMethod: selectedCookingMethod, // ID of the selected cooking method
    };

    console.log("New Recipe Data: ", newRecipe); // Log the data to be sent

    try {
      const response = await fetch("/api/create-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        // Redirect to another page after successful creation
        router.push("/recipes");
      } else {
        setErrorMessage("Error creating recipe.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error); // Log the error
      setErrorMessage("Error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable button after submission attempt
    }
  };

  return (
    <div>
      <h1>Create a New Recipe</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Name:</label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Recipe Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <select
            multiple
            value={selectedIngredients}
            onChange={(e) =>
              setSelectedIngredients([...e.target.selectedOptions].map(option => option.value))
            }
          >
            {ingredients.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Tags:</label>
          <select
            multiple
            value={selectedTags}
            onChange={(e) =>
              setSelectedTags([...e.target.selectedOptions].map(option => option.value))
            }
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Cooking Method:</label>
          <select
            value={selectedCookingMethod}
            onChange={(e) => setSelectedCookingMethod(e.target.value)}
            required
          >
            <option value="">Select a method</option>
            {cookingMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Recipe"}
        </button>
      </form>
    </div>
  );
};

export default GenerateRecipePage;