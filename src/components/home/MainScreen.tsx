import useSidebarStore from "../../store/useSidebarStore";
import CreateFormHeader from "./create-form/CreateFormHeader";
import CreateFormMain from "./create-form/CreateFormMain";

const MainScreen = () => {
    const { menu } = useSidebarStore();
    return (
        <div className="flex h-screen w-full">
            {menu === "create-form" && (
                (
            <div className="flex h-screen w-full flex-col items-center justify-start gap-4 bg-slate-100">
                <CreateFormHeader />
                <CreateFormMain />
            </div>
            )
            )}
        </div>
    )
}

export default MainScreen
