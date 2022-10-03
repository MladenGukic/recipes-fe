import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import { RecipesList } from "./components/RecipesList";

export interface Recipe {
  title: string;
  description: string;
  ingredients: object[];
  id: string;
  created: string;
  modified: string;
}
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
  const arrayOfNumber: number[] = Array.from(
    { length: numberOfPages },
    (_, i) => i + 1
  );
  const paginateSelectors = arrayOfNumber.map((num, index) => {
    return (
      <PageSelector key={index} onClick={() => fetchRecipesHandler("", num)}>
        {num}
      </PageSelector>
    );
  });
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
      <ul>{paginateSelectors}</ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  & h2 {
    display: flex;
  }

  ul {
  }
`;

const PageSelector = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 32px;
  height: 40px;
  padding-top: 20px;
  margin: 10px;
  border: 1px solid;
  border-radius: 8px;
  float: left;
  :hover {
    background-color: rgb(114, 108, 108);
  }

  :active {
    background-color: rgb(114, 108, 108);
  }
`;

export default App;
