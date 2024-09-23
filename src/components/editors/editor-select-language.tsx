"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languageOptions } from "@/constants/constants";
import { LanguageOptionType } from "@/types/type";

type IProps = {
  handleLanguageChange: (value: LanguageOptionType) => void;
  selectedLanguage: LanguageOptionType;
};

const EditorSelectLanguage = ({
  handleLanguageChange,
  selectedLanguage,
}: IProps) => {
  const onChange = (value: string) => {
    const selectedLanguage = languageOptions.find(
      (language) => language.language === value
    );
    if (selectedLanguage) {
      handleLanguageChange(selectedLanguage);
    }
  };

  return (
    <Select onValueChange={onChange} value={selectedLanguage.language}>
      <SelectTrigger
        className="w-[180px] dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900
      bg-slate-800 hover:bg-slate-900 text-slate-100 capitalize"
      >
        <SelectValue placeholder="Select Compile Languages" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Compile Languages</SelectLabel>
          {languageOptions.map((language) => (
            <SelectItem
              key={language.language}
              value={language.language}
              className="capitalize"
            >
              {language.language} ({language.version})
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default EditorSelectLanguage;
