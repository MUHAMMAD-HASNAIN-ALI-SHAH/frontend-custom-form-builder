import useSubmitFormStore from "../../../../store/useSubmitFormStore";

const DropDown = ({
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
  const { form, handleStringsInputChange } = useSubmitFormStore();
  return (
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
  );
};

export default DropDown;
