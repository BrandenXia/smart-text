import { TextFormatType } from "lexical";
import { atom } from "jotai";

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

const formatStatesAtom = atom<FormatStatesType>(
  TextFormats.reduce(
    (acc, format) => ({ ...acc, [format]: false }),
    {} as FormatStatesType,
  ),
);

export { FormatIconMap, TextFormats, formatStatesAtom };
export type { FormatStatesType };
