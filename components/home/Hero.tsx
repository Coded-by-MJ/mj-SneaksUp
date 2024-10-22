import Image from "next/image";
import shoe from "@/public/bigshoe.png";
import { Button } from "../ui/button";
import Link from "next/link";
import Container from "../global/Container";

function Hero() {
  return (
    <Container className="flex flex-col sm:flex-row pt-4 pb-10 items-center  justify-between gap-6 w-full bg-black">
      <div className="w-full   sm:w-[217px] lg:w-[480px] xl:w-[670px] md:w-[350px] flex flex-col gap-6 sm:flex-grow items-start ">
        <h1 className="w-full md:text-[35px] text-[32px]  uppercase text-wrap lg:text-[60px] xl:text-[80px] text-white font-medium">
          Crafted for Champions. made for you!!!
        </h1>
        <Button
          className="rounded-full  py-4 px-2 text-white text-[12px] w-[141px] h-[28px]  lg:text-base hover:bg-white hover:text-black transition-colors lg:w-[240px]  xl:w-[260px] xl:h-[60px] capitalize lg:h-[50px] border-white border  bg-transparent"
          asChild
        >
          <Link href="/collections">our collections</Link>
        </Button>
      </div>
      <div className="md:w-[400px]  lg:w-[544px] lg:h-[630px] xl:h-[677px] relative w-[269px] h-[325px]">
        <Image
          src={shoe}
          alt="shoe"
          fill
          priority
          sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    </Container>
  );
}
export default Hero;
