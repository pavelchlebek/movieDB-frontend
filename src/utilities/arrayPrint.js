export const arrayPrint = (inputArray) => {
  let outputString = "";
  for (let i = 0; i < inputArray.length; i++) {
    outputString += inputArray[i];
    if (i + 1 < inputArray.length) {
      outputString += ", ";
    }
  }
  return outputString;
};
