"use client";

import Container from "../global/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Product } from "@/utils/types";
import placholderImg from "@/public/imagebackdrop.jpg";
import { formatCurrency } from "@/utils/format";

function NewCollectionsCarousel({
  newCollections,
}: {
  newCollections: Product[];
}) {
  const [activeIndex, setActiveIndex] = useState(1);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <Container className="bg-white pt-8 pb-10">
      <h2 className="uppercase text-center text-3xl text-black lg:text-4xl  xl:text-[43px] font-medium mb-6">
        new collections
      </h2>
      <div className="relative flex justify-center">
        {/* Swiper Carousel */}

        <Swiper
          className="max-lg:max-w-[480px] w-[90%]"
          spaceBetween={30}
          pagination={{
            clickable: true,
            el: paginationRef.current,
          }}
          loop={true}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            1024: {
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: false,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 10,
              centeredSlides: true,
            },
          }}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
          modules={[Navigation, Pagination]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {newCollections.map((product, index) => {
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
              <SwiperSlide
                key={id}
                className={cn(
                  "xl:!scale-[0.8] transition-transform ",
                  index === activeIndex && "xl:!scale-[1.0]"
                )}
              >
                <Link
                  href={`/collections/${id}`}
                  className={cn("w-full relative flex flex-col gap-6 ")}
                >
                  <div
                    className={cn(
                      "w-full h-[350px]  sm:h-[446px] grid grid-cols-1 grid-rows-1 relative"
                    )}
                  >
                    <Image
                      src={image}
                      alt={name}
                      placeholder="blur"
                      blurDataURL={placholderImg.blurDataURL}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
                      priority
                      className="w-full h-full rounded-3xl object-cover"
                    />

                    <span
                      className={cn(
                        "bg-black/40 z-10 rounded-3xl max-xl:hidden transition-all",
                        index === activeIndex && "bg-transparent opacity-0"
                      )}
                    ></span>
                  </div>

                  <div className="flex flex-col gap-[2px] items-start">
                    <h4
                      className={cn(
                        "text-xl sm:text-2xl font-medium text-black xl:text-black/30 capitalize transition-colors",
                        index === activeIndex && "xl:text-black/100"
                      )}
                    >
                      {name}
                    </h4>
                    <span
                      className={cn(
                        "text-base sm:text-lg  capitalize text-black/80 xl:text-black/30 transition-colors",
                        index === activeIndex && "xl:text-black/80"
                      )}
                    >
                      {collection}&apos;s shoes
                    </span>
                    <span
                      className={cn(
                        "text-base sm:text-lg capitalize text-black/80 xl:text-black/30 transition-colors",
                        index === activeIndex && "xl:text-black/80"
                      )}
                    >
                      {availableColours.length} color
                      {availableColours.length > 1 && "s"}
                    </span>
                    <span
                      className={cn(
                        "text-xl sm:text-2xl font-medium text-black xl:text-black/30 transition-colors",
                        index === activeIndex && "xl:text-black/100"
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
        <Button
          ref={prevButtonRef}
          size={"icon"}
          className="transition-colors group hidden md:flex hover:bg-black rounded-full bg-white border border-black  absolute left-0 top-1/2 -translate-y-1/2"
        >
          <ArrowLeft className="text-black group-hover:text-white transition-colors" />
        </Button>

        <Button
          ref={nextButtonRef}
          size={"icon"}
          className="rounded-full  transition-colors group hidden md:flex hover:bg-black  bg-white border border-black  absolute right-0 top-1/2 -translate-y-1/2"
        >
          <ArrowRight className="text-black group-hover:text-white transition-colors" />
        </Button>
        <div
          ref={paginationRef}
          className="absolute !bottom-[30px] !sm:bottom-[40px] -translate-y-[5.5rem] z-20 !left-1/2 flex gap-1 justify-center md:hidden -translate-x-1/2"
        ></div>
      </div>
    </Container>
  );
}
export default NewCollectionsCarousel;
