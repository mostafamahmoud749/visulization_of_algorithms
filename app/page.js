'use client';
import Sort from '@/comp/Sort';
import { bubbleSort } from '@/lib/bubbleSort';
import { insertionSort } from '@/lib/insertionSort';
import { mergeSort } from '@/lib/mergeSort';
import { selectionSort } from '@/lib/selectionSort';
import { useState, useCallback } from 'react';

export default function Home() {
  const [list, setList] = useState([
    50, 20, 30, 40, 40, 90, 10, 100, 80, 60, 90, 100, 70,
  ]);
  const [inputValue, setInputValue] = useState('');
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(300);

  const [state, setState] = useState({
    bubble: {
      selected: true,
      steps: [],
    },
    selection: {
      selected: false,
      steps: [],
    },
    insertion: {
      selected: false,
      steps: [],
    },
    merge: {
      selected: false,
      steps: [],
    },
  });
  const barWidth = `${100 / list.length - 2}%`;
  const options = ['bubble', 'selection', 'insertion', 'merge'];

  const algorithms = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
    merge: mergeSort,
  };

  const addSteps = useCallback((name, obj) => {
    setState((prev) => {
      const bucket = prev[name] ?? { selected: false, steps: [] };
      return {
        ...prev,
        [name]: { selected: bucket.selected, steps: [...bucket.steps, obj] },
      };
    });
  }, []);
  const toggleState = (opt) => {
    setState((prev) => ({
      ...prev,
      [opt]: {
        selected: !prev[opt].selected,
        steps: prev[opt]?.steps ?? [],
      },
    }));
  };

  const showOptions = options.map((opt) => (
    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        onChange={() => toggleState(opt)}
        className="w-4 h-4 accent-yellow-500 cursor-pointer"
        checked={state[opt].selected}
      />
      <span>{opt}</span>
    </label>
  ));
  const selectedCount = Object.values(state).filter((s) => s.selected).length;
  const toggleReset = () => {
    setState((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([key, val]) => [
          key,
          { selected: val.selected, steps: [] },
        ])
      )
    );
    setRunning(false);
  };

  const addNumber = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num > 0) {
      setList([...list, num]);
      setInputValue('');
      toggleReset(); // clear steps when list changes
    } else {
      alert('Please enter a valid positive number');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addNumber();
    }
  };

  const showSorts = options.map(
    (el) =>
      state[el].selected && (
        <div key={el} className="flex flex-col items-center gap-2">
          <h2 className="font-bold text-lg text-gray-700">{el} Sort</h2>
          <Sort
            list={list}
            barWidth={barWidth}
            speed={speed}
            toggleReset={toggleReset}
            running={running}
            sort={algorithms[el]}
            name={el}
            addSteps={addSteps}
            state={state[el]}
          />
        </div>
      )
  );

  return (
    <div className=" w-full  flex flex-col justify-center items-center ">
      <div className="flex gap-4 items-center mb-6">{showOptions}</div>
      <div className="flex gap-6 mb-8">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a number"
          className="px-4 py-2 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={addNumber}
          className="bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold rounded-xl px-6 py-2 shadow-md transition"
        >
          Add Number
        </button>
        <button
          onClick={() => setList([])}
          className="bg-rose-500 hover:bg-rose-600 cursor-pointer text-white font-semibold rounded-xl px-6 py-2 shadow-md transition"
        >
          clear Numbers
        </button>

        {/* Speed slider */}
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-700">Speed</label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-40 accent-yellow-500 cursor-pointer"
          />
          <span className="text-xs text-gray-600">{speed} ms</span>
        </div>

        <button
          onClick={() => setRunning(true)}
          disabled={running || selectedCount === 0}
          className={`bg-yellow-500 hover:bg-yellow-600  text-white font-semibold rounded-xl px-6 py-2 shadow-md transition ${running || selectedCount === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          Start
        </button>

        <button
          onClick={toggleReset}
          className="bg-gray-700 hover:bg-gray-800 cursor-pointer text-white font-semibold rounded-xl px-6 py-2 shadow-md transition"
        >
          Reset
        </button>
      </div>

      <div
        className={`bg-white w-full h-[80vh] grid ${selectedCount <= 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-6 p-8 border border-gray-300 rounded-3xl shadow-lg`}
      >
        {showSorts}
      </div>
    </div>
  );
}
