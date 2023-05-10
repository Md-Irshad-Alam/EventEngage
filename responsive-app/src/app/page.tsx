import Image from 'next/image'
import Navbar from './Componants/Navbar/Navbar'
import Banner from './Componants/Banner/Banner'
export default function Home() {
  return (
    <div>
      <Navbar/>
      <menu>
        <Banner/>
      </menu>
    </div>
  )
}
