import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  LexicalCommand,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { atom } from "jotai";

type EditorCommandType = "undo" | "redo";

const LexicalCommands: Record<
  EditorCommandType,
  [LexicalCommand<boolean>, LexicalCommand<undefined>]
> = {
  undo: [CAN_UNDO_COMMAND, UNDO_COMMAND],
  redo: [CAN_REDO_COMMAND, REDO_COMMAND],
};

const CommandsIconMap: Record<EditorCommandType, string> = {
  undo: "i-ph-arrow-counter-clockwise-duotone",
  redo: "i-ph-arrow-clockwise-duotone",
};

type CommandsStateType = Record<EditorCommandType, boolean>;

const commandsStateAtom = atom<CommandsStateType>(
  Object.keys(LexicalCommands).reduce(
    (acc, command) => ({ ...acc, [command]: false }),
    {} as Record<EditorCommandType, boolean>,
  ),
);

export { CommandsIconMap, LexicalCommands, commandsStateAtom };
export type { EditorCommandType, CommandsStateType };
