import { Loader2, AlertCircle } from "lucide-react";
import SubmitedForUi from "./SubmitedForUi";
import ResponseForm from "./ResponseForm";
import NotAcceptingResponses from "./NotAcceptingResponses";
import useSubmitFormStore from "../../../store/useSubmitFormStore";

const Form = ({ formId }: { formId: string }) => {
  const { form, loader, submited, gettingFormError } = useSubmitFormStore();

  return (
    <>
      {form && (
        <>
          {loader ? (
            <div className="flex h-[80vh] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2
                  className="animate-spin text-blue-600"
                  size={44}
                />
                <p className="text-sm text-slate-500">
                  Loading form...
                </p>
              </div>
            </div>
          ) : gettingFormError ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
              <div className="mb-4 flex justify-center">
                <AlertCircle
                  size={40}
                  className="text-red-500"
                />
              </div>

              <h2 className="mb-2 text-xl font-semibold text-red-600">
                Something went wrong
              </h2>

              <p className="text-slate-600">
                Error loading form. Please try again later.
              </p>
            </div>
          ) : (
            <>
              {form.disabled ? (
                <NotAcceptingResponses />
              ) : (
                <>
                  {submited ? (
                    <SubmitedForUi />
                  ) : (
                    <>
                      {/* Form Header */}
                      <div className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <div className="h-3 bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600" />

                        <div className="p-8">
                          <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                            {form.title}
                          </h1>

                          {form.description && (
                            <p className="text-base leading-relaxed text-slate-600">
                              {form.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <ResponseForm formId={formId} />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Form;