import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  LexicalCommand,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";

type EditorCommandType = "undo" | "redo";

const LexicalCommands: Record<
  EditorCommandType,
  [LexicalCommand<boolean>, LexicalCommand<undefined>]
> = {
  undo: [CAN_UNDO_COMMAND, UNDO_COMMAND],
  redo: [CAN_REDO_COMMAND, REDO_COMMAND],
};

const CommandsIconMap: Record<EditorCommandType, string> = {
  undo: "i-ph-arrow-counter-clockwise",
  redo: "i-ph-arrow-clockwise",
};

const commandsInitialState = Object.keys(LexicalCommands).reduce(
  (acc, command) => ({ ...acc, [command]: false }),
  {} as Record<EditorCommandType, boolean>,
);

export { CommandsIconMap, LexicalCommands, commandsInitialState };
export type { EditorCommandType };
