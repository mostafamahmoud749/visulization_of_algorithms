export function selectionSort(list, addSteps, name) {
  let arr = [...list];
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      // highlight comparison
      addSteps(name, { highlight: [j, minIndex], curList: [...arr] });
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      // highlight swap target
      addSteps(name, { highlight: [i, minIndex], curList: [...arr] });
      // perform swap
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      // movement step
      addSteps(name, { highlight: [], curList: [...arr] });
    }
  }
  addSteps(name, { highlight: [], curList: [...arr] });
}
