export function randomUniqueString(): string {
  return Math.random().toString(36).substring(2);
}
