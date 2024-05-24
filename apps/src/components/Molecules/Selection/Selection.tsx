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

export function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>General Content</SelectLabel>
          <SelectItem value="gmt">General Knowledge</SelectItem>
          <SelectItem value="cet">Mental consultant</SelectItem>
          <SelectItem value="eet">Technology</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Education</SelectLabel>
          <SelectItem value="est">Mathematic</SelectItem>
          <SelectItem value="cst">Physical</SelectItem>
          <SelectItem value="mst">Biology</SelectItem>
          <SelectItem value="pst">Chemistry</SelectItem>
          <SelectItem value="akst">Writing</SelectItem>
          <SelectItem value="hst">History</SelectItem>
          <SelectItem value="su">English</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
