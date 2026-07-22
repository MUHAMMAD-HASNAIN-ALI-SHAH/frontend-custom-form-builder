import AddQuestionButton from "./AddQuestionButton"
import CreateFormQuestions from "./CreateFormQuestions"
import FormHeader from "./Formheader"

const CreateFormMain = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-start gap-4 bg-slate-100 px-4 py-6">
      <FormHeader />
      <CreateFormQuestions />
      <AddQuestionButton />
    </div>
  )
}

export default CreateFormMain
