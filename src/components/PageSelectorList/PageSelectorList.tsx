import styled from "styled-components";
import { FC } from "react";
import { FetchRecipes } from "../../types/types";

interface PageSelectorListProps {
  numberOfPages: number;
  fetchRecipes: FetchRecipes;
}

export const PageSelectorList: FC<PageSelectorListProps> = ({
  numberOfPages,
  fetchRecipes,
}) => {
  const arrayOfNumber: number[] = Array.from(
    { length: numberOfPages },
    (_, i) => i + 1
  );

  const pageSelectors = arrayOfNumber.map((num, index) => {
    return (
      <PageSelector key={index} onClick={() => fetchRecipes(num, "")}>
        {num}
      </PageSelector>
    );
  });

  return <ul>{pageSelectors}</ul>;
};

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
  :hover,
  :active {
    background-color: rgb(114, 108, 108);
    background-color: rgb(114, 108, 108);
  }
`;
