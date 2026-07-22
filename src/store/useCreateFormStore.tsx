import { toast } from "react-toastify";
import { create } from "zustand";
import axiosInstance from "../utils/axios";

interface Questions {
  index: number;
  questionType: string;
  questionText: string;
  required: boolean;
  options: string[];
}

interface CreateFormState {
  formHeader: {
    title: string;
    description: string;
  };
  publishFormLoader: boolean;
  questions: Questions[];
  addQuestion: () => void;
  onOptionsChange: (index: number, newOptions: string[]) => void;
  onDeleteQuestion: (index: number) => void;
  duplicateQuestion: (index: number) => void;
  onCategoryChange: (index: number, newCategory: string) => void;
  onRequiredChange: (index: number, updated: boolean) => void;
  resetForm: () => void;
  onFormSubmit: () => Promise<number>;
  handleFormHeaderChange: (
    // Form Header Handling
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleQuestionInputChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleQuestionCategoryChange: (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleRequiredChange: (index: number) => void;
  reset: () => void;
  appendQuestions: (newQuestions: Questions[]) => void;
}

const useCreateFormStore = create<CreateFormState>((set) => ({
  questions: [],
  formHeader: {
    title: "",
    description: "",
  },
  publishFormLoader: false,
  addQuestion: () => {
    set((state) => {
      const newIndex = state.questions.length;
      const newQuestion: Questions = {
        index: newIndex,
        questionType: "text",
        questionText: "",
        required: false,
        options: [],
      };
      return {
        questions: [...state.questions, newQuestion],
      };
    });
  },
  onOptionsChange: (index, newOptions) => {
    set((state) => ({
      questions: state.questions.map((q) =>
        q.index === index ? { ...q, options: newOptions } : q
      ),
    }));
  },
  onDeleteQuestion: (index) => {
    set((state) => {
      const updatedQuestions = state.questions
        .filter((q) => q.index !== index)
        .map((q, i) => ({ ...q, index: i }));

      return { questions: updatedQuestions };
    });
  },
  duplicateQuestion: (index) => {
    set((state) => {
      const originalIndex = state.questions.findIndex((q) => q.index === index);
      if (originalIndex === -1) return state;

      const questionToDuplicate = state.questions[originalIndex];
      const duplicated = {
        ...questionToDuplicate,
        index: state.questions.length,
      };

      return {
        questions: [
          ...state.questions.slice(0, originalIndex + 1),
          duplicated,
          ...state.questions.slice(originalIndex + 1),
        ].map((q, i) => ({ ...q, index: i })),
      };
    });
  },
  onCategoryChange: (index, newCategory) => {
    set((state) => ({
      questions: state.questions.map((q) =>
        q.index === index ? { ...q, questionType: newCategory } : q
      ),
    }));
  },
  resetForm: () =>
    set(() => ({
      formHeader: {
        title: "",
        description: "",
      },
      questions: [],
    })),
  onRequiredChange: (index, updated) => {
    set((state) => ({
      questions: state.questions.map((q) =>
        q.index === index ? { ...q, required: updated } : q
      ),
    }));
  },
  onFormSubmit: async () => {
    try {
      set({ publishFormLoader: true });
      if (!useCreateFormStore.getState().formHeader.title.trim()) {
        toast.error("Form title is required!", {
          position: "top-right",
          autoClose: 3000,
        });
        set({ publishFormLoader: false });
        return 0;
      }
      if (!useCreateFormStore.getState().formHeader.description.trim()) {
        toast.error("Form description is required!", {
          position: "top-right",
          autoClose: 3000,
        });
        set({ publishFormLoader: false });
        return 0;
      }
      if (useCreateFormStore.getState().questions.length === 0) {
        toast.error("At least one question is required!", {
          position: "top-right",
          autoClose: 3000,
        });
        set({ publishFormLoader: false });
        return 0;
      }
      // now for questions statement
      if (useCreateFormStore.getState().questions.some(q => !q.questionText.trim())) {
        toast.error("All questions must have text!", {
          position: "top-right",
          autoClose: 3000,
        });
        set({ publishFormLoader: false });
        return 0;
      }
      const { questions, formHeader } = useCreateFormStore.getState();
      console.log("Submitting form with data:", { questions, formHeader });
      await axiosInstance.post("/api/v2/form", { formHeader, questions });
      toast.success("Form submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      set({ publishFormLoader: false });
      return 1;
    } catch (error: any) {
      console.error(error);
      return 0;
    }
  },
  handleFormHeaderChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      formHeader: {
        ...state.formHeader,
        [name]: value,
      },
    }));
  },
  handleQuestionInputChange: (index, e) => {
    const { value } = e.target;
    set((state) => ({
      questions: state.questions.map((q) =>
        q.index === index ? { ...q, questionText: value } : q
      ),
    }));
  },
  handleQuestionCategoryChange: (index, e) => {
    const { value } = e.target;
    set((state) => ({
      questions: state.questions.map((q) =>
        q.index === index ? { ...q, questionType: value } : q
      ),
    }));
  },
  handleRequiredChange: (index) => {
    set((state) => {
      const question = state.questions.find((q) => q.index === index);
      if (!question) return state;

      const updatedRequired = !question.required;
      return {
        questions: state.questions.map((q) =>
          q.index === index ? { ...q, required: updatedRequired } : q
        ),
      };
    });
  },
  reset: () =>
    set({
      formHeader: { title: "", description: "" },
      questions: [],
      publishFormLoader: false,
    }),
  appendQuestions: (newQuestions) => {
    set((state) => {
      const startingIndex = state.questions.length;
      const mapped = newQuestions.map((q, i) => ({
        ...q,
        index: startingIndex + i,
      }));
      return { questions: [...state.questions, ...mapped] };
    });
  },
}));

export default useCreateFormStore;
