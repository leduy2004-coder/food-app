import React, { useState, forwardRef } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import classNames from "classnames";
import images from "@/assets/images";
import styles from "./Image.module.scss";

type CustomImageProps = NextImageProps & {
  fallback?: string;
};

const Image = forwardRef<HTMLImageElement, CustomImageProps>(
  ({ src, alt, className, fallback = images.noImage, ...props }, ref) => {
    const [imgSrc, setImgSrc] = useState(src);

    return (
      <NextImage
        ref={ref}
        src={imgSrc || fallback}
        alt={alt || "image"}
        className={classNames(styles.wrapper, className)}
        onError={() => setImgSrc(fallback)}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
