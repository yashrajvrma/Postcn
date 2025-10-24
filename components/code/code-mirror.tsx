"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "@codemirror/view";
import { xcodeDark, xcodeLight } from "@uiw/codemirror-theme-xcode";

const CodeEditor = ({ content }: { content: string }) => {
  const [value, setValue] = useState(content);
  const editorRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    if (editorRef.current?.view) {
      // @ts-ignore
      const currentValue = editorRef.current.view.state.doc.toString();
      if (currentValue !== content) {
        // @ts-ignore
        editorRef.current.view.dispatch({
          changes: { from: 0, to: currentValue.length, insert: content },
        });
        setValue(content);
      }
    }
  }, [content]);

  return (
    <CodeMirror
      ref={editorRef}
      value={value}
      extensions={[json(), EditorView.lineWrapping]}
      theme={xcodeDark}
      height="600px"
      editable={false}
      // className="h-[100vh]"
    />
  );
};

export default CodeEditor;
