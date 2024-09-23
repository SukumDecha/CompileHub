"use client";

import EditorSelectLanguage from "./editor-select-language";
import ModeToggle from "../toggle-theme-button";
import Typography from "../typography";

import EditorContents from "./editor-content";
import { useState } from "react";
import { languageOptions } from "@/constants/constants";

const EditorCard = () => {
  const [currentLanguage, setLanguageOption] = useState(languageOptions[0]);

  return (
    <div className="min-h-screen dark:bg-slate-900 rounded-2xl shadow-2xl py-6 px-4 md:px-8">
      {/* EDITOR HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3">
        <Typography variant="h2" text="zCompiler" />

        <div className="flex items-center space-x-2 ">
          <ModeToggle />
          <EditorSelectLanguage
            handleLanguageChange={setLanguageOption}
            selectedLanguage={currentLanguage}
          />
        </div>
      </div>

      {/* EDITOR */}
      <div className="bg-slate-400 dark:bg-slate-950 p-3 rounded-2xl">
        <EditorContents selectedLanguage={currentLanguage} />
      </div>

      {/* OUTPUT */}
    </div>
  );
};

export default EditorCard;
