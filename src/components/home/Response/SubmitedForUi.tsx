import { CheckCircle2 } from "lucide-react";
import useSubmitFormStore from "../../../store/useSubmitFormStore";

const SubmitedForUi = () => {
  const { form, anotherSubmit } = useSubmitFormStore();

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Top Accent */}
      <div className="h-3 bg-linear-to-r from-green-500 to-emerald-600" />

      <div className="p-8">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          {form.title}
        </h1>

        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2
                size={24}
                className="text-green-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-green-700">
                Response Submitted
              </h2>

              <p className="mt-2 text-sm text-green-600">
                Your response has been submitted successfully.
              </p>

              <button
                onClick={anotherSubmit}
                className="
                  mt-4
                  font-medium
                  text-blue-600
                  transition
                  hover:text-blue-700
                  hover:underline
                  cursor-pointer
                "
              >
                Submit another response
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitedForUi;