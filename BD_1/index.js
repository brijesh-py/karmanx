function checkIsNumber(...variables) {
  console.log(variables);
  let variableNames = "";
  for (let variable in variables) {
    if (variables[variable] === undefined) {
      continue;
    }

    const variableName = Object.keys(variables[variable])[0];
    const value = Object.values(variables[variable])[0];
    const isFloat = /^-?\d+(\.\d+)?$/.test(value);
    if (!isFloat) {
      variableNames += variableName + ", ";
    }
  }

  const message = variableNames
    ? `${variableNames} is expected to be a Number`
    : "";
  return { isError: message };
}

// console.log(checkIsNumber({ undefined: "23" }));
// console.log(
//   checkIsNumber({ age: "23" }, { username: "hello" }, { username: "hello" })
// );

module.exports = checkIsNumber;
