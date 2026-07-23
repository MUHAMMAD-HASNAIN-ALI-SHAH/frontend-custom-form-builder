import useSubmitFormStore from "../../../store/useSubmitFormStore";
import Fields from "./Fields";

const ResponseForm = ({ formId }: { formId: string }) => {
  const { form, onSubmit, onClear, submitFormLoader } =
    useSubmitFormStore();

  const getInputClasses = (index: number) => {
    return `
      w-full
      rounded-2xl
      border
      px-4
      py-3
      bg-slate-50
      text-slate-800
      outline-none
      transition-all
      duration-200
      ${
        form.questions[index]?.error
          ? "border-red-500 bg-red-50"
          : "border-slate-200"
      }
      focus:border-blue-500
      focus:bg-white
      focus:ring-4
      focus:ring-blue-100
    `;
  };

  return (
    <form className="w-full">
      {form.questions.map((question, index) => (
        <div
          key={index}
          className={`
            mb-6
            rounded-3xl
            border
            bg-white
            p-7
            shadow-sm
            transition-all
            hover:shadow-md
            ${
              question.error
                ? "border-red-400 bg-red-50/20"
                : "border-slate-200"
            }
          `}
        >
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-900">
              {question.questionText}
            </h2>

            {question.required && (
              <p className="mt-2 text-sm font-medium text-red-500">
                * Required
              </p>
            )}
          </div>

          <Fields
            question={question}
            getInputClasses={getInputClasses}
            index={index}
          />
        </div>
      ))}

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          disabled={submitFormLoader}
          onClick={(e) => onSubmit(e, formId)}
          className={`
            rounded-2xl
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
            shadow-sm
            transition-all
            hover:bg-blue-700
            hover:shadow-md
            active:scale-95
            ${
              submitFormLoader
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }
          `}
        >
          {submitFormLoader ? "Submitting..." : "Submit Form"}
        </button>

        <button
          onClick={onClear}
          type="reset"
          className="
            rounded-2xl
            border
            border-slate-300
            bg-white
            px-6
            py-3
            font-medium
            text-slate-700
            transition-all
            hover:bg-slate-100
            hover:shadow-sm
            cursor-pointer
          "
        >
          Clear Form
        </button>
      </div>
    </form>
  );
};

export default ResponseForm;