import useCreateFormStore from "../../../store/useCreateFormStore";

const FormHeader = () => {
    const { formHeader, handleFormHeaderChange } = useCreateFormStore();
    return (
        <form className="mb-10 w-full rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <input
                name="title"
                type="text"
                value={formHeader.title}
                onChange={handleFormHeaderChange}
                placeholder="Untitled Form"
                className="
          w-full
          border-0
          border-b-2
          border-slate-200
          bg-transparent
          px-2
          py-4
          text-2xl
          font-bold
          text-slate-900
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-blue-500
          md:text-4xl
        "
            />

            <input
                name="description"
                type="text"
                value={formHeader.description}
                onChange={handleFormHeaderChange}
                placeholder="Add a description"
                className="
          mt-4
          w-full
          border-0
          border-b
          border-slate-200
          bg-transparent
          px-2
          py-3
          text-base
          text-slate-600
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-blue-500
          md:text-lg
        "
            />
        </form>
    );
};

export default FormHeader;