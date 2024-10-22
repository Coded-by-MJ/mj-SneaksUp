import { Prisma } from "@prisma/client";

export type ProductColors =
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "orange"
  | "grey"
  | "white"
  | "multicolor";

export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<actionState>;

export type actionState = {
  message: string;
  variant: "destructive" | "default";
};

export type ColourDetails = {
  name: string;
  mainImage: string;
  others: string[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  defaultColour: string;
  collection: string;
  new: boolean;
  bestSeller: boolean;
  sizes: number[];
  availableColours: string[];
  clerkId: string;
  colourInfo: ColourDetails[];
};

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;
