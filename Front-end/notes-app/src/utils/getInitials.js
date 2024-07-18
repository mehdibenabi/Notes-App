export function getInitials(name) {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}
