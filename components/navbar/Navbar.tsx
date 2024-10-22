import Container from "../global/Container";
import Logo from "./Logo";
import { Suspense } from "react";
import { CollectionLinks, UserLinks } from "./Navlinks";

import NavSearch from "./NavSearch";
import CartButton from "./CartButton";
function Navbar() {
  return (
    <nav>
      <Container className="bg-black relative py-4 flex justify-between items-center">
        <Logo />
        <div className="hidden lg:flex lg:justify-center lg:items-center lg:flex-grow ">
          <CollectionLinks />
        </div>
        <div className="flex gap-8 items-center">
          <div className="hidden lg:block">
            <Suspense>
              <NavSearch />
            </Suspense>
          </div>
          <UserLinks>{<CartButton />}</UserLinks>
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
