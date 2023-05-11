import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import React, { InputHTMLAttributes, ReactNode } from "react";
import { Control, useController } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: ReactNode;
}

function CheckboxField({ name, label, control, ...restProps }: Props) {
  const {
    field: { value, onChange },
    fieldState: { invalid },
    formState: { errors },
  } = useController({ name, control });

  return (
    <div className="mb-4">
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={value} onChange={onChange} />}
          label={label}
        />
        {invalid && (
          <FormHelperText
            error={invalid}
          >{`${errors[name]?.message}`}</FormHelperText>
        )}
      </FormGroup>
    </div>
  );
}

export default CheckboxField;
