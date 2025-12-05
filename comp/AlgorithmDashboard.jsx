'use client';
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Algorithm from '@/comp/Algorithm';
import Controls from './Controls';

export default function AlgorithmDashboard({
  state,
  options,
  algorithms,
  addSteps,
  toggleState,
  setState,
  type,
}) {
  const [list, setList] = useState([
    50, 20, 30, 40, 40, 90, 10, 100, 80, 60, 90, 100, 70,
  ]);
  const [inputValue, setInputValue] = useState('');
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [target, setTarget] = useState(80);
  const [text, setText] = useState('Start');
  const [stepIndex, setStepIndex] = useState({
    bubble: -1,
    selection: -1,
    insertion: -1,
    merge: -1,
    linear: -1,
    binary: -1,
    jump: -1,
    exponential: -1,
  });
  const [paused, setpaused] = useState(false);
  const barWidth = `${100 / list.length - 2}%`;
  const selectedCount = Object.values(state).filter((s) => s.selected).length;

  const toggleReset = useCallback(() => {
    setState((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([key, val]) => [
          key,
          { selected: val.selected, steps: [] },
        ])
      )
    );
    setRunning(false);
    setpaused(false);
    setStepIndex({
      bubble: -1,
      selection: -1,
      insertion: -1,
      merge: -1,
      linear: -1,
      binary: -1,
      jump: -1,
      exponential: -1,
    });
    setText('Start');
  }, [setState, setRunning]);
  const updateIndex = useCallback((name, index) => {
    setStepIndex((prev) => ({ ...prev, [name]: index }));
  }, []); // ✅ stable reference
  const sortedList = useMemo(
    () => (type === 'search' ? [...list].sort((a, b) => a - b) : list),
    [list, type]
  );
  const showSorts = useMemo(() => {
    return options.map(
      (el, index) =>
        state[el].selected && (
          <div
            key={el}
            className={`flex flex-col items-center gap-2 ${type === 'search' && index !== 0 ? 'mt-4' : ''}`}
          >
            <h2 className="font-bold text-lg text-gray-700">
              {el} {type}
            </h2>
            <Algorithm
              list={sortedList}
              barWidth={barWidth}
              speed={speed}
              toggleReset={toggleReset}
              running={running}
              algo={algorithms[el]}
              name={el}
              addSteps={addSteps}
              state={state[el]}
              target={target}
              type={type}
              paused={paused}
              stepIndex={stepIndex}
              updateIndex={updateIndex}
            />
          </div>
        )
    );
  }, [
    options,
    state,
    sortedList,
    barWidth,
    speed,
    toggleReset,
    running,
    algorithms,
    addSteps,
    target,
    type,
    paused,
    stepIndex,
    updateIndex,
  ]);

  return (
    <div className=" w-full  flex flex-col justify-center items-center ">
      <Controls
        options={options}
        state={state}
        inputValue={inputValue}
        speed={speed}
        setList={setList}
        setSpeed={setSpeed}
        setInputValue={setInputValue}
        running={running}
        selectedCount={selectedCount}
        toggleReset={toggleReset}
        list={list}
        setRunning={setRunning}
        toggleState={toggleState}
        setTarget={setTarget}
        target={target}
      />

      <div
        className={`bg-white w-full h-[80vh] ${type == 'sort' ? `grid ${selectedCount <= 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-6` : ''} p-8 border border-gray-300 rounded-3xl shadow-lg`}
      >
        {showSorts}
      </div>
      <div className="flex justify-center items-start gap-3 mt-5">
        <button
          onClick={() => {
            setStepIndex((prev) => {
              const updated = {};
              for (const key in prev) {
                updated[key] = Math.max(-1, prev[key] - 1); // don't go below -1
              }
              return updated;
            });
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl px-6 py-2 shadow-md transition cursor-pointer"
        >
          -
        </button>
        <button
          onClick={() => {
            if (!running) setRunning(true);
            else setpaused((prev) => !prev);
            setText((t) => (t === 'Pause' ? 'Continue' : 'Pause'));
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl px-6 py-2 shadow-md transition cursor-pointer"
        >
          {text}
        </button>
        <button
          onClick={() => {
            setStepIndex((prev) => {
              const updated = {};
              for (const key in prev) {
                // don't exceed steps length for each algorithm
                const maxIndex = (state[key]?.steps?.length || 0) - 1;
                updated[key] = Math.min(maxIndex, prev[key] + 1);
              }
              return updated;
            });
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl px-6 py-2 shadow-md transition cursor-pointer"
        >
          +
        </button>

        <button
          onClick={toggleReset}
          className="bg-gray-700 hover:bg-gray-800 cursor-pointer text-white font-semibold rounded-xl px-6 py-2 shadow-md transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
