import React from "react";

interface Props {
    className? : string,
    children: React.ReactNode
}
export const Card:React.FC<Props> = ({ className, children }) => (
  <div className={`rounded-lg border p-4 ${className}`}>{children}</div>
);

export const CardHeader:React.FC<Props> = ({ className, children }) => (
  <div className={`pb-2 ${className}`}>{children}</div>
);

export const CardTitle:React.FC<Props> = ({ className, children }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

export const CardContent:React.FC<Props> = ({ className, children }) => (
  <div className={className}>{children}</div>
);
