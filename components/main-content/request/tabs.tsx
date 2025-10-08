// @ts-nocheck

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const RequestTabs = ({ activeTab, onTabChange, counters }) => {
  const tabs = [
    { id: "params", label: "Params", count: counters.params },
    { id: "authorization", label: "Authorization" },
    { id: "headers", label: "Headers", count: counters.headers },
    { id: "body", label: "Body" },
    { id: "scripts", label: "Scripts" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="flex items-center gap-1 px-4 py-2  border-b ">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-3 py-1.5 text-sm rounded ${
            activeTab === tab.id ? " " : " hover"
          }`}
        >
          {tab.label}
          {tab.count !== undefined && tab.count > 0 && (
            <span
              className={`ml-1.5 text-xs ${
                activeTab === tab.id ? "text-secondary" : ""
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}

      <button className="ml-auto text-sm text-blue-400 hover:text-blue-300">
        Cookies
      </button>
    </div>
  );
};

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
        <h3 className="text-sm font-medium">Query Params</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className=" sticky top-0">
            <tr className="border-b ">
              <th className="w-10 px-4 py-2"></th>
              <th className="text-left px-4 py-2 text-xs font-normal">Key</th>
              <th className="text-left px-4 py-2 text-xs font-normal">Value</th>
              <th className="text-left px-4 py-2 text-xs font-normal">
                Description
              </th>
              <th className="w-32 text-right px-4 py-2 text-xs font-normal">
                <button className="">Bulk Edit</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {params.map((param, index) => (
              <tr key={index} className="">
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
                    className="w-full px-2 py-1 text-sm bg-transparent focus:outline-none"
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
                    className="w-full px-2 py-1 text-sm bg-transparent focus:outline-none"
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
                    className="w-full px-2 py-1 text-sm  bg-transparent focus:outline-none"
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
            <tr className="">
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2">
                <Input
                  type="text"
                  placeholder="Key"
                  className="w-full px-2 py-1 text-sm  bg-transparent focus:outline-none"
                  onFocus={addParam}
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  type="text"
                  placeholder="Value"
                  className="w-full px-2 py-1 text-sm  bg-transparent focus:outline-none"
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  type="text"
                  placeholder="Description"
                  className="w-full px-2 py-1 text-sm  bg-transparent focus:outline-none"
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

// Authorization Tab
export const AuthorizationTab = ({ auth, onChange }) => {
  const authTypes = [
    "No Auth",
    "API Key",
    "Bearer Token",
    "Basic Auth",
    "OAuth 2.0",
    "Hawk Authentication",
    "AWS Signature",
    "NTLM Authentication",
  ];

  return (
    <div className="flex-1 overflow-auto ">
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            <tr className="border-b ">
              <td className="px-4 py-3 text-sm  w-48">Type</td>
              <td className="px-4 py-3">
                <select
                  value={auth.type}
                  onChange={(e) => onChange({ ...auth, type: e.target.value })}
                  className="w-full max-w-md px-3 py-1.5 bg-transparent border  rounded focus:outline-none text-sm"
                >
                  {authTypes.map((type) => (
                    <option key={type} value={type} className="">
                      {type}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            {auth.type === "Bearer Token" && (
              <tr className="border-b ">
                <td className="px-4 py-3 text-sm ">Token</td>
                <td className="px-4 py-3">
                  <Input
                    type="text"
                    value={auth.token || ""}
                    onChange={(e) =>
                      onChange({ ...auth, token: e.target.value })
                    }
                    placeholder="Enter your bearer token"
                    className="w-full max-w-2xl px-3 py-1.5 bg-transparent border rounded focus:outline-none"
                  />
                </td>
              </tr>
            )}

            {auth.type === "Basic Auth" && (
              <>
                <tr className="border-b ">
                  <td className="px-4 py-3 text-sm ">Username</td>
                  <td className="px-4 py-3">
                    <Input
                      type="text"
                      value={auth.username || ""}
                      onChange={(e) =>
                        onChange({ ...auth, username: e.target.value })
                      }
                      placeholder="Username"
                      className="w-full max-w-md px-3 py-1.5 bg-transparent border  rounded focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </td>
                </tr>
                <tr className="border-b ">
                  <td className="px-4 py-3 text-sm ">Password</td>
                  <td className="px-4 py-3">
                    <Input
                      type="password"
                      value={auth.password || ""}
                      onChange={(e) =>
                        onChange({ ...auth, password: e.target.value })
                      }
                      placeholder="Password"
                      className="w-full max-w-md px-3 py-1.5 bg-transparent border  rounded focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </td>
                </tr>
              </>
            )}

            {auth.type === "API Key" && (
              <>
                <tr className="border-b ">
                  <td className="px-4 py-3 text-sm ">Key</td>
                  <td className="px-4 py-3">
                    <Input
                      type="text"
                      value={auth.key || ""}
                      onChange={(e) =>
                        onChange({ ...auth, key: e.target.value })
                      }
                      placeholder="API Key name"
                      className="w-full max-w-md px-3 py-1.5 bg-transparent border  rounded focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </td>
                </tr>
                <tr className="border-b ">
                  <td className="px-4 py-3 text-sm ">Value</td>
                  <td className="px-4 py-3">
                    <Input
                      type="text"
                      value={auth.value || ""}
                      onChange={(e) =>
                        onChange({ ...auth, value: e.target.value })
                      }
                      placeholder="API Key value"
                      className="w-full max-w-2xl px-3 py-1.5 bg-transparent border  rounded focus:outline-none focus:border-blue-500"
                    />
                  </td>
                </tr>
                <tr className="border-b ">
                  <td className="px-4 py-3 text-sm ">Add to</td>
                  <td className="px-4 py-3">
                    <select
                      value={auth.addTo || "Header"}
                      onChange={(e) =>
                        onChange({ ...auth, addTo: e.target.value })
                      }
                      className="w-full max-w-md px-3 py-1.5 bg-transparent border  rounded focus:outline-none focus:border-blue-500 text-sm"
                    >
                      <option value="Header" className="">
                        Header
                      </option>
                      <option value="Query Params" className="">
                        Query Params
                      </option>
                    </select>
                  </td>
                </tr>
              </>
            )}

            {auth.type === "No Auth" && (
              <tr>
                <td colSpan="2" className="px-4 py-6">
                  <div className="p-4 /50 rounded border  max-w-2xl">
                    <p className="text-sm ">
                      This request does not use any authorization. The request
                      will be sent without any authorization headers.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Headers Tab
export const HeadersTab = ({ headers, onChange }) => {
  const addHeader = () => {
    onChange([
      ...headers,
      { key: "", value: "", description: "", enabled: true },
    ]);
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    onChange(newHeaders);
  };

  const deleteHeader = (index) => {
    onChange(headers.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 overflow-auto ">
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
                <button className=" hover">Bulk Edit</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {headers.map((header, index) => (
              <tr key={index} className="">
                <td className="px-4 py-2">
                  {/* <Input
                    type="checkbox"
                    checked={header.enabled}
                    onChange={(e) =>
                      updateHeader(index, "enabled", e.target.checked)
                    }
                    className="w-4 h-4 bg-red-400"
                  /> */}
                  <Checkbox
                    checked={header.enabled}
                    onChange={(e) =>
                      updateHeader(index, "enabled", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                </td>
                <td className="px-4 py-2">
                  <Input
                    type="text"
                    value={header.key}
                    onChange={(e) => updateHeader(index, "key", e.target.value)}
                    placeholder="Key"
                    className="w-full px-2 py-1 text-sm focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2">
                  <Input
                    type="text"
                    value={header.value}
                    onChange={(e) =>
                      updateHeader(index, "value", e.target.value)
                    }
                    placeholder="Value"
                    className="w-full px-2 py-1 text-sm focus:outline-none "
                  />
                </td>
                <td className="px-4 py-2">
                  <Input
                    type="text"
                    value={header.description}
                    onChange={(e) =>
                      updateHeader(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="w-full px-2 py-1 text-sm  bg-transparent focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => deleteHeader(index)}
                    className=" hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            <tr className="">
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2">
                <Input
                  type="text"
                  placeholder="Key"
                  className="w-full px-2 py-1 text-sm  bg-transparent focus:outline-none"
                  onFocus={addHeader}
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  type="text"
                  placeholder="Value"
                  className="w-full px-2 py-1 text-sm  bg-transparent focus:outline-none"
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  type="text"
                  placeholder="Description"
                  className="w-full px-2 py-1 text-sm  bg-transparent focus:outline-none"
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

// Body Tab
export const BodyTab = ({ body, onChange }) => {
  const bodyTypes = [
    { value: "none", label: "none" },
    { value: "form-data", label: "form-data" },
    { value: "x-www-form-urlencoded", label: "x-www-form-urlencoded" },
    { value: "raw", label: "raw" },
    { value: "binary", label: "binary" },
    { value: "GraphQL", label: "GraphQL" },
  ];
  const rawTypes = ["Text", "JSON", "JavaScript", "HTML", "XML"];

  const addFormField = () => {
    const newData = [
      ...(body.formData || []),
      { key: "", value: "", type: "text", enabled: true },
    ];
    onChange({ ...body, formData: newData });
  };

  const updateFormField = (index, field, value) => {
    const newData = [...body.formData];
    newData[index][field] = value;
    onChange({ ...body, formData: newData });
  };

  const deleteFormField = (index) => {
    onChange({
      ...body,
      formData: body.formData.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-4 py-3 border-b ">
        <RadioGroup
          value={body.type}
          onValueChange={(value) => onChange({ ...body, type: value })}
          className="flex gap-4"
        >
          {bodyTypes.map((type) => (
            <div key={type.value} className="flex items-center gap-2">
              <RadioGroupItem value={type.value} id={type.value} />
              <Label htmlFor={type.value} className="text-sm cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {body.type === "none" && (
        <div className="p-8 text-center">This request does not have a body</div>
      )}

      {body.type === "raw" && (
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-4 py-2 border-b ">
            <select
              value={body.rawType || "JSON"}
              onChange={(e) => onChange({ ...body, rawType: e.target.value })}
              className="px-2 py-1 text-sm border rounded focus:outline-none"
            >
              {rawTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={body.raw || ""}
            onChange={(e) => onChange({ ...body, raw: e.target.value })}
            placeholder="Enter request body"
            className="flex-1 p-4 focus:outline-none resize-none"
          />
        </div>
      )}

      {(body.type === "form-data" || body.type === "x-www-form-urlencoded") && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0">
              <tr className="border-b ">
                <th className="w-10 px-4 py-2"></th>
                <th className="text-left px-4 py-2 text-xs font-normal">Key</th>
                <th className="text-left px-4 py-2 text-xs font-normal">
                  Value
                </th>
                <th className="text-left px-4 py-2 text-xs font-normal">
                  Description
                </th>
                <th className="w-20 px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {(body.formData || []).map((field, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <Checkbox
                      checked={field.enabled}
                      onChange={(e) =>
                        updateFormField(index, "enabled", e.target.checked)
                      }
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="text"
                      value={field.key}
                      onChange={(e) =>
                        updateFormField(index, "key", e.target.value)
                      }
                      placeholder="Key"
                      className="w-full px-2 py-1 text-sm focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        updateFormField(index, "value", e.target.value)
                      }
                      placeholder="Value"
                      className="w-full px-2 py-1 text-sm focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="text"
                      value={field.description || ""}
                      onChange={(e) =>
                        updateFormField(index, "description", e.target.value)
                      }
                      placeholder="Description"
                      className="w-full px-2 py-1 text-sm bg-transparent focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => deleteFormField(index)}
                      className="hover:text-red-400"
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
                    className="w-full px-2 py-1 text-sm bg-transparent focus:outline-none"
                    onFocus={addFormField}
                  />
                </td>
                <td className="px-4 py-2">
                  <Input
                    type="text"
                    placeholder="Value"
                    className="w-full px-2 py-1 text-sm bg-transparent focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2">
                  <Input
                    type="text"
                    placeholder="Description"
                    className="w-full px-2 py-1 text-sm bg-transparent focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
