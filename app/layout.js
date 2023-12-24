import './globals.css'
import NextTopLoader from 'nextjs-toploader'


export const metadata = {
  title: 'PokeDexplorer',
  description: 'Find your favorite Pokemon',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col items-center justify-center">  
        <NextTopLoader />
          {children}
        </main>
      </body>
    </html>
  )
}
