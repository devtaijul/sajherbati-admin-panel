import { useQuery } from "@tanstack/react-query";
import { getCategoryTree } from "../resolvers/query";
import SelectInput from "./SelectInput";
type CategoryTree = {
  id: string;
  title: string;
  children?: CategoryTree[];
};

export const ParentToChildCategorySelector = ({
  selectedValue,
  setValue,
}: {
  selectedValue: string;
  setValue: (value: string) => void;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tree_categorys"],
    queryFn: getCategoryTree,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error</div>;
  }

  const generateSelectList = (
    categories: CategoryTree[],
    depth: number = 0,
    result: { value: string; label: string }[] = [],
  ) => {
    categories.forEach((category) => {
      const indent = depth > 0 ? "--".repeat(depth) + " " : "";

      result.push({
        value: category.id,
        label: `${indent}${category.title}`,
      });

      if (category.children && category.children.length > 0) {
        generateSelectList(category.children, depth + 1, result);
      }
    });

    return result;
  };

  // Usage in your code
  const selectList = generateSelectList(data.data);

  return (
    <SelectInput
      value={selectedValue}
      defaultValue={""}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      selectList={[{ value: "", label: "Select a value" }, ...selectList]}
    />
  );
};
