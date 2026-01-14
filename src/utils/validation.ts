// src/schema/product.schema.ts
import { z } from "zod";

// schema/product.schema.ts
import { z } from "zod";

export const productSchema = z.object({
  /* ================= Images ================= */
  featuredImage: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),

  /* ================= BASIC ================= */
  title: z.string().min(3, "Title is required").max(150, "Title too long"),

  categoryId: z.string().min(1, "Category is required"),

  /* ================= VARIANT ================= */
  stitchType: z.enum(["STITCH", "UNSTITCH"], {
    required_error: "Product type is required",
  }),

  relatedProductId: z.string().optional(),

  /* ================= PRICING ================= */
  regularPrice: z.coerce.number().min(0, "Base price cannot be negative"),

  price: z.coerce.number().min(0, "Discount price cannot be negative"),

  /* ================= STOCK ================= */
  inStock: z.boolean().default(true),

  sku: z.string().optional(),

  /* ================= FLAGS ================= */
  isTopSelling: z.boolean().default(false),
  newArrival: z.boolean().default(false),
  isCustomeRelation: z.boolean().default(false),

  /* ================= VISUAL ================= */
  color: z
    .string()
    .regex(/^#([0-9A-Fa-f]{6})$/, "Invalid hex color")
    .optional(),

  manufacturer: z.string().max(100, "Manufacturer name too long").optional(),

  displayPriority: z.coerce.number().min(0).max(20).default(0),

  /* ================= KEYWORDS ================= */
  keywords: z.array(z.string().min(1)).max(20, "Max 20 keywords").default([]),

  /* ================= MEASUREMENTS ================= */
  body: z.string().optional(),
  long: z.string().optional(),
  pantLong: z.string().optional(),
  innerAndSalwar: z.string().optional(),
  liveLink: z.string().url("Invalid URL").optional(),

  /* ================= CONTENT ================= */
  description: z.any(), // Rich text
  instruction: z.any().optional(),
  videoUrl: z.any().optional(),

  /* ================= SEO ================= */
  seoTitle: z.string().max(70, "Meta title max 70 characters").optional(),

  seoDescription: z
    .string()
    .max(160, "Meta description max 160 characters")
    .optional(),
});
export type Product = z.infer<typeof productSchema>;

export type ProductSchema = z.infer<typeof productSchema>;
