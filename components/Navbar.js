import Image from "next/image"

const Navbar = () => {
  return (
    <header>
        <div className="max-w-[90%] h-14 m-auto flex items-center justify-center border-b gap-2 sticky top-0">
          <Image src="/pokeball.png" width={50} height={50} alt="pokeball" className="hover:rotate-[360deg] transition duration-500"/>
          <p className="text-2xl font-bold text-[red] hover:rotate-[5deg] transition duration-500">
            Poke<span className="text-[white]">Dexplorer</span>
          </p>
          <Image src="/pokeball.png" width={50} height={50} alt="pokeball" className="hover:rotate-[360deg] transition duration-500"/>
        </div>
    </header>
  )
}

export default Navbar