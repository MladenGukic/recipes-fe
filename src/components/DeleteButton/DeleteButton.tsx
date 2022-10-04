import { FC } from "react";
import styled from "styled-components";
import { FetchRecipes } from "../../types/types";
import { API_URL } from ".././../API_URL";

interface DeleteButtonProps {
  id: string;
  fetchRecipes: FetchRecipes;
}
export const DeleteButton: FC<DeleteButtonProps> = ({ id, fetchRecipes }) => {
  const deleteRecipe = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      fetchRecipes(1, "");
    } catch (error: any) {
      return error.message;
    }
  };
  return <RedButton onClick={deleteRecipe}>delete</RedButton>;
};
const RedButton = styled.button`
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
  margin-right: 5px;
`;
