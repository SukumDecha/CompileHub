export type LanguageOptionType = {
  language: string;
  version: string;
  aliases: string[];
  runtime?: string;
};

export type CodeSnippetType = {
  [key: string]: string;
};

export type PistonRequestType = {
  language: string;
  version: string;
  files: { [key: string]: string }[];
};
