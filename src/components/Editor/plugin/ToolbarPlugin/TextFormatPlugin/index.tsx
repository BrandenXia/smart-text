import { useAtom } from "jotai";
import { FormatIconMap, formatStatesAtom, TextFormats } from "./formats.ts";
import type { FormatStatesType } from "./formats.ts";
import { useCallback, useEffect } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";

const LowPriority = 1;

const TextFormatPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [formatStates, setFormatStates] = useAtom(formatStatesAtom);

  const updateStates = useCallback(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;
    setFormatStates(
      TextFormats.reduce(
        (acc, format) => ({ ...acc, [format]: selection.hasFormat(format) }),
        {} as FormatStatesType,
      ),
    );
  }, [setFormatStates]);

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) =>
          editorState.read(() => updateStates()),
        ),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateStates();
            return false;
          },
          LowPriority,
        ),
      ),
    [editor, updateStates],
  );

  return TextFormats.map((format, index) => (
    <button
      key={index}
      onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)}
    >
      <div className={FormatIconMap[format]} />
    </button>
  ));
};

export default TextFormatPlugin;
