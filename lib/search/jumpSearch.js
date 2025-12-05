export  function jumpSearch(list, addSteps, name,target) {
  const n = list.length;
  let step = Math.floor(Math.sqrt(n)); 
  let prev = 0;
  addSteps(name,{ highlight: [step]})
  addSteps(name,{ highlight: []})
  while (list[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    addSteps(name,{ highlight: [step]})
    if (prev >= n) return -1; 
    addSteps(name,{ highlight: []})
  }

  for (let i = prev; i < Math.min(step, n); i++) {
    addSteps(name,{ highlight: [i]})
    if (list[i] === target) {
      addSteps(name,{ highlight: [], found: i })
      return i
    };
    addSteps(name,{ highlight: []})
  }
  addSteps(name, { highlight: [], found: -1 })
  return -1;
}