import useSubmitFormStore from "../../../store/useSubmitFormStore";
import Fields from "./Fields";

const ResponseForm = ({ formId }: { formId: string }) => {
  const { form, onSubmit, onClear, submitFormLoader } = useSubmitFormStore();
  const getInputClasses = (index: number) => {
    return `w-full sm:w-[50%] border-0 border-b-2 ${form.questions[index]?.error ? "border-red-500" : "border-gray-300"
      } focus:border-blue-600 focus:outline-none py-2 px-1 text-gray-800 bg-transparent`;
  };
  return (
    <form className="w-full">
      {form.questions.map((question, index) => (
        <div
          key={index}
          className={`${question.error ? "border border-red-500" : ""
            } w-full mb-5 flex flex-col gap-2 justify-between px-7 rounded-lg bg-white py-7`}
        >
          <h1 className="font-semibold text-lg">{question.questionText}</h1>

          <Fields
            question={question}
            getInputClasses={getInputClasses}
            index={index}
          />

          {question.required && (
            <p className="text-red-500 text-sm font-medium mt-1">This field is required</p>
          )}
        </div>
      ))}

      <div className="w-full flex justify-between items-center px-7 py-4 rounded-lg">
        <button
          disabled={submitFormLoader}
          onClick={(e) => onSubmit(e, formId)}
          className={`bg-blue-700 cursor-pointer px-3 py-1 text-white rounded-sm hover:bg-blue-800 ${submitFormLoader ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Submit
        </button>
        <button
          onClick={onClear}
          type="reset"
          className="bg-white text-black border px-3 py-1 rounded-sm border-gray-400 cursor-pointer hover:bg-white"
        >
          Clear Form
        </button>
      </div>
    </form>
  );
};

export default ResponseForm;
