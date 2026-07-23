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
  }, [getTheForm, formId]);  return (
    <div className="w-full bg-gray-300 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-4">
        <Form formId={formId} /> 
        <Footer />
      </div>
    </div>
  );
};

export default Response;
