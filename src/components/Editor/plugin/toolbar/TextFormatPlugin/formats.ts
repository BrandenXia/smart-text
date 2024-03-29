import { TextFormatType } from "lexical";

const TextFormats: TextFormatType[] = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
];

const FormatIconMap = {
  bold: "i-ph-text-bolder",
  italic: "i-ph-text-italic",
  underline: "i-ph-text-underline",
  strikethrough: "i-ph-text-strikethrough",
} as Record<TextFormatType, string>;

type FormatStatesType = Record<TextFormatType, boolean>;

const formatInitialState = TextFormats.reduce(
  (acc, format) => ({ ...acc, [format]: false }),
  {} as FormatStatesType,
);

export { FormatIconMap, TextFormats, formatInitialState };
export type { FormatStatesType };
