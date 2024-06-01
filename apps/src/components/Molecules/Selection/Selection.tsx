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
      <SelectTrigger className="w-[280px] focus:outline-none">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>General Content</SelectLabel>
          <SelectItem value="gmk">General Knowledge</SelectItem>
          <SelectItem value="mtc">Mental consultant</SelectItem>
          <SelectItem value="tech">Technology</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Education</SelectLabel>
          <SelectItem value="math">Mathematic</SelectItem>
          <SelectItem value="phy">Physical</SelectItem>
          <SelectItem value="bio">Biology</SelectItem>
          <SelectItem value="chemi">Chemistry</SelectItem>
          <SelectItem value="writ">Writing</SelectItem>
          <SelectItem value="his">History</SelectItem>
          <SelectItem value="eng">English</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
