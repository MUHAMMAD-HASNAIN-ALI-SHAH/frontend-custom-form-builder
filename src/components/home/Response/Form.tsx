import { Loader2 } from "lucide-react";
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
            <div className="w-full h-[80vh] flex items-center justify-center">
              <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
          ) : (
            <>
              {gettingFormError ? (
                <div className="text-red-500 text-center">
                  Error loading form. Please try again later.
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
                          <div className="w-full mb-5 flex flex-col gap-1 justify-between border-t-12 border-blue-800  px-5 py-2 rounded-lg bg-white">
                            <h1 className="text-2xl font-bold mb-4">
                              {form.title}
                            </h1>
                            <p className="text-gray-600 mb-6">
                              {form.description}
                            </p>
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
      )}
    </>
  );
};

export default Form;
