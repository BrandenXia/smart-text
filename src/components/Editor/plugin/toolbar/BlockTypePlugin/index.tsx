import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FC, useCallback, useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $isListNode, ListNode } from "@lexical/list";
import { $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils";
import {
  BlockType,
  BlockTypeToBlockNameIcon,
  FormatBlockTypeCommand,
} from "./blockType.ts";
import { $isHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import type { SelectProps, SelectItemProps } from "@radix-ui/react-select";
import cn from "@utils/cn.ts";

const BlockTypePlugin = (props: {
  selectRoot: FC<SelectProps & { classname?: string; "aria-label"?: string }>;
  selectOption: FC<SelectItemProps>;
}) => {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState<BlockType>("paragraph");

  const updateBlockType = useCallback(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;
    const anchorNode = selection.anchor.getNode();
    let element =
      anchorNode.getKey() === "root"
        ? anchorNode
        : $findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          });
    if (element === null) element = anchorNode.getTopLevelElementOrThrow();

    const elementKey = element.getKey();
    const elementDOM = editor.getElementByKey(elementKey);

    if (elementDOM === null) return;

    if ($isListNode(element)) {
      const parentList = $getNearestNodeOfType(anchorNode, ListNode);
      const type = parentList
        ? parentList.getListType()
        : element.getListType();
      setBlockType(type as BlockType);
    } else {
      const type = $isHeadingNode(element)
        ? element.getTag()
        : element.getType();
      if (type in BlockTypeToBlockNameIcon) setBlockType(type as BlockType);
    }
  }, [editor]);

  // TODO: this function doesn't work as expected when formatting a list
  const formatBlockType = useCallback(
    (type: BlockType) => {
      const command = FormatBlockTypeCommand[type];
      if (type !== blockType)
        editor.update(() => {
          const selection = $getSelection();
          $setBlocksType(selection, () => command());
        });
      else if (type !== "paragraph") formatBlockType("paragraph");
    },
    [blockType, editor],
  );

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) =>
          editorState.read(() => updateBlockType()),
        ),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateBlockType();
            return false;
          },
          COMMAND_PRIORITY_LOW,
        ),
      ),
    [editor, updateBlockType],
  );

  return (
    <props.selectRoot value={blockType} onValueChange={formatBlockType} aria-label="Format text type">
      {Object.entries(BlockTypeToBlockNameIcon).map(([type, [name, icon]]) => {
        return (
          <props.selectOption aria-label={name} key={type} value={type}>
            <span className="flex items-center justify-center gap-x-2">
              <span className={cn("size-6", icon)} />
              {name}
            </span>
          </props.selectOption>
        );
      })}
    </props.selectRoot>
  );
};

export default BlockTypePlugin;
