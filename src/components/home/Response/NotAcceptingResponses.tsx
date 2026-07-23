import useSubmitFormStore from "../../../store/useSubmitFormStore";

const NotAcceptingResponses = () => {
  const { form } = useSubmitFormStore();
  return (
    <>
      <div className="w-full mb-5 flex flex-col gap-3 justify-start items-start border-t-12 border-blue-800  px-5 py-2 rounded-lg bg-white">
        <h1 className="text-2xl font-bold">{form.title}</h1>
        <h1>Sorry not collecting response</h1>
      </div>
    </>
  );
}

export default NotAcceptingResponses
