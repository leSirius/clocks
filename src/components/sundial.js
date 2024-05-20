'use client'
import {useEffect, useRef} from "react";

export default function Sundial() {
  const sunRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const ratioTextSun = 0.2, pace = 100;

  useEffect(() => {
    const bg = bgRef.current;
    bg.addEventListener('mousemove', handleMove);
    function handleMove(e) {
      const rect = bg.getBoundingClientRect();
      const sunRect = sunRef.current.getBoundingClientRect();
      const x = e.clientX-(rect.left+window.scrollX)-Number(sunRect.width)/2;
      const y = e.clientY-(rect.top+window.scrollY)-Number(sunRect.height)/2;
      sunRef.current.style.left = `${x}px`;
      sunRef.current.style.top = `${y}px`;
    }
    return ()=> { bg.removeEventListener('mousemove', handleMove); }
  }, []);

  useEffect(() => {
    const bg = bgRef.current;
    bg.addEventListener('mousemove', genShadow);
    function genShadow(e) {
      let newShadow = '';
      const text = textRef.current, textRect = textRef.current.getBoundingClientRect();
      const distX = e.clientX - textRect.left, distY = e.clientY - textRect.top;
      for (let ratio=ratioTextSun/pace; ratioTextSun-ratio>Number.EPSILON; ratio+=ratioTextSun/pace) {
        const shadowX = distX/(1-ratio)*ratio, shadowY = distY/(1-ratio)*ratio;
        newShadow += `${newShadow? ', ':''}${-shadowX.toFixed(1)}px ${-shadowY.toFixed(1)}px 2px rgba(20,20,20,${1-ratio/ratioTextSun})`;
      }
      text.style.textShadow = newShadow;
    }
    return ()=>{ bg.removeEventListener('mousemove', genShadow); }
  }, []);

  return (
    <div ref={bgRef} className='w-full h-96 pt-40 text-center bg-gray-700 relative overflow-hidden'>
      <p ref={textRef} className='max-w-fit mx-auto text-4xl text-gray-200'>Sundial</p>
      <div ref={sunRef} className='absolute top-1/4 left-1/4 w-10 h-10 rounded-full bg-yellow-100
        shadow-[0_0_15px_2px_#ffffff,0_0_50px_#ffffff,0_0_75px_#ffffff,0_0_100px_#ffffff,0_0_200px_#ffffff,0_0_300px_#ffffff]
      '></div>
    </div>
  )
}

//0px_0px_15px_#ffffff, 0_0_100px_#ffffff