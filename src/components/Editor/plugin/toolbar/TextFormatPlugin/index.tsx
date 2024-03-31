import { FormatIconMap, formatInitialState, TextFormats } from "./formats.ts";
import type { FormatStatesType } from "./formats.ts";
import { FC, useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import cn from "@utils/cn.ts";
import { ToolbarToggleItemProps } from "@radix-ui/react-toolbar";

const TextFormatPlugin = (props: {
  toggleItem: FC<ToolbarToggleItemProps>;
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
          COMMAND_PRIORITY_LOW,
        ),
      ),
    [editor, updateState],
  );

  return TextFormats.map((format, index) => (
    <props.toggleItem
      key={index}
      onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)}
      value={format}
      data-state={formatState[format] ? "on" : "off"}
    >
      <i className={cn(FormatIconMap[format], "size-6")} />
    </props.toggleItem>
  ));
};

export default TextFormatPlugin;
