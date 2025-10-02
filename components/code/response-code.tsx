// "use client";
import { CodeBlock } from "@/components/code/code-block";
import { JsonCodeBlock } from "./json-code-block";
// import { useState } from "react";
// import {
//   CodeBlock,
//   CodeBlockHeader,
//   CodeBlockFiles,
//   CodeBlockFilename,
//   CodeBlockSelect,
//   CodeBlockSelectTrigger,
//   CodeBlockSelectValue,
//   CodeBlockSelectContent,
//   CodeBlockSelectItem,
//   CodeBlockCopyButton,
//   CodeBlockBody,
//   CodeBlockItem,
//   CodeBlockContent,
//   type BundledLanguage,
// } from "@/components/code/index";

const codeSnippets = [
  {
    language: "typescript",
    filename: "index.ts",
    code: `{
    "success": true,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFlcy5jb20iLCJpYXQiOjE3NTkzODI3MDQsImV4cCI6MTc1OTQ2OTEwNH0.Ln8xmBd1NFlaNgop9jTTCX8Oulr_wyEx4KOFgpHi15M",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFlcy5jb20iLCJpYXQiOjE3NTkzODI3MDQsImV4cCI6MTc1OTY0MTkwNH0.p97zc_hvCdNe1S9ZJQ_dOx7DaBLWDmcXQQlscJNFnPU",
        "role": "admin"
    },
    "message": "Login successful"
}`,
  },
  { language: "json", filename: "response.json", code: `/* JSON here */` },
];

const sampleCode = `{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dGVzdF9yZWZyZXNoX3Rva2Vu",
    "role": "admin"
  },
  "message": "Login successful"
}`;

const reactCode = `import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  )
}`;

export default function ResponseCode() {
  //   const [active, setActive] = useState<string>("typescript");

  return (
    // <CodeBlock
    //   data={codeSnippets}
    //   value={active}
    //   onValueChange={setActive}
    //   className="w-full"
    // >
    //   <CodeBlockHeader className="justify-between">
    //     <CodeBlockFiles>
    //       {(item) => (
    //         <CodeBlockFilename key={item.language} value={item.language}>
    //           {item.filename}
    //         </CodeBlockFilename>
    //       )}
    //     </CodeBlockFiles>

    //     <div className="flex items-center gap-2">
    //       <CodeBlockSelect>
    //         <CodeBlockSelectTrigger>
    //           <CodeBlockSelectValue placeholder="Select file" />
    //         </CodeBlockSelectTrigger>
    //         <CodeBlockSelectContent>
    //           {(item) => (
    //             <CodeBlockSelectItem key={item.language} value={item.language}>
    //               {item.filename}
    //             </CodeBlockSelectItem>
    //           )}
    //         </CodeBlockSelectContent>
    //       </CodeBlockSelect>
    //       <CodeBlockCopyButton />
    //     </div>
    //   </CodeBlockHeader>

    //   <CodeBlockBody>
    //     {(item) => (
    //       <CodeBlockItem key={item.language} value={item.language}>
    //         <CodeBlockContent
    //           language={item.language as BundledLanguage}
    //           syntaxHighlighting
    //         >
    //           {item.code}
    //         </CodeBlockContent>
    //       </CodeBlockItem>
    //     )}
    //   </CodeBlockBody>
    // </CodeBlock>
    <div>
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Nested JSON Example
        </h2>
        <JsonCodeBlock
          data={{
            user: {
              id: 123,
              name: "John Doe",
              email: "john@example.com",
              settings: {
                theme: "dark",
                notifications: true,
                privacy: {
                  showEmail: false,
                  showProfile: true,
                },
              },
              posts: [
                { id: 1, title: "First Post", likes: 42 },
                { id: 2, title: "Second Post", likes: 128 },
              ],
            },
          }}
          filename="user-data.json"
        />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          JSON Response
        </h2>
        <CodeBlock
          code={sampleCode}
          language="json"
          filename="response.json"
          wrapLines={true}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          React Component
        </h2>
        <CodeBlock
          code={reactCode}
          language="tsx"
          filename="form.tsx"
          collapsible={true}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Collapsible Code
        </h2>
        <CodeBlock
          code={reactCode}
          language="typescript"
          collapsible={true}
          defaultCollapsed={true}
          maxHeight="300px"
        />
      </div>
    </div>
  );
}
