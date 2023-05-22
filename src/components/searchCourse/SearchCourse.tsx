import { TextField } from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  onSearchChange: (searchValue: string) => void;
  placeholder: string;
  searchParamsValue: string;
}

function SearchComp({ onSearchChange, placeholder, searchParamsValue }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(() => {
    return `${
      searchParams.get(`${searchParamsValue}`)
        ? `${searchParams.get(`${searchParamsValue}`)}`
        : ""
    }`;
  });
  const timeoutRef = useRef<null | number>(null);

  // debounce search
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!onSearchChange) return;
    setSearchValue(e.target.value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onSearchChange(e.target.value);
    }, 500);
  }

  return (
    <div className="mb-8">
      <TextField
        value={searchValue}
        onChange={handleChange}
        placeholder={placeholder}
        size="small"
        fullWidth
      />
    </div>
  );
}

export default SearchComp;
