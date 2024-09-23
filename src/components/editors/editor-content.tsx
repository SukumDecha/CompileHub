import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import Typography from "../typography";
import { Button } from "../ui/button";
import { PlayIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState, useTransition } from "react";
import { LanguageOptionType } from "@/types/type";
import { codeSnippets } from "@/constants/constants";
import { compileCode } from "@/actions/compile.action";
import { buildRequest } from "@/lib/utils";
import { Loader, TriangleAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useMediaQuery } from "react-responsive";

type IProps = {
  selectedLanguage: LanguageOptionType;
};

const EditorContents = ({ selectedLanguage }: IProps) => {
  const [sourceCode, setSourceCode] = useState("");
  const [isPending, startTransition] = useTransition();
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const { theme } = useTheme();
  const { toast } = useToast();

  const editorRef = useRef(null);
  const isMobile = useMediaQuery({
    query: "(max-width: 576px)",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleOnChange = (value: string | undefined) => {
    if (value) setSourceCode(value);
  };

  const executeCode = () => {
    startTransition(async () => {
      const requestData = buildRequest(selectedLanguage, sourceCode);

      try {
        const result = await compileCode(requestData);
        setOutput(result.run.output.split("\n"));
        toast({
          variant: "success",
          title: "Code executed successfully",
          description: "The code has been executed successfully",
        });
      } catch (error) {
        console.error(error);
        setError(true);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while executing the code",
          action: (
            <ToastAction altText="Try again" onClick={() => executeCode()}>
              Try again
            </ToastAction>
          ),
        });
      }
    });
  };

  useEffect(() => {
    setSourceCode(codeSnippets[selectedLanguage.language]);
  }, [selectedLanguage]);

  return (
    <ResizablePanelGroup
      direction={isMobile ? "vertical" : "horizontal"}
      className="w-full min-h-[500px] rounded-lg border dark:bg-slate-900 "
    >
      <ResizablePanel defaultSize={50} minSize={35}>
        <Editor
          theme={theme === "dark" ? "vs-dark" : "vs-light"}
          height="100vh"
          defaultLanguage={selectedLanguage.language}
          defaultValue={sourceCode}
          onMount={handleEditorDidMount}
          value={sourceCode}
          onChange={handleOnChange}
          language={selectedLanguage.language}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={35}>
        {/* HEADER */}
        <div className="space-y-3 min-h-screen">
          <div
            className="flex items-center justify-between
          bg-slate-400 dark:bg-slate-950 px-6 py-2"
          >
            <Typography variant="h3" text="Output" />

            <Button
              disabled={isPending}
              className="dark:bg-purple-600 text-slate-100 dark:hover:bg-purple-700 
            bg-slate-800 hover:bg-slate-900"
              onClick={executeCode}
            >
              {isPending ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  <span>Running Please wait...</span>
                </>
              ) : (
                <>
                  <PlayIcon className="w-4 h-4 mr-2" />
                  <span>Run</span>
                </>
              )}
            </Button>
          </div>
          <div className="px-6 space-y-2">
            {error ? (
              <div className="flex items-center space-x-2 text-red-500 border border-red-400 px-6 py-3">
                <TriangleAlert className="w-4 h-4 mr-2" />
                <Typography
                  variant="small"
                  text="Failed to compile code. Please try again!"
                />
              </div>
            ) : (
              output.map((item, index) => (
                <Typography key={index} variant="p" text={item} />
              ))
            )}
          </div>
        </div>

        {/* BODY */}
      </ResizablePanel>
      {/* <ResizableHandle /> */}
    </ResizablePanelGroup>
  );
};

export default EditorContents;
