export function toSegment(value: string): string {
  return value;
}

export function fromSegment(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
