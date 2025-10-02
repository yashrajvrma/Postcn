"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface JsonCodeBlockProps {
  data: any;
  filename?: string;
  className?: string;
}

interface JsonNodeProps {
  data: any;
  depth: number;
  isLast: boolean;
  parentKey?: string;
  lineNumber: { current: number };
}

function JsonNode({
  data,
  depth,
  isLast,
  parentKey,
  lineNumber,
}: JsonNodeProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const indent = "  ".repeat(depth);

  if (data === null) {
    return (
      <div className="flex font-mono text-sm">
        <span className="min-w-[3em] pr-4 text-right text-code-muted select-none">
          {lineNumber.current++}
        </span>
        <span className="whitespace-pre-wrap break-all">
          {indent}
          {parentKey && (
            <>
              <span className="text-[#9CDCFE]">"{parentKey}"</span>:{" "}
            </>
          )}
          <span className="text-[#569CD6]">null</span>
          {!isLast && ","}
        </span>
      </div>
    );
  }

  if (typeof data === "string") {
    return (
      <div className="flex font-mono text-sm">
        <span className="min-w-[3em] pr-4 text-right text-code-muted select-none">
          {lineNumber.current++}
        </span>
        <span className="whitespace-pre-wrap break-all">
          {indent}
          {parentKey && (
            <>
              <span className="text-[#9CDCFE]">"{parentKey}"</span>:{" "}
            </>
          )}
          <span className="text-[#CE9178]">"{data}"</span>
          {!isLast && ","}
        </span>
      </div>
    );
  }

  if (typeof data === "number") {
    return (
      <div className="flex font-mono text-sm">
        <span className="min-w-[3em] pr-4 text-right text-code-muted select-none">
          {lineNumber.current++}
        </span>
        <span className="whitespace-pre-wrap break-all">
          {indent}
          {parentKey && (
            <>
              <span className="text-[#9CDCFE]">"{parentKey}"</span>:{" "}
            </>
          )}
          <span className="text-[#B5CEA8]">{data}</span>
          {!isLast && ","}
        </span>
      </div>
    );
  }

  if (typeof data === "boolean") {
    return (
      <div className="flex font-mono text-sm">
        <span className="min-w-[3em] pr-4 text-right text-code-muted select-none">
          {lineNumber.current++}
        </span>
        <span className="whitespace-pre-wrap break-all">
          {indent}
          {parentKey && (
            <>
              <span className="text-[#9CDCFE]">"{parentKey}"</span>:{" "}
            </>
          )}
          <span className="text-[#569CD6]">{data.toString()}</span>
          {!isLast && ","}
        </span>
      </div>
    );
  }

  const isArray = Array.isArray(data);
  const entries = isArray
    ? data.map((item, i) => [i, item])
    : Object.entries(data);
  const openBracket = isArray ? "[" : "{";
  const closeBracket = isArray ? "]" : "}";

  if (entries.length === 0) {
    return (
      <div className="flex font-mono text-sm">
        <span className="min-w-[3em] pr-4 text-right text-code-muted select-none">
          {lineNumber.current++}
        </span>
        <span className="whitespace-pre-wrap break-all">
          {indent}
          {parentKey && (
            <>
              <span className="text-[#9CDCFE]">"{parentKey}"</span>:{" "}
            </>
          )}
          {openBracket}
          {closeBracket}
          {!isLast && ","}
        </span>
      </div>
    );
  }

  const startLine = lineNumber.current++;

  return (
    <>
      <div className="flex font-mono text-sm group">
        <span className="min-w-[3em] pr-4 text-right text-code-muted select-none">
          {startLine}
        </span>
        <span className="whitespace-pre-wrap break-all flex items-start">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="inline-flex items-center justify-center hover:bg-code-hover rounded mr-1 -ml-5 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {isCollapsed ? (
              <ChevronRight className="h-3 w-3 text-code-muted" />
            ) : (
              <ChevronDown className="h-3 w-3 text-code-muted" />
            )}
          </button>
          <span>
            {indent}
            {parentKey && (
              <>
                <span className="text-[#9CDCFE]">"{parentKey}"</span>:{" "}
              </>
            )}
            {openBracket}
            {isCollapsed && (
              <>
                <span className="text-code-muted">...</span>
                {closeBracket}
                {!isLast && ","}
              </>
            )}
          </span>
        </span>
      </div>

      {!isCollapsed && (
        <>
          {entries.map(([key, value], index) => (
            <JsonNode
              key={key}
              data={value}
              depth={depth + 1}
              isLast={index === entries.length - 1}
              parentKey={isArray ? undefined : String(key)}
              lineNumber={lineNumber}
            />
          ))}
          <div className="flex font-mono text-sm">
            <span className="min-w-[3em] pr-4 text-right text-code-muted select-none">
              {lineNumber.current++}
            </span>
            <span className="whitespace-pre-wrap break-all">
              {indent}
              {closeBracket}
              {!isLast && ","}
            </span>
          </div>
        </>
      )}
    </>
  );
}

export function JsonCodeBlock({
  data,
  filename,
  className,
}: JsonCodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const lineNumber = { current: 1 };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
          {filename && (
            <span className="text-sm font-mono text-code-foreground">
              {filename}
            </span>
          )}
          {!filename && (
            <span className="text-sm font-mono text-code-muted">json</span>
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
      <div className="p-4 overflow-x-auto">
        <JsonNode data={data} depth={0} isLast={true} lineNumber={lineNumber} />
      </div>
    </div>
  );
}
