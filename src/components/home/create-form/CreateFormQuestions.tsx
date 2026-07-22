import { Copy, Trash2 } from "lucide-react";
import LinearScale from "./categories/LinearScale";
import List from "./categories/List";
import useCreateFormStore from "../../../store/useCreateFormStore";

const CreateFormQuestions = () => {
  const {
    questions,
    handleQuestionInputChange,
    handleQuestionCategoryChange,
    handleRequiredChange,
    onDeleteQuestion,
    duplicateQuestion,
  } = useCreateFormStore();

  return (
    <div className="mx-auto max-w-5xl space-y-8 w-full">
      {questions.length > 0 &&
        questions.map((question) => (
          <div
            key={question.index}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-[0_8px_30px_rgb(0,0,0,0.05)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]
            "
          >
            {/* Left Gradient Border */}
            <div className="absolute left-0 top-0 h-full w-2 bg-linear-to-b from-blue-600 via-indigo-500 to-purple-600" />

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-md">
                  {question.index + 1}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Question {question.index + 1}
                  </h2>

                  <p className="text-sm text-slate-500">
                    Configure your question
                  </p>
                </div>
              </div>

              {/* Floating Actions */}
              <div className="flex items-center gap-2 opacity-100 transition-all lg:opacity-0 lg:group-hover:opacity-100">
                <button
                  onClick={() => duplicateQuestion(question.index)}
                  className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-100"
                >
                  <Copy size={18} />
                </button>

                <button
                  onClick={() => onDeleteQuestion(question.index)}
                  className="rounded-xl border border-red-200 bg-white p-2.5 text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Question Input + Type */}
            <div className="flex flex-col gap-4 lg:flex-row">
              <input
                type="text"
                name="question"
                value={question.questionText}
                onChange={(e) =>
                  handleQuestionInputChange(question.index, e)
                }
                placeholder="Type your question here..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-5
                  py-4
                  text-lg
                  font-medium
                  text-slate-800
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-100
                "
              />

              <select
                name="type"
                value={question.questionType}
                onChange={(e) =>
                  handleQuestionCategoryChange(question.index, e)
                }
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-4
                  font-medium
                  text-slate-700
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  lg:w-72
                "
              >
                <option value="text">Short Answer</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="paragraph">Paragraph</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="dropdown">Dropdown</option>
                <option value="check-box">Check Box</option>
                <option value="linear-scale">Linear Scale</option>
                <option value="date">Date</option>
                <option value="time">Time</option>
                <option value="file-upload">File Upload</option>
              </select>
            </div>

            {/* Question Options */}
            <div className="mt-6">
              {(question.questionType === "multiple-choice" ||
                question.questionType === "radio" ||
                question.questionType === "check-box" ||
                question.questionType === "dropdown") && (
                <List
                  index={question.index}
                  options={question.options}
                />
              )}

              {question.questionType === "linear-scale" && (
                <LinearScale
                  index={question.index}
                  options={question.options}
                />
              )}

              {question.questionType === "file-upload" && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-medium text-amber-700">
                    Uploaded files will be stored as file links.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-600">
                  Required
                </span>

                <button
                  onClick={() => handleRequiredChange(question.index)}
                  className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
                    question.required
                      ? "bg-linear-to-r from-blue-600 to-indigo-600"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${
                      question.required ? "left-8" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center">
                <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {question.questionType.replace("-", " ")}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CreateFormQuestions;