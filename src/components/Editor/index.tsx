import { LexicalComposer } from "@lexical/react/LexicalComposer";
import type { LexicalEditor } from "lexical";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ReactNode } from "react";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import theme from "./theme.ts";
import Toolbar from "./ui/Toolbar.tsx";
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
  <ContentEditable className="relative size-full outline-none">
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
      <div className="flex size-full flex-col">
        <Toolbar.Root className="flex-none">
          <EditorCommandsPlugin button={Toolbar.Button} />
          <Toolbar.Divider />
          <TextFormatPlugin toggleButton={Toolbar.ToggleButton} />
        </Toolbar.Root>
        <div className="relative mx-2 mt-3 flex-1 overflow-auto font-serif text-xl text-base-content">
          <RichTextPlugin
            contentEditable={<TextArea />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <AutoFocusPlugin />
        <MarkdownShortcutPlugin transformers={transformers} />
      </div>
    </LexicalComposer>
  );
};

export default Editor;
