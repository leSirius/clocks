import Image from "next/image";
import Clock from "@/components/Clock";
import Pendulum from "@/components/pendulum";
import Sundial from "@/components/sundial";

export default function Home() {
  return (
    <main>
      <div className=' grid grid-cols-3 h-screen mx-auto  bg-sky-600'>


        <div className='col-span-1'>
          <Pendulum></Pendulum>
        </div>

        <div className='col-span-1 '>
          <Sundial></Sundial>
        </div>
      </div>
    </main>
  );
}
