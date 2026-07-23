import useSubmitFormStore from "../../../../store/useSubmitFormStore";

const Paragraph = ({
  getInputClasses,
  index,
}: {
  getInputClasses: (index: number) => string;
  index: number;
}) => {
  const { form, handleStringsInputChange } = useSubmitFormStore();
  return (
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
  );
};

export default Paragraph;
