import dynamic from "next/dynamic";

const EditorCard = dynamic(() => import("@/components/editors/editor-card"), {
  ssr: false,
});

const Home = () => {
  return (
    <div className="dark:bg-slate-800 bg-slate-300 p-4 md:px-8">
      <EditorCard />
    </div>
  );
};

export default Home;
