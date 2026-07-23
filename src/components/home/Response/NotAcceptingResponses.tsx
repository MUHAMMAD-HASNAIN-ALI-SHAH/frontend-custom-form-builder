import { Ban } from "lucide-react";
import useSubmitFormStore from "../../../store/useSubmitFormStore";

const NotAcceptingResponses = () => {
  const { form } = useSubmitFormStore();

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Top Accent */}
      <div className="h-3 bg-red-500" />

      <div className="p-8">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          {form.title}
        </h1>

        <div className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Ban className="text-red-600" size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-red-700">
              Responses Closed
            </h2>

            <p className="mt-1 text-sm text-red-600">
              This form is no longer accepting responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotAcceptingResponses;