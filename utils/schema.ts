import * as z from "zod";

const filterSchema = z.object({
  search: z.string(),
  category: z.array(z.enum(["men", "women", "kids"])),
  colours: z.array(
    z.enum([
      "blue",
      "green",
      "yellow",
      "red",
      "orange",
      "grey",
      "white",
      "multicolor",
    ])
  ),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
  }),
  bestSeller: z.boolean(),
  newCollection: z.boolean(),
  priceOrder: z.enum(["desc", "asc"]),
});

export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== "", {
    message: "Product ID cannot be empty",
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Author name cannot be empty",
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "Author image URL cannot be empty",
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters long" })
    .max(1000, { message: "Comment must be at most 1000 characters long" }),
});

export const validateFilterOptions = (
  filterObj: FilterOptions
): FilterOptions => {
  const result = filterSchema.safeParse(filterObj);
  if (!result.success) {
    const errors = result.error.errors.map((error) => {
      const path = error.path.join(".");
      return `Invalid value for "${path}"`;
    });
    throw new Error(errors.join(", "));
  }
  return result.data;
};

export function validateWithZodSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}

export type FilterOptions = z.infer<typeof filterSchema>;
export type PriceOrder = z.infer<typeof filterSchema>["priceOrder"];
export type Collections = z.infer<typeof filterSchema>["category"];
export type AvailableColours = z.infer<typeof filterSchema>["colours"];
