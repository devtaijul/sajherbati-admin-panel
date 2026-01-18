export const PAGES = {
  home: "/",
  CATEGORY: {
    ROOT: "/category",
    EDIT: (id: string) => `/category/${id}`,
    CREATE: "/category/create-category",
  },
  PRODUCT: {
    ROOT: "/product",
    EDIT: (id: string) => `/product/${id}`,
    CREATE: "/product/create-product",
  },
};
