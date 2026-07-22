import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../../components/ui/sidebar";
import {
  FileText,
  LogOut,
  PlusCircle,
  Settings,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import useSidebarStore from "../../store/useSidebarStore";

const menuItems = [
  {
    name: "Dashboard",
    icon: FileText,
    navigationPath: "dashboard"
  },
  {
    name: "My Forms",
    icon: FileText,
    navigationPath: "my-forms"
  },
  {
    name: "Create Form",
    icon: PlusCircle,
    navigationPath: "create-form"
  },
];

export function AppSidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { menu, setMenu } = useSidebarStore();

  if (!user) {
  return <Navigate to="/login" replace />;
}

  return (
    <Sidebar className="h-screen border-r bg-white">
      <SidebarHeader className="border-b px-4 py-4">
        <div className="flex items-center justify-center rounded-xl py-3">
          <h1 className="text-2xl font-bold tracking-wide">
            Form Circuit
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${menu === item.navigationPath
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
                  }`}
                onClick={() => setMenu(item.navigationPath as any)}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 border-t pt-4">
          <button className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 cursor-pointer text-sm font-medium text-slate-700 transition ${menu === "settings"
            ? "bg-blue-600 text-white shadow-md"
            : "text-slate-700 hover:bg-slate-100"
            }`}
            onClick={() => setMenu("settings")} >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t bg-slate-50 p-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 rounded-xl p-2">
            <img
              src={user.picture}
              alt={user.username}
              className="h-11 w-11 rounded-full border object-cover"
            />

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold">
                {user.username}
              </h3>

              <p className="truncate text-xs text-slate-500">
                {user.email}
              </p>
            </div>
          </DropdownMenuTrigger >
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="cursor-pointer text-red-600 data-highlighted:bg-red-50 data-highlighted:text-red-700"
              >
                <LogOut className="size-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}