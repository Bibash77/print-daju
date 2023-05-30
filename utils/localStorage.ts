import { isServer } from "./environment";

// convert object to string and store in localStorage
export const saveToLocalStorage = (state: any) => {
  if (isServer()) {
    console.info("Server-side -- skipping localStorage");
    return;
  }

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serializedState);
  } catch (e) {
    console.warn(e);
  }
};

// load string from localStarage and convert into an Object
// invalid output must be undefined
export const loadFromLocalStorage = () => {
  if (isServer()) {
    console.info("Server-side -- skipping localStorage");
    return;
  }

  try {
    const serializedState = localStorage.getItem("persistantState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
