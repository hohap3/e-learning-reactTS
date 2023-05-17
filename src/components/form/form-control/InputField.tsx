import { TextField } from "@mui/material";
import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  variant?: "outlined" | "filled" | "standard";
  label?: string;
  isAdmin?: boolean;
}

function InputField({
  name,
  control,
  label,
  variant,
  isAdmin,
  ...restProps
}: Props) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid },
    formState: { errors },
  } = useController({ name, control });

  return (
    <div className="mb-6">
      <TextField
        value={value}
        fullWidth
        size="small"
        inputRef={ref}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={restProps}
        label={label}
        error={invalid}
        helperText={errors[name]?.message && `${errors[name]?.message}`}
        variant={variant}
      />
    </div>
  );
}

export default InputField;
