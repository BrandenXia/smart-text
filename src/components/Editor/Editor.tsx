import { LexicalComposer } from "@lexical/react/LexicalComposer";
import type { LexicalEditor } from "lexical";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ReactNode } from "react";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { useAtomValue } from "jotai";
import { fontSizeAtom } from "./store.ts";

const theme = {};

const onError = (error: Error, editor: LexicalEditor) => {
  console.error(error, editor);
};

const Placeholder = () => (
  <div className="absolute left-3 top-3 text-base-content/50">Start typing...</div>
);

const TextArea = ({ children }: { children?: ReactNode }) => (
  <ContentEditable className="relative size-full overflow-auto p-3 outline-none">
    {children}
  </ContentEditable>
);

const Editor = () => {
  const fontSize = useAtomValue(fontSizeAtom);

  return (
    <LexicalComposer
      initialConfig={{
        namespace: "smart-text-editor",
        theme,
        onError
      }}
    >
      <div className="relative size-full font-serif" style={{
        fontSize: `${fontSize}px`
      }}>
        <RichTextPlugin
          contentEditable={<TextArea />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
}

export default Editor;
