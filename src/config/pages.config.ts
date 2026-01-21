export const PAGES = {
  home: "/",
  CATEGORY: {
    ROOT: "/category",
    EDIT: (id: string) => `/categories/${id}`,
    CREATE: "/category/create-category",
  },
  PRODUCT: {
    ROOT: "/products",
    EDIT: (id: string) => `/products/${id}`,
    CREATE: "/products/create-product",
  },
};
