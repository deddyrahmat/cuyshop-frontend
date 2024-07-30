import React, { memo } from "react";

interface LabelProps {
  htmlFor: string;
  text: string;
  className: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, text, className }) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {text}
    </label>
  );
};

export default memo(Label);
