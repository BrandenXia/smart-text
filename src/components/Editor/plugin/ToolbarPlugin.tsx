import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { fontSizeAtom } from "../store.ts";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND, FORMAT_TEXT_COMMAND, REDO_COMMAND,
  SELECTION_CHANGE_COMMAND, UNDO_COMMAND
} from "lexical";
import { mergeRegister } from "@lexical/utils";

const LowPriority = 1;

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [, setIsBold] = useState(false);
  const [, setIsItalic] = useState(false);
  const [, setIsUnderline] = useState(false);
  const [, setIsStrikethrough] = useState(false);
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;
    setIsBold(selection.hasFormat("bold"));
    setIsItalic(selection.hasFormat("italic"));
    setIsUnderline(selection.hasFormat("underline"));
    setIsStrikethrough(selection.hasFormat("strikethrough"));
  }, []);

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) =>
          editorState.read(() => updateToolbar()),
        ),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateToolbar();
            return false;
          },
          LowPriority,
        ),
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
    [editor, updateToolbar],
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

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        <div className="i-ph-text-bolder" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        <div className="i-ph-text-italic" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        <div className="i-ph-text-underline" />
      </button>
      <button
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
      >
        <div className="i-ph-text-strikethrough" />
      </button>
    </div>
  );
};

export default ToolbarPlugin;
