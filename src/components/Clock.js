'use client'
import {useEffect, useState} from "react";
import { tv } from 'tailwind-variants';
import {Dial} from '/public/icons'
import Image from "next/image";

const dial = tv({
  base: 'absolute rounded-full',
  variants:{
    genre: {
      second: 'w-40 h-40 bg-lime-700',
      minute: 'w-32 h-32 bg-cyan-700 top-4 left-4',
      hour: 'w-24 h-24 bg-teal-500 top-8 left-8',
    },
    rotate: {
      true: 'transition-transform duration-100',
    }
  },
})

export default function Clock({escapement}) {
  const [prevDirection, setPrevTrigger] = useState(escapement)
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [standard, setStandard] = useState(null);

  function addSecond() {
    setSecond(second+1);
    if (second%60===59) { setMinute(minute + 1); }
    if (minute%60===59&&second%60===59) { setHour(hour+1); }
  }

  useEffect(() => {
    setStandard(new Date());
  }, []);

  if (prevDirection!==escapement) {
    addSecond();
    setPrevTrigger(escapement);
    //console.timeEnd('clock');
    //console.time('clock');
    //console.log(new Date().getTime() - standard?.getTime());
  }

  return(
    <div className={`relative w-52 h-52 `}>
      <div style={{transform: `rotate(${second*6}deg)`}} className={dial({genre: 'second', rotate: true})}>
        <Dial></Dial>
      </div>
      <div style={{transform: `rotate(${minute*6}deg`}} className={dial({genre: 'minute', rotate: true})}>
        <Dial></Dial>
      </div>
      <div style={{transform: `rotate(${hour*30}deg`}} className={dial({genre: 'hour', rotate: true})}>
        <Image width='100' height='100' src='/hour-dial.png' alt='failed'></Image>
      </div>
      <p className='absolute left-[70.5px] text-sm'>{`${to2Digits(second%60)}`}</p>
      <p className='absolute left-[70.5px] top-4 text-sm'>{`${to2Digits(minute%60)}`}</p>

      <p className='absolute left-1/2 top-6 text-sm'>{`${((new Date()-standard?.getTime())/1000).toFixed(2)}`}</p>
    </div>
  )
}

function to2Digits(num) {
  return num<10? `0${num}`:num
}
