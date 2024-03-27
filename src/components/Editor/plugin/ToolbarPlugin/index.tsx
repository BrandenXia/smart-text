import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { fontSizeAtom } from "../../store.ts";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import TextFormatPlugin from "./TextFormatPlugin";

const LowPriority = 1;

const Index = () => {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);

  useEffect(
    () =>
      mergeRegister(
        editor.registerCommand(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload);
            return false;
          },
          LowPriority,
        ),
        editor.registerCommand(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload);
            return false;
          },
          LowPriority,
        ),
      ),
    [editor],
  );

  return (
    <div className="w-full flex items-center p-2">
      <button
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <div className="i-ph-arrow-counter-clockwise-duotone" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <div className="i-ph-arrow-clockwise-duotone" />
      </button>

      <button onClick={() => setFontSize((prev) => prev - 1)}>
        <div className="i-ph-minus-bold" />
      </button>
      <input
        type="number"
        value={fontSize}
        onChange={(e) => setFontSize(parseInt(e.target.value))}
      />
      <button onClick={() => setFontSize((prev) => prev + 1)}>
        <div className="i-ph-plus-bold" />
      </button>

      <TextFormatPlugin />
    </div>
  );
};

export default Index;
