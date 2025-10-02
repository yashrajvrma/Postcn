// "use client";

// import { ChevronDown, ChevronRight } from "lucide-react";
// import { type HTMLAttributes, useContext, useState } from "react";
// import { cn } from "@/lib/utils";
// import { CodeBlockContext } from "@/components/code/index";
// import {
//   codeBlockClassName,
//   lineHighlightClassNames,
//   lineDiffClassNames,
//   lineFocusedClassNames,
//   wordHighlightClassNames,
//   darkModeClassNames,
//   lineNumberClassNames,
// } from "@/components/code/index";

// export type CodeBlockItemProps = HTMLAttributes<HTMLDivElement> & {
//   value: string;
//   lineNumbers?: boolean;
// };

// export const CodeBlockItem = ({
//   children,
//   lineNumbers = true,
//   className,
//   value,
//   ...props
// }: CodeBlockItemProps) => {
//   // @ts-ignore
//   const { value: activeValue } = useContext(CodeBlockContext);

//   const [collapsed, setCollapsed] = useState(false);

//   if (value !== activeValue) {
//     return null;
//   }

//   return (
//     <div
//       className={cn(
//         "relative", // ensure we can absolutely position the toggle
//         codeBlockClassName,
//         lineHighlightClassNames,
//         lineDiffClassNames,
//         lineFocusedClassNames,
//         wordHighlightClassNames,
//         darkModeClassNames,
//         lineNumbers && lineNumberClassNames,
//         className
//       )}
//       {...props}
//     >
//       <button
//         type="button"
//         aria-label={collapsed ? "Expand code" : "Collapse code"}
//         aria-expanded={!collapsed}
//         onClick={() => setCollapsed((c) => !c)}
//         className="absolute right-2 top-2 z-10 inline-flex items-center justify-center rounded p-1 text-muted-foreground hover:bg-muted"
//       >
//         {collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
//       </button>

//       <div className={collapsed ? "hidden" : "block"}>{children}</div>
//     </div>
//   );
// };

"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  maxHeight?: string;
  wrapLines?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = true,
  collapsible = false,
  defaultCollapsed = false,
  maxHeight,
  wrapLines = true,
  className,
}: CodeBlockProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const customStyle = {
    margin: 0,
    padding: "1rem",
    background: "transparent",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    ...(maxHeight && !isCollapsed
      ? { maxHeight, overflowY: "auto" as const }
      : {}),
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-code-border bg-code-bg overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-code-border bg-code-header">
        <div className="flex items-center gap-2">
          {collapsible && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 hover:bg-code-hover"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-code-muted" />
              ) : (
                <ChevronDown className="h-4 w-4 text-code-muted" />
              )}
            </Button>
          )}
          {filename && (
            <span className="text-sm font-mono text-code-foreground">
              {filename}
            </span>
          )}
          {!filename && (
            <span className="text-sm font-mono text-code-muted">
              {language}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-code-hover"
          onClick={handleCopy}
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-code-muted" />
          )}
        </Button>
      </div>

      {/* Code Content */}
      {!isCollapsed && (
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={showLineNumbers}
            wrapLines={wrapLines}
            wrapLongLines={wrapLines}
            customStyle={customStyle}
            lineNumberStyle={{
              minWidth: "3em",
              paddingRight: "1em",
              color: "#6e7681",
              userSelect: "none",
            }}
            codeTagProps={{
              style: {
                fontFamily: "var(--font-mono), monospace",
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
