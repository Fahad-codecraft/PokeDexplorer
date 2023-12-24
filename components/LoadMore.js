"use client"
import { useEffect, useState } from "react";
import { getPokemonData } from "./PokemonApi";
import { PokemonCard } from "./PokemonCard";
import Image from "next/image";


function LoadMore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(20);
  const [noMoreToLoad, setNoMoreToLoad] = useState(false);

  const loadMorePokemon = () => {
    setLoading(true);
    getPokemonData(offset)
      .then((res) => {
        if (res.length === 0) {
          setNoMoreToLoad(true);
        } else {
          setData([...data, ...res]);
          setOffset(offset + 20);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMorePokemon();
  }, []);

  return (
    <>
      <div className="grid text-center sm:mb-0 sm:grid-cols-1 md:mb-0 md:grid-cols-2 lg:mb-0 lg:grid-cols-3 xl:mb-0 xl:grid-cols-4">
        {data.map((pokemon) => (
          <PokemonCard
            name={pokemon.name}
            image={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other.home.front_default || pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            types={pokemon.types}
            key={pokemon.name}
          />
        ))}
      </div>
      <section className="flex justify-center items-center w-full">
        {loading ? (
          <div className="w-full flex justify-center items-center py-4 bg-black">
            <Image src="loader.svg" alt="loader" height={60} width={60} />
          </div>
        ) : noMoreToLoad ? (
          <p>No more to load</p>
        ) : (
          <button
            onClick={loadMorePokemon}
            className="animate-bounce bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded transition hover:scale-[1.03]"
            disabled={loading}
          >
            {loading ? "Loading..." : "↓ Load More"}
          </button>
        )}
      </section>
    </>
  );
}

export default LoadMore;