export function areArraysEqual(arr1: any, arr2: any) {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((item: any, index: number) => {
    if (Array.isArray(item) && Array.isArray(arr2[index])) {
      return areArraysEqual(item, arr2[index]);
    }
    if (typeof item === "object" && typeof arr2[index] === "object") {
      return JSON.stringify(item) === JSON.stringify(arr2[index]); // Deep equality for objects
    }
    return item === arr2[index]; // Primitive comparison
  });
}
