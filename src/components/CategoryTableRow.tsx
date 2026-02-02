import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { PAGES } from "../config/pages.config";
import { CategoryWithParent } from "../vite-env";
import { useMutation } from "@tanstack/react-query";
import { deleteCategoryMutation } from "../resolvers/mutation";
import toast from "react-hot-toast";

export const CategoryTableRow = ({
  item,
  refetch,
}: {
  item: CategoryWithParent;
  refetch: () => void;
}) => {
  const { isPending, mutate } = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: deleteCategoryMutation,
    onSuccess: () => {
      toast.success("Category deleted successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });

  const onDelete = () => {
    confirm("Are you sure you want to delete this category?") &&
      mutate(item.id);
  };

  return (
    <tr>
      <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
        <div className="flex items-center gap-x-4">
          {/*  <img
                        src={item.category.imageUrl}
                        alt=""
                        className="w-8 h-8 bg-gray-800 rounded-full"
                      /> */}
          <div className="text-sm font-medium leading-6 truncate dark:text-whiteSecondary text-blackPrimary">
            {item.title}
          </div>
        </div>
      </td>
      <td className="table-cell py-4 pl-0 pr-4 ">
        <div className="flex gap-x-3">
          <div className="text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
            {item.slug}
          </div>
        </div>
      </td>
      <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
        <div className="flex items-center justify-start gap-x-2">
          <div className="block dark:text-whiteSecondary text-blackPrimary">
            {item._count.products}
          </div>
        </div>
      </td>
      <td className="table-cell py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary lg:pr-20">
        {item?.parentId ? item?.parent?.title : "/"}
      </td>
      <td className="table-cell py-4 pl-0 pr-4 text-sm leading-6 text-right dark:text-whiteSecondary text-blackPrimary lg:pr-8">
        <div className="flex justify-end gap-x-1">
          <Link
            to={PAGES.CATEGORY.EDIT(item.id)}
            className="flex items-center justify-center block w-8 h-8 border border-gray-600 cursor-pointer dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary dark:hover:border-gray-500 hover:border-gray-400"
          >
            <HiOutlinePencil className="text-lg" />
          </Link>
          <Link
            to={PAGES.CATEGORY.EDIT(item.id)}
            className="flex items-center justify-center block w-8 h-8 border border-gray-600 cursor-pointer dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary dark:hover:border-gray-500 hover:border-gray-400"
          >
            <HiOutlineEye className="text-lg" />
          </Link>
          <Link
            to="#"
            aria-disabled={isPending}
            onClick={onDelete}
            className="flex items-center justify-center block w-8 h-8 border border-gray-600 cursor-pointer dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary dark:hover:border-gray-500 hover:border-gray-400"
          >
            <HiOutlineTrash className="text-lg" />
          </Link>
        </div>
      </td>
    </tr>
  );
};
