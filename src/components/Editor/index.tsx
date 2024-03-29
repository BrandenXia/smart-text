import { LexicalComposer } from "@lexical/react/LexicalComposer";
import type { LexicalEditor } from "lexical";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ReactNode } from "react";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import theme from "./theme.ts";
import Toolbar, { ToolbarDivider } from "./ui/Toolbar.tsx";
import EditorCommandsPlugin from "@components/Editor/plugin/toolbar/EditorCommandsPlugin";
import TextFormatPlugin from "@components/Editor/plugin/toolbar/TextFormatPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { transformers, nodes } from "./transformer.ts";

const onError = (error: Error, editor: LexicalEditor) => {
  console.error(error, editor);
};

const Placeholder = () => (
  <div className="pointer-events-none absolute left-0 top-0 inline-block select-none text-ellipsis text-neutral-content">
    Start typing...
  </div>
);

const TextArea = ({ children }: { children?: ReactNode }) => (
  <ContentEditable className="relative size-full overflow-auto outline-none">
    {children}
  </ContentEditable>
);

const initialConfig = {
  namespace: "smart-text-editor",
  theme,
  onError,
  nodes,
};

const Editor = () => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar>
        <EditorCommandsPlugin className="rounded-xl p-2 transition-colors hover:bg-base-200 disabled:cursor-not-allowed disabled:text-neutral-content disabled:hover:bg-base-100 dark:disabled:text-neutral-content/50" />
        <ToolbarDivider />
        <TextFormatPlugin className="rounded-xl p-2 transition-colors hover:bg-base-200 peer-checked:bg-base-200 dark:hover:bg-neutral dark:peer-checked:bg-neutral" />
      </Toolbar>
      <div className="relative mx-2 mt-3 size-full font-serif text-xl text-base-content">
        <RichTextPlugin
          contentEditable={<TextArea />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <HistoryPlugin />
      <AutoFocusPlugin />
      <MarkdownShortcutPlugin transformers={transformers} />
    </LexicalComposer>
  );
};

export default Editor;
