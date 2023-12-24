"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { realTimeSearch } from "./PokemonApi"
import { motion } from "framer-motion"

export default function PokemonGrid() {
  const [searchText, setSearchText] = useState("")
  const [result, setResult] = useState([])
  const [pokemonData, setPokemonData] = useState([])

  const getPokemonData = async () => {
    const response = await realTimeSearch()
    // console.log(response)
    setPokemonData(response)
  }
  // console.log(pokemonData)

  const handleSearch = (e) => {
    e.preventDefault()
    const res = pokemonData.filter((pokemon) => {
      return pokemon.name.includes(searchText.toLowerCase());
    })
    setResult(res)
    console.log(result)
  }
  useEffect(() => {
    getPokemonData()
  }, [])



  const handleChange = (e) => {
    setSearchText(e.target.value)
    const res = pokemonData.filter((pokemon) => {
      return pokemon.name.includes(searchText.toLowerCase());
    })
    setResult(res)
    // console.log(result)
  }

  const displaySearchResults = () => {
    return result.map((pokemon) => {
      return <Link href={pokemon.name} key={pokemon.name}>
        <div key={pokemon.name} className="flex items-center px-[0.5rem] py-[0.5rem] rounded-md cursor-pointer transition-all duration-300 text-[1.2rem] font-semibold text-[#333] capitalize hover:bg-gray-200 hover:text-[#7263f3]">
          {pokemon.name}
        </div>
      </Link>
    })
  }

  return (
    <>
      <div>
        <h3 className="text-2xl py-3 text-center">
          Search For Your Pokemon!
        </h3>
        <form action="" className="search-form" onSubmit={handleSearch}>
          <div className="w-full input-control flex justify-center items-center gap-1.5">
            <input
              type="text"
              className="text-black rounded-lg w-1/2 lg:w-1/2"
              value={searchText}
              id="pokemonName"
              autoComplete="off"
              placeholder="Pikachu, Chrizad, etc."
              onChange={handleChange}
            />
          </div>
        </form>
        {searchText && result.length > 0 && <div className="search-results text-black absolute h-[14rem] w-1/2 lg:w-[37rem] left-[50%] overflow-auto translate-x-[-50%] z-[5] rounded-lg px-[1rem] pt-[1.2rem] bg-white" >
          {displaySearchResults()}
        </div>}
      </div>
    </>
  )
}