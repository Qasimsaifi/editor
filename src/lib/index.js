// place files you want to import through the `$lib` alias in this folder.
function printArrayWithIndex(array) {
  array.forEach((element, index) => {
    console.log(`Element at index ${index}: ${element}`);
  });
}
printArrayWithIndex(['apple', 'banana', 'cherry']);