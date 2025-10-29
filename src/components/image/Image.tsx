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

    // Kiểm tra xem người dùng có truyền width/height không
    const hasSize =
      typeof props.width !== "undefined" || typeof props.height !== "undefined";

    return (
      <NextImage
        className={classNames(styles.wrapper, className, "object-cover")}
        unoptimized
        src={imgSrc || fallback}
        alt={alt || "image"}
        onError={() => setImgSrc(fallback)}
        {...(!hasSize ? { fill: true } : {})}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
