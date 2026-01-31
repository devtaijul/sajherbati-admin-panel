import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineSave } from "react-icons/ai";
import { useParams } from "react-router-dom";
import {
  InputWithLabel,
  Sidebar,
  SimpleInput,
  TextAreaInput,
} from "../components";
import EditOrderSkeleton from "../components/skeleton/EditOrderSkeleton";
import { updateOrderMutation } from "../resolvers/mutation";
import { getOrderById } from "../resolvers/query";
import { OrderUpdateInput, orderUpdateSchema } from "../utils/validation";
import { OrderItems } from "../vite-env";

const EditOrder = () => {
  const params = useParams();

  const { id } = params;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderUpdateInput>({
    resolver: zodResolver(orderUpdateSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      note: "",
      status: "PENDING",
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id!),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-order"],
    mutationFn: (order: OrderUpdateInput) =>
      updateOrderMutation({ id: id!, order }),
  });

  const onSubmit = async (values: OrderUpdateInput) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Order updated successfully");
      },
      onError: () => {
        toast.error("Failed to update order");
      },
    });
  };

  useEffect(() => {
    if (data?.data) {
      const order = data.data;
      reset({
        name: order.name,
        phone: order.phone,
        address: order.address,
        note: order.note ?? "",
        status: order.status,
      });
    }
  }, [data, reset]);

  if (isError) {
    return <p>Failed to fetch order</p>;
  }

  return (
    <div className="flex h-auto border-t border-blackSecondary border-1 dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      {isLoading ? (
        <EditOrderSkeleton />
      ) : (
        <div className="w-full dark:bg-blackPrimary bg-whiteSecondary ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-10 dark:bg-blackPrimary bg-whiteSecondary"
          >
            <div className="flex items-center justify-between px-4 pb-8 border-b border-gray-800 sm:px-6 lg:px-8 max-sm:flex-col max-sm:gap-5">
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                  Edit order
                </h2>
              </div>
              <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
                <button
                  type="submit"
                  className="flex items-center justify-center w-48 py-2 text-lg text-white duration-200 bg-black border border-gray-600 dark:bg-white dark:hover:border-gray-500 hover:border-gray-400 gap-x-2"
                  disabled={isPending}
                >
                  <AiOutlineSave className="text-xl text-whiteSecondary dark:text-blackPrimary" />
                  <span className="font-medium text-whiteSecondary dark:text-blackPrimary">
                    {isPending ? "Updating..." : "Update order"}
                  </span>
                </button>
                {/*   <WhiteButton
                link="/orders/add-order"
                textSize="lg"
                width="48"
                py="2"
                text="Update order"
              >
                <HiOutlineSave className="text-xl dark:text-blackPrimary text-whiteSecondary" />
              </WhiteButton> */}
              </div>
            </div>

            {/* Add Product section here  */}
            <div className="grid grid-cols-2 px-4 pt-8 pb-8 sm:px-6 lg:px-8 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
              {/* left div */}
              <div>
                <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                  Order information
                </h3>

                <div className="flex flex-col gap-5 mt-4">
                  <InputWithLabel label="Customer name">
                    <SimpleInput {...register("name")} />
                    {errors.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </InputWithLabel>

                  <InputWithLabel label="Phone">
                    <SimpleInput {...register("phone")} />
                  </InputWithLabel>

                  <InputWithLabel label="Address">
                    <TextAreaInput {...register("address")} />
                  </InputWithLabel>

                  <InputWithLabel label="Order Note">
                    <TextAreaInput {...register("note")} />
                  </InputWithLabel>

                  {/* ✅ STATUS SELECTOR */}
                  <InputWithLabel label="Order Status">
                    <select
                      {...register("status")}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </InputWithLabel>
                </div>
              </div>

              {/* right div */}
              <div>
                <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                  Products in order
                </h3>

                <div>
                  {/* <div className="flex flex-col gap-5 mt-4">
                  <InputWithLabel label="Search products">
                    <SimpleInput
                      type="text"
                      placeholder="Search products..."
                      value={inputObject.searchProducts}
                      onChange={(e) =>
                        setInputObject({
                          ...inputObject,
                          searchProducts: e.target.value,
                        })
                      }
                    />
                  </InputWithLabel>
                  <InputWithLabel label="Quantity">
                    <SimpleInput
                      type="text"
                      placeholder="Enter a quantity..."
                      value={inputObject.quantity}
                      onChange={(e) =>
                        setInputObject({
                          ...inputObject,
                          quantity: Number(e.target.value),
                        })
                      }
                    />
                  </InputWithLabel>
                  <WhiteButton
                    link="/orders/add-order"
                    textSize="lg"
                    width="full"
                    py="2"
                    text="Add product"
                  />
                </div> */}

                  <div className="mt-5">
                    {/* <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                    Products
                  </h3> */}
                    <div className="mt-4 flex flex-col gap-5 max-[450px]:items-start">
                      {data?.data.orderItems.map((item: OrderItems) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <img src={item.image} className="w-12 h-12" />
                            <span>{item.title}</span>
                          </div>
                          <span>
                            {item.quantity} × ৳{item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                    Total
                  </h3>
                  <div className="flex flex-col gap-5 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="dark:text-whiteSecondary text-blackPrimary">
                        Total products
                      </span>
                      <span className="dark:text-whiteSecondary text-blackPrimary">
                        {data?.data.orderItems.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="dark:text-whiteSecondary text-blackPrimary">
                        Total price
                      </span>
                      <span className="text-2xl font-bold dark:text-whiteSecondary text-blackPrimary">
                        ৳{data?.data.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default EditOrder;
