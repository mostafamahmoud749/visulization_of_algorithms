'use client';
import Axis from '@/comp/Axis';
import { useEffect, useRef } from 'react';
import Bars from './Bars';

export default function Sort({
  list,
  barWidth,
  sort,
  speed,
  name,
  running,
  toggleReset,
  addSteps,
  state,
}) {
  const startedRef = useRef(false);
  const multipliers = {
      bubble: 0.7,
      selection: 1.3,
      insertion: 0.5,
      merge: 0.3,
    };
  useEffect(() => {
    if (!running){
      startedRef.current = false;
      return
    } ;
    if (startedRef.current) return;

    startedRef.current = true;
    sort(list, addSteps, name);

  }, [running,sort, list, name, addSteps, toggleReset]);
  console.log(state);
  return (
    <div className="w-full h-full">
      <Axis>
        <Bars
          steps={state.steps}
          barWidth={barWidth}
          list={list}
          speed={speed*multipliers[name]}
        />
      </Axis>
    </div>
  );
}