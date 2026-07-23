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
  const { form, handleStringsInputChange, handleCheckBoxChange } = useSubmitFormStore();
  return (
    <>
      {question.questionType === "text" && (
        <>
          <input
            type={question.questionType}
            onChange={(e) => handleStringsInputChange(e, index)}
            placeholder="Your answer"
            className={getInputClasses(index)}
          />
          {form.questions[index] && form.questions[index].error && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </>
      )}
      {question.questionType === "email" && (
        <>
          <input
            type={question.questionType}
            onChange={(e) => handleStringsInputChange(e, index)}
            placeholder="Your answer"
            className={getInputClasses(index)}
          />
          {form.questions[index] && form.questions[index].error && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </>
      )}
      {question.questionType === "number" && (
        <>
          <input
            type={question.questionType}
            onChange={(e) => handleStringsInputChange(e, index)}
            placeholder="Your answer"
            className={getInputClasses(index)}
          />
          {form.questions[index] && form.questions[index].error && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </>
      )}
      {question.questionType === "date" && (
        <>
          <input
            type={question.questionType}
            onChange={(e) => handleStringsInputChange(e, index)}
            placeholder="Your answer"
            className={getInputClasses(index)}
          />
          {form.questions[index] && form.questions[index].error && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </>
      )}
      {question.questionType === "time" && (
        <>
          <input
            type={question.questionType}
            onChange={(e) => handleStringsInputChange(e, index)}
            placeholder="Your answer"
            className={getInputClasses(index)}
          />
          {form.questions[index] && form.questions[index].error && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </>
      )}

      {question.questionType === "paragraph" && (
        <>
          <textarea
            onChange={(e) => handleStringsInputChange(e, index)}
            rows={4}
            placeholder="Your answer"
            className={getInputClasses(index)}
          />
          {form.questions[index] && form.questions[index].error && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </>
      )}

      {question.questionType === "file-upload" && (
        <>
          <input
            type="text"
            placeholder="File Upload Link"
            onChange={(e) => handleStringsInputChange(e, index)}
            className={getInputClasses(index)}
          />
          {form.questions[index] && form.questions[index].error && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </>
      )}

      {question.questionType === "multiple-choice" && (
        <>
          <div className="flex flex-col gap-2">
            {question.options?.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${question.index}`}
                  value={option}
                  onChange={(e) => handleStringsInputChange(e, index)}
                  className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
          {form.questions[index] && form.questions[index].error && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </>
      )}

      {question.questionType === "dropdown" && (
        <>
          <select
            defaultValue=""
            onChange={(e) => handleStringsInputChange(e, index)}
            className={getInputClasses(index)}
          >
            <option value="" disabled>
              -- Select an option --
            </option>
            {question.options?.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
          {form.questions[index] && form.questions[index].error && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </>
      )}

      {question.questionType === "linear-scale" &&
        question.options?.length === 2 && (
          <>
            <div className="flex items-center justify-between mt-2 mb-4">
              {Array.from(
                {
                  length:
                    parseInt(question.options[1]) - parseInt(question.options[0]) + 1,
                },
                (_, i) => {
                  const value = parseInt(question.options[0]) + i;
                  return (
                    <label
                      key={value}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${question.index}`}
                        value={value}
                        onChange={(e) => handleStringsInputChange(e, index)}
                        className={`form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500`}
                      />
                      <span className="text-gray-700">{value}</span>
                    </label>
                  );
                }
              )}
            </div>
            {form.questions[index] && form.questions[index].error && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </>
        )}

      {question.questionType === "check-box" && (
        <>
          <div className="flex flex-col gap-2">
            {question.options?.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckBoxChange(e, index)}
                  value={option}
                  className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                {option}
              </label>
            ))}
          </div>
          {form.questions[index] && form.questions[index].error && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </>
      )}
    </>
  );
};

export default Fields;
