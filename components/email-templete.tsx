import * as React from "react";

export const EmailTemplate = ({
  confirmationLink,
}: {
  confirmationLink: string;
}) => (
  <div>
    <h1>
      Click <a href={confirmationLink}>Here</a>
    </h1>
  </div>
);
