import { ChangeEvent, FC } from "react";
import styled from "styled-components";

interface Props {
  fetchRecipes: (searchTerm: string, pageNum: number) => Promise<void>;
}

export const SearchBar: FC<Props> = ({ fetchRecipes }) => {
  const filterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (!!target) {
      fetchRecipes(target.value, 1);
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
