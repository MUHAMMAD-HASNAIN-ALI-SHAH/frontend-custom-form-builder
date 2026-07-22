import useCreateFormStore from "../../../store/useCreateFormStore";
import { SidebarTrigger } from "../../ui/sidebar";

const CreateFormHeader = () => {
  const { onFormSubmit } = useCreateFormStore();
  return (
    <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between px-6 py-5">
        {/* Left Side */}
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <SidebarTrigger />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Create Form
            </h1>

            <p className="mt-1 text-sm text-gray-500 md:text-base">
              Build and customize your form by adding questions, options, and
              settings.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <button
          className="
            rounded-xl
            bg-blue-600
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            hover:bg-blue-700
            hover:shadow-md
            active:scale-95
            cursor-pointer
          "
          onClick={()=>onFormSubmit()}
        >
          Publish
        </button>
      </div>
    </header>
  );
};

export default CreateFormHeader;