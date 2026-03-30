interface AvatarColor {
  bg: string;
  text: string;
}

export const AVATAR_COLOR_PALETTE: AvatarColor[] = [
  { bg: "bg-green-600", text: "text-white" },
  { bg: "bg-violet-500", text: "text-white" },
  { bg: "bg-pink-600", text: "text-white" },
  { bg: "bg-teal-500", text: "text-white" },
  { bg: "bg-primary", text: "text-white" },
  { bg: "bg-orange-600", text: "text-white" },
];

export function getAvatarColor(name: string): AvatarColor {
  const sum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLOR_PALETTE[sum % AVATAR_COLOR_PALETTE.length];
}
