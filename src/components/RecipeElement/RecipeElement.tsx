import { FC } from "react";
import styled from "styled-components";
import { Recipe } from "../../models";
import { DeleteButton } from "../DeleteButton/DeleteButton";

interface Props {
  recipe: Recipe;
  fetchRecipes: (searchTerm: string, pageNum: number) => Promise<void>;
}
export const RecipeElement: FC<Props> = ({ recipe, fetchRecipes }) => {
  return (
    <OneRecipe>
      <h3>
        {recipe.title}
        <DeleteButton id={recipe.id} fetchRecipes={fetchRecipes} />
      </h3>

      <Description>{recipe.description}</Description>
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
