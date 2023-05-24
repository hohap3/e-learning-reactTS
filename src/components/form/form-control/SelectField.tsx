import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { SelectHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface Props<Type> extends SelectHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  variant?: "outlined" | "filled" | "standard";
  data: Type[];
}

function SelectField({
  name,
  control,
  label,
  variant,
  data,

  ...restProps
}: Props<any>) {
  const {
    field: { value, onChange, ref },
    fieldState: { invalid },
    formState: { errors },
  } = useController({ name, control });

  return (
    <div className="mb-6">
      <FormControl fullWidth error={invalid}>
        <InputLabel>{label}</InputLabel>
        <Select
          ref={ref}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={onChange}
          label={label}
          displayEmpty
          variant={variant}
          inputProps={restProps}
          name={name}
          style={{ width: "100%" }}
        >
          <MenuItem value="">Select one of these</MenuItem>
          {data.length > 0 &&
            data.map((item) => (
              <MenuItem
                value={item.maLoaiNguoiDung || item.key || item.maDanhMuc}
                key={item.maLoaiNguoiDung || item.key || item.maDanhMuc}
              >
                {item.tenLoaiNguoiDung || item.value || item.tenDanhMuc}
              </MenuItem>
            ))}
        </Select>

        <FormHelperText>
          {errors[name]?.message ? `${errors[name]?.message}` : ""}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default SelectField;
