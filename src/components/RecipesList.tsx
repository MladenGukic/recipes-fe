import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import { Recipe } from "../App";

interface Props {
  recipes: Recipe[];
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
  setError: Dispatch<SetStateAction<string>>;
  fetchRecipes: (searchTerm: string, pageNum: number) => Promise<void>;
}

export const RecipesList: FC<Props> = ({
  recipes,
  setRecipes,
  setError,
  fetchRecipes,
}) => {
  const deleteRecipe = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:8081/recipes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      fetchRecipes("", 1);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const filterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (!!target) {
      fetchRecipes(target.value, 1);
    }
  };

  return (
    <>
      <ul>
        <h2>Recipes overview</h2>
        <FilterInput placeholder="filter" onChange={filterHandler} />
        {recipes.map((recipe) => (
          <ListElement key={recipe.id}>
            <h4>
              {recipe.title}
              <DeleteButton onClick={() => deleteRecipe(recipe.id)}>
                delete
              </DeleteButton>
            </h4>
            <Description>{recipe.description}</Description>
          </ListElement>
        ))}
      </ul>
    </>
  );
};

const ListElement = styled.div`
  padding: 0px;
  margin: 0px 0px -3px 0px;
  border: 3px solid rgb(92, 87, 87);
  h4 {
    display: flex;
    justify-content: space-between;
    margin-right: 5px;
  }
`;

const Description = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
`;

const DeleteButton = styled.button`
  width: 60px;
  height: 25px;
  font-size: 12px;
  color: white;
  background-color: #c04131;
  font-weight: bold;
  box-shadow: 0 1px 0 #c04131;
  border: 1px solid;
  outline: none;
  border-radius: 2px;
  border-color: #dd4b39;
`;

const FilterInput = styled.input`
  font-size: medium;
  font-style: italic;
  width: 160px;
  height: 40px;
  padding-left: 10px;
  margin-bottom: 10px;
  display: flex;
`;
