import { FormHelperText, Input } from "@mui/material";
import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
}

function InputFooterField({ name, control, ...restProps }: Props) {
  const {
    field: { value, onChange, ref },
    fieldState: { invalid },
    formState: { errors },
  } = useController({ name, control });

  return (
    <div className="w-full">
      <Input
        inputRef={ref}
        fullWidth
        disableUnderline={true}
        error={invalid}
        name={name}
        value={value}
        onChange={onChange}
        inputProps={restProps}
      />
      {errors[name]?.message && (
        <p className="text-red-500 ">{`${errors[name]?.message}`}</p>
      )}
    </div>
  );
}

export default InputFooterField;
