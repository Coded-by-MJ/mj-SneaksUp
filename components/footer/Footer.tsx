import Container from "../global/Container";
import FooterEmail from "./FooterEmail";
import { Contact, ExploreLinks, SocialLInks } from "./FooterLinks";

function Footer() {
  return (
    <footer className="bg-black py-10">
      <Container className="flex gap-4 flex-col">
        <div className="flex flex-col border-b border-white pb-6 gap-6 md:flex-row md:justify-between items-start">
          <div className="flex w-full md:w-1/2 justify-between items-start">
            <FooterEmail />
          </div>
          <div className="flex flex-col gap-6 md:flex-row justify-between items-start w-full md:w-1/2 ">
            <ExploreLinks />
            <Contact />
            <SocialLInks />
          </div>
        </div>

        <p className="text-base text-center text-white">
          &copy; 2024 Developed by MJ &#183; Designed by Lawal Jimoh
        </p>
      </Container>
    </footer>
  );
}
export default Footer;
