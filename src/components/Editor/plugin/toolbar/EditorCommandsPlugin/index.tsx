import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { useEffect, useState } from "react";
import {
  CommandsIconMap,
  commandsInitialState,
  EditorCommandType,
  LexicalCommands,
} from "./commands.ts";
import cn from "@utils/cn.ts";

const LowPriority = 1;

const EditorCommandsPlugin = ({ className = "" }: { className?: string }) => {
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
        <button
          key={index}
          className={cn(className, "flex")}
          disabled={!enabled}
          onClick={() => editor.dispatchCommand(commandType, undefined)}
        >
          <i
            className={cn(
              CommandsIconMap[command as EditorCommandType],
              "size-6",
            )}
          />
        </button>
      );
    },
  );
};

export default EditorCommandsPlugin;
