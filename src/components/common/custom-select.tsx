import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// This defines the structure of each option in the select
type SelectOption = {
  value: string;
  label: string;
};

// This defines the props that the CustomSelect component accepts
type CustomSelectProps = {
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
};

// This is the main component
const CustomSelect = ({
  defaultValue,
  placeholder = "Select an option",
  onChange,
  options,
}: CustomSelectProps) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;