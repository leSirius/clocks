'use client'
import {useEffect, useRef, useState} from "react";
import Clock from "@/components/Clock";
//import rungeKutta from 'runge-kutta';

const g=9.81, r=1, timeSlice= 0.5;      //when is set 0.467s, timeout callback is called around 17 times.
export default function Pendulum() {
  const [degree, setDegree] = useState(-45);
  const [lastW, setLastW] = useState(0);
  const [escapement, setEscapement] = useState({toLeft: true, lastVal:-46});  //direction and prev value. false means to left, true to right

  const a = getA(g, degree, r);
  const [newDegree, w] = euler(lastW, a, timeSlice/10000, timeSlice);

  useEffect(()=>{
    const timerId = setTimeout(()=>{
      const newEsc = {toLeft:escapement.toLeft, lastVal:newDegree};
      if (escapement.toLeft&&escapement.lastVal>newDegree) { newEsc.toLeft = false; }
      else if (!escapement.toLeft&&escapement.lastVal<newDegree) { newEsc.toLeft = true; }
      setEscapement(newEsc);
      setDegree(newDegree);
      setLastW(w);
    }, 50);
    return ()=>{ clearTimeout(timerId); }
  }, [degree, lastW]);

  function euler(w, a, dt, timeSlice) {
    let acc = degree, tempW = w, tempA = a;
    for (let t=0;timeSlice-t>Number.EPSILON;t+=dt) {
      acc += tempW*dt+1/2*tempA*dt*dt;
      tempW = tempW+tempA*dt;
      tempA = getA(g, acc, r);
    }
    return [acc, tempW];
  }

  return (
    <div className='relative flex justify-center'>
      <div className='absolute top-20 origin-top transition-transform duration-[50ms] ' style={{transform: `rotate(${degree}deg)`}}>
        <div className='w-0.5 h-40 mx-auto border-none bg-cyan-900'></div>
        <div className='w-32 h-32 mx-auto rounded-full bg-cyan-700 origin-top'></div>
      </div>
      <Clock escapement={escapement.toLeft}></Clock>
    </div>
  )
}

function getCosOfAngle(num) {
  return Math.cos(num/180*Math.PI);
}

function getSinOfAngle(num) {
  return Math.sin(num/180*Math.PI)
}

function getA(g, degree, r) {
  return -g*getSinOfAngle(degree)/r;
}