import useSubmitFormStore from "../../../store/useSubmitFormStore";

const Fields = ({
  question,
  getInputClasses,
  index,
}: {
  question: {
    index: number;
    questionType: string;
    questionText: string;
    required: boolean;
    options: string[];
  };
  getInputClasses: (index: number) => string;
  index: number;
}) => {
  const { form, handleStringsInputChange, handleCheckBoxChange } =
    useSubmitFormStore();

  return (
    <>
      {(question.questionType === "text" ||
        question.questionType === "email" ||
        question.questionType === "number" ||
        question.questionType === "date" ||
        question.questionType === "time") && (
        <input
          type={question.questionType}
          onChange={(e) => handleStringsInputChange(e, index)}
          placeholder="Your answer"
          className={getInputClasses(index)}
        />
      )}

      {question.questionType === "paragraph" && (
        <textarea
          onChange={(e) => handleStringsInputChange(e, index)}
          rows={5}
          placeholder="Your answer"
          className={`${getInputClasses(
            index
          )} resize-none min-h-35`}
        />
      )}

      {question.questionType === "file-upload" && (
        <input
          type="text"
          placeholder="Paste file link here..."
          onChange={(e) => handleStringsInputChange(e, index)}
          className={getInputClasses(index)}
        />
      )}

      {question.questionType === "multiple-choice" && (
        <div className="flex flex-col gap-3">
          {question.options?.map((option, optionIndex) => (
            <label
              key={optionIndex}
              className="
                flex items-center gap-3
                rounded-2xl
                border border-slate-200
                bg-white
                px-4 py-3
                cursor-pointer
                transition
                hover:border-blue-300
                hover:bg-blue-50/40
              "
            >
              <input
                type="radio"
                name={`question-${question.index}`}
                value={option}
                onChange={(e) => handleStringsInputChange(e, index)}
                className="h-4 w-4 text-blue-600"
              />
              <span className="font-medium text-slate-700">
                {option}
              </span>
            </label>
          ))}
        </div>
      )}

      {question.questionType === "dropdown" && (
        <select
          defaultValue=""
          onChange={(e) => handleStringsInputChange(e, index)}
          className={getInputClasses(index)}
        >
          <option value="" disabled>
            Select an option
          </option>

          {question.options?.map((option, optionIndex) => (
            <option key={optionIndex} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {question.questionType === "linear-scale" &&
        question.options?.length === 2 && (
          <>
            <div className="mt-4 flex flex-wrap gap-4 justify-center">
              {Array.from(
                {
                  length:
                    parseInt(question.options[1]) -
                      parseInt(question.options[0]) +
                    1,
                },
                (_, i) => {
                  const value = parseInt(question.options[0]) + i;

                  return (
                    <label
                      key={value}
                      className="
                        flex flex-col items-center gap-2
                        rounded-2xl
                        border border-slate-200
                        px-4 py-3
                        cursor-pointer
                        transition
                        hover:border-blue-300
                        hover:bg-blue-50/40
                      "
                    >
                      <input
                        type="radio"
                        name={`question-${question.index}`}
                        value={value}
                        onChange={(e) =>
                          handleStringsInputChange(e, index)
                        }
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="font-medium text-slate-700">
                        {value}
                      </span>
                    </label>
                  );
                }
              )}
            </div>

            {form.questions[index] &&
              form.questions[index].error && (
                <p className="mt-2 text-sm text-red-500">
                  This field is required
                </p>
              )}
          </>
        )}

      {question.questionType === "check-box" && (
        <div className="flex flex-col gap-3">
          {question.options?.map((option, optionIndex) => (
            <label
              key={optionIndex}
              className="
                flex items-center gap-3
                rounded-2xl
                border border-slate-200
                bg-white
                px-4 py-3
                cursor-pointer
                transition
                hover:border-blue-300
                hover:bg-blue-50/40
              "
            >
              <input
                type="checkbox"
                onChange={(e) => handleCheckBoxChange(e, index)}
                value={option}
                className="h-4 w-4 rounded text-blue-600"
              />

              <span className="font-medium text-slate-700">
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
    </>
  );
};

export default Fields;