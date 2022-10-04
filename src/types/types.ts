export interface Recipe {
  title: string;
  description: string;
  ingredients: IngredientsType[];
  id: string;
  created: string;
  modified: string;
}

export interface IngredientsType {
  name: string;
  amount: number;
  unit: string;
}
export interface FetchRecipes {
  (pageNum: number, searchTerm: string): Promise<void>;
}
