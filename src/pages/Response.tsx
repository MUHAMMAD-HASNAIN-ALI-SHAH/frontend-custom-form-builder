import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSubmitFormStore from "../store/useSubmitFormStore";
import Form from "../components/home/Response/Form";
import Footer from "../components/home/Response/Footer";

const Response = () => {
  const { formId } = useParams();

  if (!formId) {
    return <div className="text-center text-red-500">Form ID is missing</div>;
  }

  const { getTheForm } = useSubmitFormStore();
  useEffect(() => {
    getTheForm(formId!);
  }, [getTheForm, formId]); return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Form formId={formId} />
        <Footer />
      </div>
    </div>
  );
};

export default Response;
