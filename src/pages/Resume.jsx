import { useContext } from "react";
import Template_1 from "../components/ResumeTemplates/Template_1";
import Template_2 from "../components/ResumeTemplates/Template_2";
import Template_3 from "../components/ResumeTemplates/Template_3";
import Template_4 from "../components/ResumeTemplates/Template_4";
import Template_5 from "../components/ResumeTemplates/Template_5";
import Template_6 from "../components/ResumeTemplates/Template_6";
import Template_7 from "../components/ResumeTemplates/Template_7";
import Template_8 from "../components/ResumeTemplates/Template_8";
import Template_9 from "../components/ResumeTemplates/Template_9";
import Template_10 from "../components/ResumeTemplates/Template_10";
import Template_11 from "../components/ResumeTemplates/Template_11";
import Template_12 from "../components/ResumeTemplates/Template_12";
import Template_13 from "../components/ResumeTemplates/Template_13";
import AppContext from "../context/AppContext";

const templates = {
  "wp-1col-tem1": Template_1,
  "p-2col-tem1": Template_2,
  "wp-2col-tem1": Template_3,
  "wp-2col-tem2": Template_4,
  "p-2col-tem2": Template_5,
  "p-1col-tem1": Template_6,
  "wp-1col-tem2": Template_7,
  "p-1col-tem2": Template_8,
  "wp-1col-des-tem1": Template_9,
  "p-2col-des-tem2": Template_10,
  "p-2col-des-tem3": Template_11,
  "wp-2col-des-tem4": Template_12,
  "wp-2col-des-tem5": Template_13
};

const Resume = ({ template, resumeData }) => {
  const SelectedTemplate = templates[template];

  const { resumeLineHeight } = useContext(AppContext);

  let lineHeight;

  if(resumeData.resumelineheight === ""){
    lineHeight = resumeLineHeight;
  }else{
    lineHeight = resumeData.resumelineheight;
  }

  return (
    <div>
      {SelectedTemplate ? (
        <SelectedTemplate resumeData={resumeData} resumeLineHeight={lineHeight} />
      ) : (
        <h1>No Template Selected</h1>
      )}
    </div>
  );
};

export default Resume;
