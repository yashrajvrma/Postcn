// @ts-nocheck

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

export const ParamsTab = ({ params, onChange }) => {
  const addParam = () => {
    onChange([
      ...params,
      { key: "", value: "", description: "", enabled: true },
    ]);
  };

  const updateParam = (index, field, value) => {
    const newParams = [...params];
    newParams[index][field] = value;
    onChange(newParams);
  };

  const deleteParam = (index) => {
    onChange(params.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 overflow-auto ">
      <div className="px-4 py-3 border-b ">
        <h3 className="text-sm font-medium ">Query Params</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className=" sticky top-0">
            <tr className="border-b ">
              <th className="w-10 px-4 py-2"></th>
              <th className="text-left px-4 py-2 text-xs  font-normal">Key</th>
              <th className="text-left px-4 py-2 text-xs  font-normal">
                Value
              </th>
              <th className="text-left px-4 py-2 text-xs  font-normal">
                Description
              </th>
              <th className="w-32 text-right px-4 py-2 text-xs  font-normal">
                <button className=" hover:">Bulk Edit</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {params.map((param, index) => (
              <tr key={index}>
                <td className="px-4 py-2">
                  {/* <Input
                    type="checkbox"
                    checked={param.enabled}
                    onChange={(e) =>
                      updateParam(index, "enabled", e.target.checked)
                    }
                    className="w-4 h-4   rounded"
                  /> */}
                  <Checkbox
                    checked={param.enabled}
                    onChange={(e) =>
                      updateParam(index, "enabled", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                </td>
                <td className="px-4 py-2">
                  <Input
                    type="text"
                    value={param.key}
                    onChange={(e) => updateParam(index, "key", e.target.value)}
                    placeholder="Key"
                    className="w-full px-2 py-1 text-sm  bg-transparent focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2">
                  <Input
                    type="text"
                    value={param.value}
                    onChange={(e) =>
                      updateParam(index, "value", e.target.value)
                    }
                    placeholder="Value"
                    className="w-full px-2 py-1 text-sm  bg-transparent focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2">
                  <Input
                    type="text"
                    value={param.description}
                    onChange={(e) =>
                      updateParam(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="w-full px-2 py-1 text-sm focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => deleteParam(index)}
                    className=" hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2">
                <Input
                  type="text"
                  placeholder="Key"
                  className="w-full px-2 py-1 text-sm focus:outline-none"
                  onFocus={addParam}
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  type="text"
                  placeholder="Value"
                  className="w-full px-2 py-1 text-sm focus:outline-none"
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  type="text"
                  placeholder="Description"
                  className="w-full px-2 py-1 text-sm focus:outline-none"
                />
              </td>
              <td className="px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
