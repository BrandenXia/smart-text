import { TreeView } from "@lexical/react/LexicalTreeView";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const buttonClassName = "px-2 hover:text-primary hover:underline";

const TreeViewPlugin = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <TreeView
      editor={editor}
      treeTypeButtonClassName={buttonClassName}
      timeTravelButtonClassName={buttonClassName}
      timeTravelPanelButtonClassName={buttonClassName}
      timeTravelPanelClassName=""
      timeTravelPanelSliderClassName="h-2 bg-neutral-content rounded-lg appearance-none cursor-pointer"
      viewClassName="absolute bottom-0 right-0 z-10 p-5 text-sm"
    />
  );
};

export default TreeViewPlugin;
