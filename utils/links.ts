type NavLink = {
  href: string;
  label: string;
};

export const collectionLinks: NavLink[] = [
  { href: "/collections?category=men", label: "men" },
  { href: "/collections?category=women", label: "women" },
  { href: "/collections?category=kids", label: "kids" },
];

export const exploreLinks: NavLink[] = [
  { href: "/collections?newCollection=true", label: "new collections" },
  { href: "/collections?bestSeller=true", label: "best seller" },
  { href: "/collections", label: "our collections" },
];
