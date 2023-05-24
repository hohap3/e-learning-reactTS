import { FormControl, FormHelperText, FormLabel, Rating } from "@mui/material";
import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { SyntheticEvent } from "react";
import { Control, useController } from "react-hook-form";

interface Props {
  name: string;
  control: Control<any>;
  label?: string;
}

function RatingField({ name, control, label }: Props) {
  const {
    field: { value, onChange },
    fieldState: { invalid },
    formState: { errors },
  } = useController({ name, control });

  function handleChange(e: ChangeEvent<any>): void {
    onChange(Number(e.target?.value));
  }

  return (
    <div className="mb-6">
      <FormControl error={invalid}>
        <FormLabel>{label}</FormLabel>

        <Rating name={name} value={value as number} onChange={handleChange} />

        <FormHelperText>
          {errors[name]?.message ? `${errors[name]?.message}` : ""}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default RatingField;
