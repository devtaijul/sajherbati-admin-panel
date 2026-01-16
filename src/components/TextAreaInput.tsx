// *********************
// Role of the component: Text area input component that displays the text area input field
// Name of the component: TextAreaInput.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <InputWithLabel label="Category description"><TextAreaInput placeholder="Enter a category description..." rows={4} cols={50} /></InputWithLabel>
// Input parameters: { rows?: number; cols?: number; placeholder?: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; }
// Output: TextAreaInput component that displays the text area input field
// *********************

import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextAreaInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={`w-full h-40 py-2 bg-white border border-gray-700 outline-none
        dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary indent-2
        dark:focus:border-gray-600 focus:border-gray-400
        dark:hover:border-gray-600 hover:border-gray-400
        ${className ?? ""}`}
      />
    );
  }
);

TextAreaInput.displayName = "TextAreaInput";

export default TextAreaInput;
