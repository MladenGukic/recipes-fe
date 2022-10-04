import { FC } from "react";
import styled from "styled-components";
import { FetchRecipes, Recipe } from "../../types/types";
import { DeleteButton } from "../DeleteButton/DeleteButton";

interface RecipeElementProps {
  recipe: Recipe;
  fetchRecipes: FetchRecipes;
}
export const RecipeElement: FC<RecipeElementProps> = ({
  recipe,
  fetchRecipes,
}) => {
  const { id, title, description } = recipe;
  return (
    <OneRecipe>
      <h3>
        {title}
        <DeleteButton
          id={id}
          fetchRecipes={(page = 1, searchTerm = "") =>
            fetchRecipes(page, searchTerm)
          }
        />
      </h3>

      <Description>{description}</Description>
    </OneRecipe>
  );
};

const OneRecipe = styled.div`
  padding: 0px;
  margin: 0px 0px -3px 0px;
  border: 3px solid rgb(92, 87, 87);
  h3 {
    padding-left: 5px;
    display: flex;
    justify-content: space-between;
  }
`;

const Description = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
`;
