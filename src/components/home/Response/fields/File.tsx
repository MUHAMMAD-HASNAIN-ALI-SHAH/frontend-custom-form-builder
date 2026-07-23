import useSubmitFormStore from "../../../../store/useSubmitFormStore";

const File = ({
  getInputClasses,
  index,
}: {
  getInputClasses: (index: number) => string;
  index: number;
}) => {
  const { form, handleStringsInputChange } = useSubmitFormStore();
  return (
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
  );
};

export default File;
