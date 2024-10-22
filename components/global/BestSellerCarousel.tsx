"use client";

import Container from "../global/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import placholderImg from "@/public/imagebackdrop.jpg";
import { Product } from "@/utils/types";
import { formatCurrency } from "@/utils/format";
function BestSellerCarousel({
  title = "you might also like",
  bestSellers,
}: {
  title?: string;
  bestSellers: Product[];
}) {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <Container className="bg-white pt-8 pb-10 relative">
      <div className="mb-4 flex justify-center items-center sm:justify-between">
        <h2 className="uppercase  lg:text-4xl  xl:text-[43px] text-black text-3xl font-medium">
          {title}
        </h2>
        <div className="sm:flex sm:gap-3 sm:items-center hidden">
          <Button
            ref={prevButtonRef}
            size={"icon"}
            className="transition-colors group hover:bg-black rounded-full bg-white border border-black"
          >
            <ArrowLeft className="text-black group-hover:text-white transition-colors" />
          </Button>
          <Button
            ref={nextButtonRef}
            size={"icon"}
            className="rounded-full  transition-colors group  hover:bg-black  bg-white border border-black "
          >
            <ArrowRight className="text-black group-hover:text-white transition-colors" />
          </Button>
        </div>
      </div>

      <div className="relative">
        {/* Swiper Carousel */}

        <Swiper
          className="w-full"
          spaceBetween={20}
          pagination={{
            clickable: true,
            el: paginationRef.current,
          }}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
          modules={[Navigation, Pagination]}
        >
          {bestSellers.map((product) => {
            const {
              defaultColour,
              name,
              id,
              collection,
              availableColours,
              price,
            } = product;
            const image =
              product.colourInfo.find((colour) => colour.name === defaultColour)
                ?.mainImage || "";
            return (
              <SwiperSlide key={id}>
                <Link
                  href={`/collections/${id}`}
                  className="w-full flex flex-col gap-6"
                >
                  <div className={cn("w-full h-[350px] relative")}>
                    <Image
                      src={image}
                      alt={name}
                      fill
                      placeholder="blur"
                      blurDataURL={placholderImg.blurDataURL}
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
                      priority
                      className="w-full h-full rounded-3xl object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-[2px] items-start">
                    <h4
                      className={cn(
                        " text-base sm:text-xl font-medium text-black  capitalize"
                      )}
                    >
                      {name}
                    </h4>
                    <span
                      className={cn(
                        "text-[12px] sm:text-sm  capitalize text-black/80"
                      )}
                    >
                      {collection}&apos;s shoes
                    </span>
                    <span
                      className={cn(
                        "text-[12px] sm:text-sm capitalize text-black/80"
                      )}
                    >
                      {availableColours.length} color
                      {availableColours.length > 1 && "s"}
                    </span>
                    <span
                      className={cn(
                        "text-base sm:text-xl font-medium text-black "
                      )}
                    >
                      {formatCurrency(price)}
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div
          ref={paginationRef}
          className="absolute z-20 !bottom-[20px] -translate-y-[5rem] -translate-x-1/2 !left-1/2 flex  justify-center sm:hidden"
        ></div>
      </div>
    </Container>
  );
}
export default BestSellerCarousel;
