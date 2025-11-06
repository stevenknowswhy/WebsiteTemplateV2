import * as React from "react";

type Props = {
  id: string;
  label: string;
  error?: string;
  children: (inputProps: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => React.ReactNode;
};

export function FormField({ id, label, error, children }: Props) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": errorId })}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}