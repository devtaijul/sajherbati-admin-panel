import { useQuery } from "@tanstack/react-query";
import { ChangeEvent } from "react";
import { getFlatCategories } from "../resolvers/query";
import { Category } from "../vite-env";
import InputWithLabel from "./InputWithLabel";
import SelectInput from "./SelectInput";

export const FlatCategory = ({
  selectedCategoryId,
  onChange,
}: {
  selectedCategoryId?: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["flat_categories"],
    queryFn: getFlatCategories,
  });

  console.log("data", data, isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error</div>;
  }

  const selectList = data.flatCategories.map((category: Category) => ({
    value: category.id,
    label: category.title,
  }));

  return (
    <InputWithLabel label="Parent category (optional)">
      <SelectInput
        value={selectedCategoryId}
        selectList={[
          {
            label: "Select category",
            value: "default",
          },
          ...selectList,
        ]}
        onChange={onChange}
      />
    </InputWithLabel>
  );
};
