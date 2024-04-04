export const availableIcons = [
  'icon',
] as const;

export type IconNameType = (typeof availableIcons)[number];
