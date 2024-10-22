import { FilterOptions } from "./schema";

export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const formatToQueryParams = async (
  filterData: FilterOptions
): Promise<string> => {
  const params = new URLSearchParams();

  if (filterData.search) {
    params.append("search", filterData.search);
  }

  if (filterData.category.length > 0) {
    params.append("category", filterData.category.join(","));
  }
  if (filterData.colours.length > 0) {
    params.append("colours", filterData.colours.join(","));
  }
  params.append("min", filterData.priceRange.min.toString());
  params.append("max", filterData.priceRange.max.toString());

  if (filterData.bestSeller) {
    params.append("bestSeller", "true");
  }
  if (filterData.newCollection) {
    params.append("newCollection", "true");
  }

  params.append("priceOrder", filterData.priceOrder);

  return params.toString();
};
