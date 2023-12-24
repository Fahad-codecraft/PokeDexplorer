"use client"

import Image from "next/image"
import Link from "next/link"
import { MotionDiv } from "./Motiondiv"
import { useState } from "react"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
}

const applyType = {
  normal: "#8C8C5E",
  fire: "#ffb933",
  water: "#068c9d",
  electric: "#D9B71E",
  grass: "#013220",
  ice: "#7EADA9",
  fighting: "#93221D",
  poison: "#862C86",
  ground: "#B39E4F",
  flying: "#8A75D6",
  psychic: "#E53C6D",
  bug: "#8C9831",
  rock: "#7E6D0D",
  ghost: "#604C81",
  dragon: "#5F2BBF",
  dark: "#5B5042",
  steel: "#A3A3B9",
  fairy: "#B56D8F"
}

export function PokemonCard({ name, image, types }) {
  const [retry, setRetry] = useState(false);
  const hasImage = Boolean(image);

  let predominantType = types[0]; // Set the first type as the default
  if (types.length > 1) {
    // If there are multiple types, prioritize the first one
    predominantType = types.find(type => type.slot === 1) || types[0];
  }

  const handleImageError = () => {
    setRetry(true);
  };


  const predominantColor = applyType[predominantType.type.name];
  return (
    <MotionDiv
      className="group rounded-lg border-2  flex justify-center items-center border-white m-3 px-5 py-4 transition hover:border-neutral-700 hover:bg-neutral-800/30 shadow-inner hover:scale-[1.02]"
      key={name + "Card"}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      style={{ backgroundColor: predominantColor }}
    >
      {retry ? (
        <div className="text-center">
          <p>Failed to load image. </p>
          <button onClick={() => setRetry(false)} className="border-2">
            Retry
          </button>
        </div>
      ) : (
        <>
          {image && (
            <Link href={name}>
                <Image
                  src={image}
                  height={300}
                  width={300}
                  alt={name}
                  className="rounded-lg p-5 border-sky-100 min-h-[300px] max-h-[300px] min-w-[300px] max-w-[300px] object-contain"
                  priority={true}
                  onError={handleImageError}
                />
                <h2 className="mb-3 text-2xl font-semibold">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </h2>
                <div className="text-center" key={name}>
                  {types.map((type) => {
                    const typeName = type.type.name;
                    const typeColor = typeColors[typeName];

                    return (
                      <span
                        key={typeName}
                        className="text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded"
                        style={{ backgroundColor: typeColor }}
                      >
                        {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                      </span>
                    );
                  })}
                </div>
            </Link>
          )}
        </>
      )}
    </MotionDiv>
  );
}