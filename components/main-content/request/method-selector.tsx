// "use client";

// import { ChevronDown } from "lucide-react";
// import { useState } from "react";

// // Method Selector Component
// export const MethodSelector = ({
//   method,
//   onChange,
// }: {
//   method: any;
//   onChange: (m: any) => void;
// }) => {
//   const methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center gap-2 px-3 py-2  text-secondary font-medium text-sm rounded-l border-r  hover:"
//       >
//         {method}
//         <ChevronDown className="w-3 h-3" />
//       </button>

//       {isOpen && (
//         <div className="absolute top-full left-0 mt-1  border  rounded shadow-lg z-10">
//           {methods.map((m: any) => (
//             <button
//               key={m}
//               onClick={() => {
//                 onChange(m);
//                 setIsOpen(false);
//               }}
//               className="block w-full px-4 py-2 text-left text-sm  hover:"
//             >
//               {m}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Method Selector Component
export const MethodSelector = ({
  method,
  onChange,
}: {
  method: string;
  onChange: (m: string) => void;
}) => {
  const methods = ["GET", "POST", "PUT", "DELETE"];

  return (
    <Select value={method} onValueChange={onChange}>
      <SelectTrigger className="w-[110px] text-secondary font-semibold border-r rounded-l">
        <SelectValue placeholder="Method" />
      </SelectTrigger>
      <SelectContent>
        {methods.map((m) => (
          <SelectItem key={m} value={m}>
            {m}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
