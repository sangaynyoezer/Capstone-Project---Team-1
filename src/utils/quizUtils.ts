export function createShuffledIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, index) => index);

  for (let index = indices.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [indices[index], indices[swapIndex]] = [indices[swapIndex], indices[index]];
  }

  if (indices.length > 1 && indices.every((value, index) => value === index)) {
    indices.reverse();
  }

  return indices;
}
