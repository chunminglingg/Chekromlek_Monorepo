import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface SelectScrollableProps {
  onValueChange: (value: string) => void;
}

export function SelectScrollable({ onValueChange }: SelectScrollableProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[280px] focus:outline-none">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>General Content</SelectLabel>
          <SelectItem value="General Knowledge">General Knowledge</SelectItem>
          <SelectItem value="Mental Consultant">Mental Consultant</SelectItem>
          <SelectItem value="Technology">Technology</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Education</SelectLabel>
          <SelectItem value="Mathematic">Mathematic</SelectItem>
          <SelectItem value="Physical">Physical</SelectItem>
          <SelectItem value="Biology">Biology</SelectItem>
          <SelectItem value="Chemistry">Chemistry</SelectItem>
          <SelectItem value="Writing">Writing</SelectItem>
          <SelectItem value="History">History</SelectItem>
          <SelectItem value="English">English</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
