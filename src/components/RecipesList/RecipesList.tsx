import React, { Dispatch, FC, SetStateAction } from "react";
import { FetchRecipes, Recipe } from "../../types/types";
import { RecipeElement } from "../RecipeElement/RecipeElement";
import { SearchBar } from "../SearchBar/SearchBar";

interface RecipesListProps {
  recipes: Recipe[];
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
  setError: Dispatch<SetStateAction<string>>;
  fetchRecipes: FetchRecipes;
}

export const RecipesList: FC<RecipesListProps> = ({
  recipes,
  fetchRecipes,
}) => {
  return (
    <ul>
      <h2>Recipes overview</h2>
      <SearchBar fetchRecipes={fetchRecipes} />
      {recipes.map((recipe) => (
        <RecipeElement
          recipe={recipe}
          key={recipe.id}
          fetchRecipes={fetchRecipes}
        />
      ))}
    </ul>
  );
};
