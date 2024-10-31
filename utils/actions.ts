"use server";

import db from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Product, ColourDetails, actionState } from "./types";
import {
  validateFilterOptions,
  FilterOptions,
  reviewSchema,
  validateWithZodSchema,
} from "./schema";
import { formatToQueryParams } from "./format";
import { Cart } from "@prisma/client";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

const renderError = (error: unknown): actionState => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "an error occurred",
    variant: "destructive",
  };
};

export const fetchNewCollectionProducts = async (): Promise<Product[]> => {
  const products = await db.product.findMany({
    where: {
      new: true,
    },
    include: {
      reviews: true,
    },
  });
  const collections = products.map((product) => {
    const colourInfo = product.colourInfo as ColourDetails[];
    return {
      ...product,
      colourInfo,
    };
  });

  return collections;
};

export const fetchBestSellerProducts = async (): Promise<Product[]> => {
  const products = await db.product.findMany({
    where: {
      bestSeller: true,
    },
    include: {
      reviews: true,
    },
  });
  const bestSellers = products.map((product) => {
    const colourInfo = product.colourInfo as ColourDetails[];
    return {
      ...product,
      colourInfo,
    };
  });

  return bestSellers;
};

export const fetchFilteredProducts = async (
  filterObj: FilterOptions
): Promise<Product[]> => {
  try {
    const filterData = validateFilterOptions(filterObj);
    const queryParams = await formatToQueryParams(filterData);
    const products = await db.product.findMany({
      where: {
        OR: filterData.search
          ? [
              { name: { contains: filterData.search, mode: "insensitive" } },
              {
                description: {
                  contains: filterData.search,
                  mode: "insensitive",
                },
              },
            ]
          : undefined,

        collection:
          filterData.category.length > 0
            ? {
                in: filterData.category,
              }
            : undefined,
        defaultColour:
          filterData.colours.length > 0
            ? {
                in: filterData.colours,
              }
            : undefined,
        price: {
          gte: filterData.priceRange.min,
          lte: filterData.priceRange.max,
        },
        ...(filterData.bestSeller && { bestSeller: true }),
        ...(filterData.newCollection && { new: true }),
      },
      orderBy: {
        price: filterData.priceOrder,
      },
    });

    const filterProducts = products.map((product) => {
      const colourInfo = product.colourInfo as ColourDetails[];
      return {
        ...product,
        colourInfo,
      };
    });

    revalidatePath(`/collections?${queryParams}`);
    return filterProducts;
  } catch (error) {
    renderError(error);
    return [];
  }
};

export const fetchSingleProduct = async (
  productId: string
): Promise<{
  singleProduct: Product;
  totalReviews: number;
}> => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      reviews: true,
    },
  });

  const totalReviews = await db.review.count({
    where: {
      productId: productId,
    },
  });
  if (!product) {
    redirect("/collections");
  }

  const colourInfo = product.colourInfo as ColourDetails[];
  const singleProduct = {
    ...product,
    colourInfo,
  };
  return {
    singleProduct,
    totalReviews,
  };
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
): Promise<actionState> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(reviewSchema, rawData);
    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });
    revalidatePath(`/collections/${validatedFields.productId}`);
    return { message: "✅ Review submitted successfully", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return reviews;
};

export const findExistingReview = async (userId: string, productId: string) => {
  return db.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
};

export const deleteReviewAction = async (prevState: {
  reviewId: string;
  userId: string;
  productId: string;
}): Promise<actionState> => {
  const { reviewId, userId, productId } = prevState;

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: userId,
      },
    });
    revalidatePath(`/collections/${productId}`);
    return { message: "✅ Review deleted successfully", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}): Promise<actionState> => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;

  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId ? "✅ Removed from faves" : "✅ Added to faves",
      variant: "default",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });

  const favoritesProducts = favorites.map((favorite) => {
    const colourInfo = favorite.product.colourInfo as ColourDetails[];
    return {
      ...favorite,
      product: {
        ...favorite.product,
        colourInfo,
      },
    };
  });
  return favoritesProducts;
};

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

export const fetchCartItems = async () => {
  const { userId } = auth();
  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });
  return cart?.numItemsInCart || 0;
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });
  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }
  return cart;
};

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
  size,
  colour,
}: {
  productId: string;
  cartId: string;
  amount: number;
  size: number;
  colour: string;
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
      size,
      colour,
    },
  });
  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: { amount, productId, cartId, size, colour },
    });
  }
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  let numItemsInCart = 0;
  let cartTotal = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }
  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
    include: includeProductClause,
  });
  return { cartItems, currentCart };
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  try {
    const productId = formData.get("productId") as string;
    const colour = formData.get("colour") as string;
    const size = Number(formData.get("size"));
    const amount = Number(formData.get("amount"));
    await fetchSingleProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({
      productId,
      cartId: cart.id,
      amount,
      colour,
      size,
    });
    await updateCart(cart);
  } catch (error) {
    return renderError(error);
  }
  redirect("/bag");
};

export const updateCartItemAction = async ({
  updateProperty,
  cartItemId,
}: {
  updateProperty: { amount?: number; size?: number };
  cartItemId: string;
}): Promise<actionState> => {
  const user = await getAuthUser();
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    const existingCartItem = await db.cartItem.findUnique({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    if (!existingCartItem) {
      return { message: "Cart item not found", variant: "destructive" };
    }

    if ("size" in updateProperty && updateProperty.size) {
      const duplicateCartItem = await db.cartItem.findFirst({
        where: {
          productId: existingCartItem.productId,
          cartId: cart.id,
          colour: existingCartItem.colour,
          size: updateProperty.size, // Check if the new size already exists
        },
      });

      if (duplicateCartItem) {
        // Merge the amounts and delete one of the duplicate cart items
        await db.cartItem.update({
          where: { id: duplicateCartItem.id },
          data: { amount: duplicateCartItem.amount + existingCartItem.amount },
        });

        // Delete the original cart item that caused the conflict
        await db.cartItem.delete({
          where: { id: cartItemId },
        });

        await updateCart(cart);
        revalidatePath("/bag");

        return {
          message: "✅ Cart updated and items merged",
          variant: "default",
        };
      }
    }

    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        ...updateProperty,
      },
    });
    await updateCart(cart);
    revalidatePath("/bag");
    return { message: "✅ Bag updated", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
): Promise<actionState> => {
  const user = await getAuthUser();
  try {
    const cartItemId = formData.get("id") as string;
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });
    await updateCart(cart);
    revalidatePath("/bag");
    return { message: "✅ Item removed from bag", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
};

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  let orderId: null | string = null;
  let cartId: null | string = null;

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    cartId = cart.id;

    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
  const user = await getAuthUser();
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};
