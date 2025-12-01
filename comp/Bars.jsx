'use client';
import { useState, useEffect, useMemo } from 'react';

export default function Bars({ steps, barWidth, list, speed }) {
  const [stepIndex, setStepIndex] = useState(-1);

  useEffect(() => {
    setStepIndex(-1);
  }, [steps]);

  useEffect(() => {
    if (!steps || steps.length === 0) return;
    if (stepIndex >= steps.length - 1) return;
    const id = setTimeout(() => setStepIndex((i) => i + 1), speed);
    return () => clearTimeout(id);
  }, [steps, stepIndex, speed]);

  const current =
    steps && steps.length && stepIndex >= 0 ? steps[stepIndex] : null;
  const arr = current ? current.curList || [] : list;
  const highlight = current?.highlight || [];
  const maxVal = useMemo(() => Math.max(...list), [list]);

  return (
    <>
      {arr.map((bar, index) => {
        const h = maxVal === 0 ? 0 : (bar / maxVal) * 100;
        const active = highlight.includes(index);
        return (
          <div
            key={index}
            style={{
              width: barWidth,
              height: `${h}%`,
            }}
            className={`relative rounded-t-md max-w-24 transition-all duration-150 ${
              active ? 'bg-rose-500' : 'bg-gray-500 hover:bg-gray-600'
            }`}
          >
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-700">
              {bar}
            </div>
          </div>
        );
      })}
    </>
  );
}
