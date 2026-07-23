import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";

interface Questions {
  index: number;
  questionType: string;
  questionText: string;
  required: boolean;
  options: string[];
  answer?: string[];
  error?: boolean;
}

interface Form {
  title: string;
  description: string;
  disabled: boolean;
  author: string;
  questions: Questions[];
  createdAt: string;
  updatedAt: string;
}

interface SubmitFormState {
  form: Form;
  submitFormLoader: boolean;
  submitFormError: boolean;
  submited: boolean;
  loader: boolean;
  gettingFormError: boolean;
  anotherSubmit: () => void;
  handleStringsInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number
  ) => void;
  handleCheckBoxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onSubmit: (e: any, formId: string) => void;
  onClear: () => void;
  getTheForm: (formId: string) => Promise<void>;
  reset: () => void;
}

const useSubmitFormStore = create<SubmitFormState>((set, get) => ({
  form: {
    title: "",
    description: "",
    author: "",
    disabled: false,
    questions: [],
    createdAt: "",
    updatedAt: "",
  },
  loader: false,
  gettingFormError: false,
  submitFormLoader: false,
  submitFormError: false,
  submited: false,

  handleStringsInputChange: (e, index) => {
    set((state) => {
      const updatedQuestions = [...state.form.questions];
      const isRequired = updatedQuestions[index]?.required || false;
      const isEmpty = e.target.value.trim() === "" && isRequired;

      if (updatedQuestions[index]) {
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          answer: [e.target.value],
          error: isEmpty,
        };
      }

      return {
        form: {
          ...state.form,
          questions: updatedQuestions,
        },
      };
    });
  },

  handleCheckBoxChange: (e, index) => {
    const { checked, value } = e.target;
    set((state) => {
      const updatedQuestions = [...state.form.questions];
      const currentAnswers = new Set(updatedQuestions[index].answer || []);
      if (checked) {
        currentAnswers.add(value);
      } else {
        currentAnswers.delete(value);
      }

      updatedQuestions[index] = {
        ...updatedQuestions[index],
        answer: Array.from(currentAnswers),
        error: false,
      };

      return {
        form: {
          ...state.form,
          questions: updatedQuestions,
        },
      };
    });
  },

  onSubmit: async (e, formId) => {
    e.preventDefault();
    let hasError = false;

    set((state) => {
      const updatedQuestions = state.form.questions.map((q) => {
        if (q.error || q.required && q.answer?.length === 0) hasError = true;
        return {
          ...q,
          error: q.required && (!q.answer || q.answer.length === 0),
        };
      });

      return {
        form: {
          ...state.form,
          questions: updatedQuestions,
        },
      };
    });

    if (hasError) {
      toast.warn("Plz fill all the required fields");
      return;
    }

    set({
      submitFormLoader: false,
      submitFormError: false,
      submited: true,
      form: {
        ...get().form,
        questions: get().form.questions.map((question) => ({
          ...question,
          answer: [],
          error: question.required ? true : false,
        })),
      },
    });

    try {
      set({ submitFormLoader: true, submitFormError: false, submited: false });

      const payload = get().form.questions.map((question) => ({
        questionNumber: question.index,
        questionText: question.questionText,
        answer: question.answer || [],
        questionType: question.questionType,
      }));

      await axiosInstance.post(`/api/v3/response/${formId}`, {
        response: payload,
      });

      set({
        submitFormLoader: false,
        submitFormError: false,
        submited: true,
        form: {
          ...get().form,
          questions: get().form.questions.map((question) => ({
            ...question,
            answer: [],
            error: question.required ? true : false,
          })),
        },
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.msg || "Failed to submit form");
      set({
        submitFormLoader: false,
        submitFormError: true,
        submited: false,
      });
    }
  },

  anotherSubmit: () => {
    set((state) => ({
      submited: false,
      form: {
        ...state.form,
        questions: state.form.questions.map((question) => ({
          ...question,
          answer: [],
          error: false,
        })),
      },
    }));
  },

  onClear: () => {
    set((state) => ({
      form: {
        ...state.form,
        questions: state.form.questions.map((question) => ({
          ...question,
          answer: [],
          error: false,
        })),
      },
    }));
  },

  getTheForm: async (formId) => {
    try {
      set({ loader: true });
      const response = await axiosInstance.get(`/api/v2/form/${formId}`);
      set({
        form: {
          ...response.data.form,
          questions: response.data.form.questions.map((q: Questions) => ({
            ...q,
            answer: [],
            error: false,
          })),
        },
        loader: false,
      });
    } catch (error) {
      console.error("Error fetching form:", error);
      set({ loader: false, gettingFormError: true });
    }
  },
  reset: () => {
    set({
      form: {
        title: "",
        description: "",
        author: "",
        disabled: false,
        questions: [],
        createdAt: "",
        updatedAt: "",
      },
    });
  },
}));

export default useSubmitFormStore;
