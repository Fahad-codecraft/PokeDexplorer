import { getPokemon, getPokemonById } from "@/components/PokemonApi"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"
import { PokemonImage } from "@/components/PokemonImage"

export default async function PokemonPage({ params }) {
  const { pokemonName } = params;
  const pokemonObject = await getPokemon(pokemonName);
  let nextPokemonId, prevPokemonId;

  const pokemonId = parseInt(pokemonObject.id);
  if (pokemonId === 1025) {
    nextPokemonId = 10001;
    prevPokemonId = pokemonId - 1;
  } else if (pokemonId === 10001) {
    nextPokemonId = pokemonId + 1;
    prevPokemonId = 1025;
  } else if (pokemonId === 1) {
    nextPokemonId = pokemonId + 1;
    prevPokemonId = pokemonId + 0;
  } else if (pokemonId == 10277) {
    nextPokemonId = pokemonId + 0;
    prevPokemonId = pokemonId - 1;
  } else {
    nextPokemonId = pokemonId + 1;
    prevPokemonId = pokemonId - 1;
  }

  const nextPokemonObject = await getPokemonById(nextPokemonId);
  const prevPokemonObject = await getPokemonById(prevPokemonId);

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
    fairy: "#D685AD"
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

  const mainTypeColor = applyType[pokemonObject.types[0].type.name.toLowerCase()];
  const fullDivStyle = {
    backgroundImage: `radial-gradient(circle at 50% 0%, ${mainTypeColor} 36%, #ffffff 36%)`,
  };


  return (
    <>
      <div className="flex flex-row w-full justify-between items-center sm:block" key={pokemonName}>
        <div className="flex justify-start p-4 sm:hidden">
          <div className="animate-prev rounded-full border-2 p-[3px]">
            {prevPokemonObject.sprites.other.showdown.front_default || prevPokemonObject.sprites.front_default || prevPokemonObject.sprites.other['official-artwork'].front_default ? (
              <Link href={prevPokemonObject.name} className="flex items-center">
                <p>←Prev</p>
                <Image src={prevPokemonObject.sprites.other.showdown.front_default || prevPokemonObject.sprites.front_default || prevPokemonObject.sprites.other['official-artwork'].front_default} alt={prevPokemonObject.name} width={50} height={50} className="rounded-full object-contain" priority={true} style={{
                  width: '50px',
                  height: '50px',
                }} />
              </Link>
            ) : (
              <Link href={prevPokemonObject.name}>
                <span>{prevPokemonObject.name}</span>
              </Link>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center sm:justify-center" key={pokemonObject.name}>
          <div
            className="text-black text-center border-none mt-2 bg-[#eff3ff] w-[350px] rounded-2xl scale-90"
            key={pokemonObject.id}>
            <div className="relative w-[100%] px-2 py-[10px] rounded-2xl" style={fullDivStyle}>
              <div className="flex items-center justify-center sm:justify-between text-center text-xs">
                <Link href={prevPokemonObject.name} className="flex items-center md:hidden lg:hidden xl:hidden">
                  <p className="flex justify-start text-[0.9rem]">
                    ←Prev
                  </p>
                </Link>
                <Link href="/">
                  <p className="text-lg font-bold text-[red] flex justify-center text-center">
                    Poke<span className="text-[white]">Dexplorer</span>
                  </p>
                </Link>
                <Link href={nextPokemonObject.name} className="flex items-center md:hidden lg:hidden xl:hidden">
                  <p className="flex justify-end text-[0.9rem]">
                    Next→
                  </p>
                </Link>
              </div>

              <h1 className="text-4xl font-semibold ">
                {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
              </h1>
              {pokemonObject.sprites.other.dream_world.front_default || pokemonObject.sprites.other['official-artwork'].front_default || pokemonObject.sprites.other.home.front_default || pokemonObject.sprites.front_default ? (
                <PokemonImage
                  image={pokemonObject.sprites.other.dream_world.front_default || pokemonObject.sprites.other['official-artwork'].front_default || pokemonObject.sprites.other.home.front_default || pokemonObject.sprites.front_default}
                  name={pokemonName}
                  className="block relative mx-auto my-auto min-h-[250px] max-h-[250px] min-w-[250px] max-w-[250px] object-contain p-2"
                  priority={true}
                />
              ) : (
                <div className="block relative mx-auto my-auto min-h-[250px] max-h-[250px] min-w-[250px] max-w-[250px] object-contain p-2 ">
                  <span>No Image</span>
                </div>
              )}
              {pokemonObject.types.map((type, index) => {
                const typeName = type.type.name;
                const typeColor = typeColors[typeName];
                return (
                  <span
                    key={`${pokemonName}-type-${index}`}
                    className="text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded"
                    style={{ backgroundColor: typeColor }}
                  >{typeName.charAt(0).toUpperCase() + typeName.slice(1)}</span>
                )
              })}
              <h1>Weight: <span className="font-bold">{parseInt(pokemonObject.weight) / 10} kg</span></h1>
              <h1>Height: <span className="font-bold">{parseInt(pokemonObject.height) / 10} m</span></h1>
              {pokemonObject.stats.map((stat, index) => {
                const statName = stat.stat.name;
                const statValue = stat.base_stat;
                return (
                  <>
                    <div className="" style={{ width: "350px" }} key={statName}>
                      <h1 className="capitalize p-1">{statName}: <span className="font-bold">{statValue}</span></h1>
                    </div>
                    <div>
                      <Progress className="border-4 border-black" value={statValue} max={120} bgc={mainTypeColor} key={`${statName}-progress-${index}`} />
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-end p-4 sm:hidden">
          <div className="animate-next rounded-full  border-2 p-[3px] object-contain text-center">
            {nextPokemonObject.sprites.other.showdown.front_default || nextPokemonObject.sprites.front_default || nextPokemonObject.sprites.other['official-artwork'].front_default ? (
              <Link href={nextPokemonObject.name} className="object-contain flex items-center">
                <Image src={nextPokemonObject.sprites.other.showdown.front_default || nextPokemonObject.sprites.front_default || nextPokemonObject.sprites.other['official-artwork'].front_default} alt={nextPokemonObject.name} width={50} height={50} className="rounded-full object-contain" priority={true} style={{
                  width: '50px',
                  height: '50px',
                }} />
                <p>Next→</p>
              </Link>
            ) : (
              <Link href={nextPokemonObject.name}>
                <span>{nextPokemonObject.name}→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}