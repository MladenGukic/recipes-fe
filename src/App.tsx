import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import { RecipesList } from "./components/RecipesList/RecipesList";
import { Recipe } from "./types/types";
import { PageSelectorList } from "./components/PageSelectorList/PageSelectorList";
import { API_URL } from "./API_URL";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(1);

  const fetchRecipesHandler = async (
    page: number = 1,
    searchTerm: string = ""
  ) => {
    try {
      const response = await fetch(
        `${API_URL}?search=${searchTerm}&page=${page}&pageSize=5`
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
    fetchRecipesHandler();
  }, []);
  return (
    <Wrapper>
      <RecipesList
        recipes={recipes}
        setRecipes={setRecipes}
        setError={setError}
        fetchRecipes={(page = 1, searchTerm = "") =>
          fetchRecipesHandler(page, searchTerm)
        }
      />
      {!!error ? <ErrorMessage>{error}</ErrorMessage> : null}
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

const ErrorMessage = styled.strong`
  color: red;
`;

export default App;
