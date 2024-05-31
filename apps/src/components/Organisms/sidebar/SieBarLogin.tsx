import SideLeftLogin from "@/components/Molecules/SideLeft/SideLeftLogin";

export const SideBarLogin = () => {
  return (
    <>
      <aside className="fixed  top-5 left-5 z-30 w-62 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 lg:translate-x-0 max-lg:border-hidden flex flex-col gap-4 max-sm:hidden">
        <SideLeftLogin />
      </aside>
    </>
  );
};
