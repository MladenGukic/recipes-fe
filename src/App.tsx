import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import { RecipesList } from "./components/RecipesList/RecipesList";
import { Recipe } from "./models";
import { PageSelectorList } from "./components/PageSelectorList/PageSelectorList";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(1);

  const fetchRecipesHandler = async (searchTerm: string, page: number) => {
    try {
      const response = await fetch(
        `http://localhost:8081/recipes?search=${searchTerm}&page=${page}&pageSize=5`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const transformedRecipes = data.recipes.map((recipesData: Recipe[]) => {
        return recipesData;
      });
      setRecipes(transformedRecipes);
      setNumberOfPages(data.totalPages);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchRecipesHandler("", 1);
  }, []);
  return (
    <Wrapper className="App">
      <RecipesList
        recipes={recipes}
        setRecipes={setRecipes}
        setError={setError}
        fetchRecipes={fetchRecipesHandler}
      />
      <PageSelectorList
        fetchRecipes={fetchRecipesHandler}
        numberOfPages={numberOfPages}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  & h2 {
    display: flex;
  }
`;

export default App;
