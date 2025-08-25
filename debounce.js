function debounce(func, delay) {
  let timeout;

  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay); 
    // func.apply(this,args) allows passing the context and arguments
  };
}

const searchWithDebounce = debounce((query,name) => {
  console.log(name,` Searching for: ${query}`);
}, 3000);

searchWithDebounce('apple'); // Will log after 300ms
searchWithDebounce('banana','hitu'); // Previous call is cancelled, will log after 300ms
