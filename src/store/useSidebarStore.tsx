import { create } from "zustand";

interface SidebarState {
    menu: "dashboard" | "my-forms" | "create-form" | "settings";
    setMenu: (menu: "dashboard" | "my-forms" | "create-form" | "settings") => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
    menu: "create-form",
    setMenu: (menu) => set({ menu }),
}));

export default useSidebarStore;
