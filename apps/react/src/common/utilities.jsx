export const TextSize = (size) => {
  return size === "extra_small"
    ? "text-xs"
    : size === "small"
    ? "text-sm"
    : size === "large"
    ? "text-xl"
    : size === "extra_large"
    ? "text-2xl"
    : "text-base";
};

export function Severity(colour) {
  console.log(colour);
  
  return  colour === "primary"
    ? "text-primary"
    : colour === "secondary"
    ? "text-secondary"
    : colour === "error"
    ? "text-error"
    : colour === "success"
    ? "text-success"
    : colour === "warning"
    ? "text-warning"
    : "text-primary";
}
