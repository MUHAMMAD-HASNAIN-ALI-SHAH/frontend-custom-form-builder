import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/home/AppSidebar";
import MainScreen from "../components/home/MainScreen";

const Home = () => {

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <MainScreen />
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Home
