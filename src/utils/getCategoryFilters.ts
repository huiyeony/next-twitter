interface CategoryFilter {
  id: string;
  name: string;
}
export const getCategories = () => {
  return [
    { id: "all", name: "전체" },
    { id: "general", name: "일반" },
    { id: "study", name: "공부" },
    { id: "relation", name: "인간관계" },
    { id: "love", name: "연애/결혼" },
    { id: "family", name: "가족" },
    { id: "money", name: "재태크" },
  ];
};
