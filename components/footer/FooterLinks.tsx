import { VscGithub } from "react-icons/vsc";
import { RiTwitterXLine } from "react-icons/ri";
import { SlSocialInstagram } from "react-icons/sl";
import { exploreLinks } from "@/utils/links";
import Link from "next/link";

const contact = ["+234 8123456789", "+234 8123456789", "sneaksup@gmail.com"];

const social = [
  {
    icon: <VscGithub className="text-white size-[18px]" />,
    label: "github",
    href: "https://github.com/Coded-by-MJ",
  },
  {
    icon: <RiTwitterXLine className="text-white size-[18px]" />,
    label: "twitter",
    href: "https://x.com/miraclejustice_",
  },
  {
    icon: <SlSocialInstagram className="text-white size-[18px]" />,
    label: "instagram",
    href: "https://instagram.com/miraclejustice_",
  },
];

export const SocialLInks = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h2 className="text-white font-medium text-base uppercase">social</h2>

      <div className="flex flex-col gap-2 md:gap-4 items-start ">
        {social.map((link) => (
          <a
            href={link.href}
            key={link.label}
            className="hover:underline transition-all text-white capitalize text-sm flex items-center gap-1"
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export const Contact = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h2 className="text-white font-medium  text-base uppercase">
        contact us
      </h2>

      <div className="flex flex-col gap-2 md:gap-4 items-start">
        {contact.map((text, idx) => (
          <span key={idx} className="text-sm text-white">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export const ExploreLinks = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h2 className="text-white font-medium  text-base uppercase">explore</h2>

      <div className="flex flex-col gap-2 md:gap-4 items-start">
        {exploreLinks.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className="hover:underline transition-all text-white capitalize text-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
