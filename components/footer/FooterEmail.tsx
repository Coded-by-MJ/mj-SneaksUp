"use client";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

function FooterEmail() {
  const [email, setEmail] = useState("");
  return (
    <div className="w-full md:max-w-[473px] flex flex-col gap-6">
      <h2 className="text-white text-base uppercase">
        be the first to know about new products
      </h2>

      <form
        className="flex w-full h-[40px]"
        onSubmit={(e) => {
          e.preventDefault();
          toast({
            description: "✅ Email submitted",
          });
          setEmail("");
        }}
      >
        <input
          type="email"
          placeholder="Your email address"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="flex-grow pl-3 rounded-l-md h-full text-sm bg-transparent text-white bg-none border border-r-0 border-white focus:outline-none"
        />
        <button
          type="submit"
          className="flex h-full rounded-r-md bg-white items-center cursor-pointer justify-center size-[40px]"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

const SendIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.133 18.02C4.86234 18.1287 4.60567 18.1067 4.363 17.954C4.12034 17.8013 3.99934 17.5793 4 17.288V13.346L9.846 12L4 10.654V6.71199C4 6.41999 4.12134 6.19799 4.364 6.04599C4.60667 5.89399 4.86334 5.87166 5.134 5.97899L17.646 11.248C17.9727 11.398 18.136 11.65 18.136 12.004C18.136 12.3573 17.9727 12.6067 17.646 12.752L5.133 18.02Z"
        fill="#1E1E1E"
      />
    </svg>
  );
};
export default FooterEmail;
