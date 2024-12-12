"use client";
import React from "react";
import Image from "next/image";

interface ImageContainerProps {
  url: string;
  urlshadow: string;
  title: string;
}

export const ImageContainer = ({ url, urlshadow, title }: ImageContainerProps) => {
  return (
    <div className="flex flex-col justify-center">
      {/* Text Label */}
      <p className="mt-2 text-background uppercase text-center text-[10px]">{title}</p>

      {/* Image with Stylized Shadow */}
      <div className="relative flex justify-center border-4 border-custom-light-card-border bg-background h-[125px] rounded">
        {/* Shadow */}
        <Image
          src={urlshadow}
          alt={title}
          width={109}
          height={100}
          className="absolute top-2 left-0 rounded-md scale-105 opacity-60 z-0"
        />
        {/* Main Image */}
        <Image
          src={url}
          alt={title}
          width={109}
          height={100}
          className="relative rounded-md z-10"
        />
      </div>
    </div>
  );
};
