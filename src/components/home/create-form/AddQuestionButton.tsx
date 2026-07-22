import { Plus } from "lucide-react";
import useCreateFormStore from "../../../store/useCreateFormStore";

const AddQuestionButton = () => {
  const { addQuestion } = useCreateFormStore();

  return (
    <div className="flex justify-center pb-6">
      <button
        type="button"
        onClick={addQuestion}
        className="
          flex items-center gap-2
          rounded-2xl
          bg-blue-600
          px-6
          py-3
          font-semibold
          text-white
          shadow-sm
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:bg-blue-700
          hover:shadow-md
          active:scale-95
        "
      >
        <Plus size={18} />
        Add Question
      </button>
    </div>
  );
};

export default AddQuestionButton;