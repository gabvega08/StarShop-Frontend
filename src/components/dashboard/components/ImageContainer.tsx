"use client";
import React from "react";
import Image from "next/image";

interface ImageContainerProps {
  url: string;
  urlshadow: string;
  title: string;
}

export const ImageContainer = ({
  url,
  urlshadow,
  title,
}: ImageContainerProps) => {
  return (
    <div className="flex flex-col justify-center">
      <p className="mt-2 text-background uppercase text-center text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
        {title}
      </p>

      <div className="relative flex justify-center border-4 border-custom-light-card-border bg-background max-h-[106px] w-[auto] rounded overflow-hidden">
        <Image
          src={urlshadow}
          alt={title}
          width={109}
          height={100}
          className="absolute top-0 left-0 rounded-md scale-110 opacity-60 z-0"
        />
        <Image
          src={url}
          alt={title}
          width={109}
          height={100}
          className="relative rounded-md z-10 object-contain"
        />
      </div>
    </div>
  );
};
