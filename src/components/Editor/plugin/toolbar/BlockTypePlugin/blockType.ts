import { $createParagraphNode, ElementNode } from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createListItemNode, $createListNode } from "@lexical/list";

type BlockType =
  | "paragraph"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "bullet"
  | "number";

const BlockTypeToBlockNameIcon: Record<BlockType, [string, string]> = {
  paragraph: ["Paragraph", "i-ph-text-t"],
  h1: ["Heading 1", "i-ph-text-h-one"],
  h2: ["Heading 2", "i-ph-text-h-two"],
  h3: ["Heading 3", "i-ph-text-h-three"],
  bullet: ["Bulleted List", "i-ph-list-bullets"],
  number: ["Numbered List", "i-ph-list-numbers"],
  h4: ["Heading 4", "i-ph-text-h-four"],
  h5: ["Heading 5", "i-ph-text-h-five"],
  h6: ["Heading 6", "i-ph-text-h-six"],
};

const createList = (type: "bullet" | "number") =>
  $createListNode(type).append($createListItemNode());

const FormatBlockTypeCommand: Record<BlockType, () => ElementNode> = {
  h1: () => $createHeadingNode("h1"),
  h2: () => $createHeadingNode("h2"),
  h3: () => $createHeadingNode("h3"),
  h4: () => $createHeadingNode("h4"),
  h5: () => $createHeadingNode("h5"),
  h6: () => $createHeadingNode("h6"),
  bullet: () => createList("bullet"),
  number: () => createList("number"),
  paragraph: $createParagraphNode,
};

export { BlockTypeToBlockNameIcon, FormatBlockTypeCommand };
export type { BlockType };
