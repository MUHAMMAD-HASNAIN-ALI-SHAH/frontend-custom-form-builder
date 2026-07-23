import useSubmitFormStore from "../../../../store/useSubmitFormStore";

const MultipleChoice = ({
  question,
  index,
}: {
  question: {
    index: number;
    questionType: string;
    questionText: string;
    required: boolean;
    options: string[];
  };
  index: number;
}) => {
  const { form, handleStringsInputChange } = useSubmitFormStore();
  return (
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
  );
};

export default MultipleChoice;
