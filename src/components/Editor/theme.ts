import { EditorThemeClasses } from "lexical";

const theme = {
  heading: {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-bold",
    h5: "text-lg font-bold",
    h6: "text-base font-bold",
  },
  list: {
    ul: "list-outside list-revert",
    ol: "list-outside",
    olDepth: [
      "list-decimal",
      "list-upper-alpha",
      "list-lower-alpha",
      "list-upper-roman",
      "list-lower-roman",
    ],
    listitem: "ml-6",
    nested: {
      listitem: "list-none",
    },
  },
  text: {
    bold: "font-bold",
    italic: "italic",
    strikethrough: "line-through",
    underline: "underline",
  },
} satisfies EditorThemeClasses;

export default theme;
