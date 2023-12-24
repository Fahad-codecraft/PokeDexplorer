import PokemonGrid from "@/components/PokemonGrid";
import { getPokemonData } from "@/components/PokemonApi";
import LoadMore from "@/components/LoadMore";
import { PokemonCard } from "@/components/PokemonCard";
import Link from "next/link";
import Image from "next/image";



export default async function Home() {
  const pokemonData = await getPokemonData()
  // console.log(pokemonData)

  return (
    <>
      <main className="p-24 pt-3">
        <div className="z-10 w-full items-center justify-center text-sm lg:flex border-2 transition hover:border-neutral-700 hover:bg-neutral-800/30 shadow-inner hover:scale-[1.05] pb-2 rounded-lg">

          <div className="max-w-[90%] h-14 m-auto flex items-center justify-center gap-2 sticky top-0 cursor-default">
            <Image src="/pokeball.png" width={50} height={50} alt="pokeball" className="hover:rotate-[360deg] transition duration-500" />
            <p className="text-3xl font-bold text-[red] md:text-5xl">
              Poke<span className="text-[white]">Dexplorer</span>
            </p>
            <Image src="/pokeball.png" width={50} height={50} alt="pokeball" className="hover:rotate-[360deg] transition duration-500" />
          </div>

        </div>
        <main >
          <PokemonGrid />
          <div className="grid text-center sm:mb-0 sm:grid-cols-1 md:mb-0 md:grid-cols-2 lg:mb-0 lg:grid-cols-3 xl:mb-0 xl:grid-cols-4">
            {pokemonData.map((pokemon) => {
              // console.log(pokemon.type)
              return (
                <PokemonCard name={pokemon.name} image={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.other.home.front_default} types={pokemon.types} key={pokemon.name} />
              )
            })}
          </div>
          <LoadMore />
        </main>
      </main>
    </>
  )
}
