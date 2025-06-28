export const capitalizeFirstLetter = (inputString: string) => {
  if (!inputString || typeof inputString !== "string") {
    return "";
  }

  const lowerString = inputString.toLocaleLowerCase();
  return lowerString.charAt(0).toLocaleUpperCase() + lowerString.slice(1);
};
