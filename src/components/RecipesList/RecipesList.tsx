import React, { Dispatch, FC, SetStateAction } from "react";
import { Recipe } from "../../models/index";
import { RecipeElement } from "../RecipeElement/RecipeElement";
import { SearchBar } from "../SearchBar/SearchBar";

interface Props {
  recipes: Recipe[];
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
  setError: Dispatch<SetStateAction<string>>;
  fetchRecipes: (searchTerm: string, pageNum: number) => Promise<void>;
}

export const RecipesList: FC<Props> = ({ recipes, fetchRecipes }) => {
  return (
    <>
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
    </>
  );
};
