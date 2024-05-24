"use client"
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onSelect: (selectedGender: string) => void;
}

export function SelectSex({ onSelect } : Props ) {
  const handleGenderSelect = (selectedGender: string) => {
    onSelect(selectedGender);
  };

  return (
    <Select>
      <SelectTrigger className="w-full focus:outline-none">
        <SelectValue placeholder="Select a Gender" />
      </SelectTrigger>
      <SelectContent className="focus:outline-none">
        <SelectGroup>
          <SelectLabel>General Content</SelectLabel>
          <SelectItem value="male" onSelect={() => handleGenderSelect("male")}>
            Male
          </SelectItem>
          <SelectItem
            value="female"
            onSelect={() => handleGenderSelect("female")}
          >
            Female
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
