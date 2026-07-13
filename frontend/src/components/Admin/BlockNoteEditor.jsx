import React, { useEffect } from 'react';
import { BlockNoteViewRaw as BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";

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
    <ErrorBoundary>
      <BlockNoteView 
        editor={editor} 
        onChange={async () => {
          const html = await editor.blocksToHTMLLossy(editor.document);
          onChange(html);
        }}
        theme="light"
      />
    </ErrorBoundary>
  );
}
