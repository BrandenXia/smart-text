import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { ButtonHTMLAttributes, FC, useEffect, useState } from "react";
import {
  CommandsIconMap,
  commandsInitialState,
  EditorCommandType,
  LexicalCommands,
} from "./commands.ts";
import cn from "@utils/cn.ts";

const LowPriority = 1;

const EditorCommandsPlugin = (props: {
  button: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
}) => {
  const [editor] = useLexicalComposerContext();
  const [commandsState, setCommandsState] = useState(commandsInitialState);

  useEffect(
    () =>
      mergeRegister(
        ...Object.entries(LexicalCommands).map(([command, [canCommand]]) =>
          editor.registerCommand(
            canCommand,
            (payload) => {
              setCommandsState((prev) => ({ ...prev, [command]: payload }));
              return false;
            },
            LowPriority,
          ),
        ),
      ),
    [editor, setCommandsState],
  );

  return Object.entries(LexicalCommands).map(
    ([command, [, commandType]], index) => {
      const enabled = commandsState[command as EditorCommandType];
      return (
        <props.button
          key={index}
          className="flex"
          disabled={!enabled}
          onClick={() => editor.dispatchCommand(commandType, undefined)}
        >
          <i
            className={cn(
              CommandsIconMap[command as EditorCommandType],
              "size-6",
            )}
          />
        </props.button>
      );
    },
  );
};

export default EditorCommandsPlugin;
