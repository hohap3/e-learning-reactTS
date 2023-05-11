import { FormControl } from "@mui/base";
import { FormHelperText, TextField } from "@mui/material";
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
}

function TextAreaField({
  name,
  control,
  label,
  placeholder,
  ...restProps
}: Props) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid },
    formState: { errors },
  } = useController({ name, control });

  return (
    <div className="mb-4">
      <FormControl error={invalid}>
        <textarea
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{
            width: "100%",
            WebkitBoxSizing: "border-box",
            boxSizing: "border-box",
            MozBoxSizing: "border-box",
            padding: "1rem",
            borderRadius: "4px",
            border: invalid ? "thin solid red" : "thin solid #dbdbdb",
            resize: "none",
          }}
          rows={10}
          placeholder={placeholder}
          {...restProps}
        />
        {invalid && (
          <FormHelperText
            error={invalid}
          >{`${errors[name]?.message}`}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}

export default TextAreaField;
