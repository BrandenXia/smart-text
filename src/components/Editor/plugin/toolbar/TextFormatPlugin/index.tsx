import { FormatIconMap, formatInitialState, TextFormats } from "./formats.ts";
import type { FormatStatesType } from "./formats.ts";
import {
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import cn from "@utils/cn.ts";

const LowPriority = 1;

const TextFormatPlugin = (props: {
  toggleButton: FC<InputHTMLAttributes<HTMLInputElement>>;
}) => {
  const [editor] = useLexicalComposerContext();
  const [formatState, setFormatState] = useState(formatInitialState);

  const updateState = useCallback(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;
    setFormatState(
      TextFormats.reduce(
        (acc, format) => ({ ...acc, [format]: selection.hasFormat(format) }),
        {} as FormatStatesType,
      ),
    );
  }, [setFormatState]);

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) =>
          editorState.read(() => updateState()),
        ),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateState();
            return false;
          },
          LowPriority,
        ),
      ),
    [editor, updateState],
  );

  return TextFormats.map((format, index) => (
    <props.toggleButton
      key={index}
      id={format}
      checked={formatState[format]}
      onChange={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)}
    >
      <i className={cn(FormatIconMap[format], "size-6")} />
    </props.toggleButton>
  ));
};

export default TextFormatPlugin;
