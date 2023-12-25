"use client"
import Image from "next/image"

export function PokemonImage({ image, name, className }) {
  return (
    <Image
      src={image}
      alt={name}
      width={250}
      height={250}
      priority={true}
      className={`transition-opacity opacity-0 duration-[2s ${className}]`}
      onLoad={(e) => e.target.classList.remove("opacity-0")}
    />
  )
}