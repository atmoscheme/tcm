export const availableIcons = ["arrow-right"] as const;

export type IconNameType = (typeof availableIcons)[number];
