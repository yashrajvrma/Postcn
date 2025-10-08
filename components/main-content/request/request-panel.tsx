"use client";

import { useState } from "react";
import { ParamsTab } from "./params-tab";
import { RequestHeader } from "./request-header";
import { AuthorizationTab, HeadersTab, BodyTab, RequestTabs } from "./tabs";
import { UrlInput } from "./url-input";

export default function RequestPanel() {
  const [url, setUrl] = useState(
    "https://www.freelancer.com/api/projects/0.1/self/insights/bids?offset=0&webapp=1&compact=true&new_errors=true&new_pools=true"
  );
  const [method, setMethod] = useState("GET");
  const [activeTab, setActiveTab] = useState("headers");

  const [params, setParams] = useState([
    { key: "offset", value: "0", description: "", enabled: true },
    { key: "webapp", value: "1", description: "", enabled: true },
  ]);

  const [auth, setAuth] = useState({
    type: "Bearer Token",
    token: "",
  });

  const [headers, setHeaders] = useState([
    {
      key: "Accept",
      value: "application/json, text/plain, */*",
      description: "",
      enabled: true,
    },
    {
      key: "freelancer-app-locale",
      value: "en-IN",
      description: "",
      enabled: true,
    },
    {
      key: "freelancer-auth-v2",
      value: "86637790;VzAhqKaupkc11PvzjIYcNyj14S9MdR6K7ElRQjdQXZ8=",
      description: "",
      enabled: true,
    },
    {
      key: "freelancer-app-version",
      value: "gitRevision=37cf5c3, buildTimestampInSeconds=1758490616",
      description: "",
      enabled: true,
    },
    {
      key: "Referer",
      value: "https://www.freelancer.in/",
      description: "",
      enabled: true,
    },
    {
      key: "freelancer-app-is-installed",
      value: "false",
      description: "",
      enabled: true,
    },
    {
      key: "freelancer-app-is-native",
      value: "false",
      description: "",
      enabled: true,
    },
    {
      key: "User-Agent",
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      description: "",
      enabled: true,
    },
  ]);

  const [body, setBody] = useState({
    type: "none",
    raw: "",
    rawType: "JSON",
    formData: [],
  });

  const counters = {
    params: params.filter((p) => p.enabled).length,
    headers: headers.filter((h) => h.enabled).length,
  };

  const handleSend = () => {
    const requestData = {
      url,
      method,
      headers: headers.filter((h) => h.enabled),
      params: params.filter((p) => p.enabled),
      auth,
      body: body.type !== "none" ? body : null,
    };
    console.log("Sending request...", requestData);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "params":
        return <ParamsTab params={params} onChange={setParams} />;
      case "authorization":
        return <AuthorizationTab auth={auth} onChange={setAuth} />;
      case "headers":
        return <HeadersTab headers={headers} onChange={setHeaders} />;
      case "body":
        return <BodyTab body={body} onChange={setBody} />;
      case "scripts":
        return (
          <div className="flex-1 flex items-center justify-center ">
            Scripts tab - Coming soon
          </div>
        );
      case "settings":
        return (
          <div className="flex-1 flex items-center justify-center ">
            Settings tab - Coming soon
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <RequestHeader />
      <UrlInput
        url={url}
        onUrlChange={setUrl}
        method={method}
        onMethodChange={setMethod}
        onSend={handleSend}
      />
      <RequestTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counters={counters}
      />
      {renderTabContent()}
    </div>
  );
}
