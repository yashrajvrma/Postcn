// @ts-nocheck

"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView, EditorState } from "@codemirror/view";
// import * as themes from "@uiw/codemirror-themes-all";
import { useState, useEffect, useCallback, useRef } from "react";
import { xcodeDark, xcodeLight } from "@uiw/codemirror-theme-xcode";
export * from "@uiw/codemirror-theme-xcode";

const languageExtensions = {
  js: javascript(),
};

const getLanguageExtension = (filename: string) => {
  //   const extension = filename.split(".").pop();
  //   return languageExtensions[extension || ""] || javascript();
  return javascript();
};

const CodeEditor = ({ filename = "example.js", content }) => {
  const [value, setValue] = useState(content);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current?.view) {
      const currentValue = editorRef.current.view.state.doc.toString();
      if (currentValue !== content) {
        editorRef.current.view.dispatch({
          changes: { from: 0, to: currentValue.length, insert: content },
        });
        setValue(content);
      }
    }
  }, [content]);

  const handleChange = (val) => setValue(val);

  return (
    <CodeMirror
      ref={editorRef}
      value={value}
      extensions={[getLanguageExtension(filename), EditorView.lineWrapping]}
      theme={xcodeLight}
      onChange={handleChange}
      height="600px"
      editable={false}
    />
  );
};

export default CodeEditor;
