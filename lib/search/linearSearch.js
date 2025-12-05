export function linearSearch(list, addSteps, name,target) {
  const arr = [...list];

  for (let i = 0; i < arr.length; i++) {
    // Step 1: highlight the current index being checked
    addSteps(name, { highlight: [i]});

    // Step 2: if found → stop
    if (arr[i] === target) {
      addSteps(name, { highlight: [], found: i });
      return i;
    }

    // Step 3: clear highlight (continue searching)
    addSteps(name, { highlight: []});
  }

  // Step 4: not found
  addSteps(name, { highlight: [], found: -1 });
  return -1
}