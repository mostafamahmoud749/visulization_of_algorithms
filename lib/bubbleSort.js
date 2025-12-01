export function bubbleSort(list, addSteps, name) {
  let arr = [...list];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Step A: highlight only (no movement yet)
        addSteps(name, { highlight: [j, j + 1], curList: [...arr] });

        // perform swap
        const newArr = [...arr];
        [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
        arr = newArr;

        // Step B: movement after delay is handled by Bars (next step)
        addSteps(name, { highlight: [], curList: [...newArr] });
      }
    }
  }
  addSteps(name, { highlight: [], curList: [...arr] });
}
