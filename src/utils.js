export function dynamicFont(w, h, factor) {
  return Math.min(w, h) * factor;
}

export function halfPoint(p1, p2) {
  return p1 / 2 - p2 / 2;
}

