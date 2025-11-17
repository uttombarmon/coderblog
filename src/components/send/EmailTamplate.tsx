import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  url: string;
}

export function EmailTemplate({ firstName, url }: EmailTemplateProps) {
  console.log(firstName, url);
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>
        Your email verify url:{" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          Verify
        </a>
      </p>
    </div>
  );
}
