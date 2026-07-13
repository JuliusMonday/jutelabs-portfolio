import React, { useEffect } from 'react';
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

export default function BlockNoteEditor({ initialHTML, onChange }) {
  const editor = useCreateBlockNote();

  // Load initial content
  useEffect(() => {
    async function loadHTML() {
      if (initialHTML) {
        const blocks = await editor.tryParseHTMLToBlocks(initialHTML);
        editor.replaceBlocks(editor.document, blocks);
      }
    }
    loadHTML();
  }, [editor, initialHTML]);

  return (
    <BlockNoteView 
      editor={editor} 
      theme="light"
      onChange={async () => {
        const html = await editor.blocksToHTMLLossy(editor.document);
        onChange(html);
      }}
    />
  );
}
