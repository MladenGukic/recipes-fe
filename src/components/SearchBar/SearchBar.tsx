import { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { FetchRecipes } from "../../types/types";

interface SearchBarProps {
  fetchRecipes: FetchRecipes;
}

export const SearchBar: FC<SearchBarProps> = ({ fetchRecipes }) => {
  const filterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (!!target) {
      fetchRecipes(1, target.value);
    }
  };

  return <SearchInput placeholder="filter" onChange={filterHandler} />;
};

const SearchInput = styled.input`
  font-size: medium;
  font-style: italic;
  width: 160px;
  height: 40px;
  padding-left: 10px;
  margin-bottom: 10px;
  display: flex;
`;
