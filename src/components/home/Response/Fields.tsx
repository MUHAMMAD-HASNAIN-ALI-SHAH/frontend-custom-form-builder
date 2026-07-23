import Email from "./fields/Email";
import Date from "./fields/Date";
import Time from "./fields/Time";
import Paragraph from "./fields/Paragraph";
import File from "./fields/File";
import MultipleChoice from "./fields/MultipleChoice";
import DropDown from "./fields/DropDown";
import LinearScale from "./fields/LinearScale";
import CheckBox from "./fields/CheckBox";
import Text from "./fields/Text";
import Number from "./fields/Number";

const Fields = ({
  question,
  getInputClasses,
  index,
}: {
  question: {
    index: number;
    questionType: string;
    questionText: string;
    required: boolean;
    options: string[];
  };
  getInputClasses: (index: number) => string;
  index: number;
}) => {
  return (
    <>
      {question.questionType === "text" && (
        <Text
          question={question}
          getInputClasses={getInputClasses}
          index={index}
        />
      )}
      {question.questionType === "email" && (
        <Email
          question={question}
          getInputClasses={getInputClasses}
          index={index}
        />
      )}
      {question.questionType === "number" && (
        <Number
          question={question}
          getInputClasses={getInputClasses}
          index={index}
        />
      )}
      {question.questionType === "date" && (
        <Date
          question={question}
          getInputClasses={getInputClasses}
          index={index}
        />
      )}
      {question.questionType === "time" && (
        <Time
          question={question}
          getInputClasses={getInputClasses}
          index={index}
        />
      )}

      {question.questionType === "paragraph" && (
        <Paragraph
          getInputClasses={getInputClasses}
          index={index}
        />
      )}

      {question.questionType === "file-upload" && (
        <File
          getInputClasses={getInputClasses}
          index={index}
        />
      )}

      {question.questionType === "multiple-choice" && (
        <MultipleChoice
          question={question}
          index={index}
        />
      )}

      {question.questionType === "dropdown" && (
        <DropDown
          question={question}
          getInputClasses={getInputClasses}
          index={index}
        />
      )}

      {question.questionType === "linear-scale" &&
        question.options?.length === 2 && (
          <LinearScale
            question={question}
            index={index}
          />
        )}

      {question.questionType === "check-box" && (
        <CheckBox
          question={question}
          index={index}
        />
      )}
    </>
  );
};

export default Fields;
