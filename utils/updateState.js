export const updateState = (path, value, setState) => {
  setState((prevState) => {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const newState = { ...prevState };
    let temp = newState;
    keys.forEach((key) => {
      if (!temp[key]) temp[key] = {};
      temp = temp[key];
    });
    temp[lastKey] = value;

    return newState;
  });
};

export const reducer = (state, action) => {
  const keys = action.path.split(".");
  const lastKey = keys.pop();
  const newState = { ...state };
  let temp = newState;
  keys.forEach((key) => {
    if (!temp[key]) temp[key] = {};
    temp = temp[key];
  });
  temp[lastKey] = action.value;
  return newState;
};
