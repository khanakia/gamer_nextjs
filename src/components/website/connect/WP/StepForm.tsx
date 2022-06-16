import React from "react";
import GeneralForm from "./GeneralForm";
import DownloadStep from "./DownloadStep";
import FinalizeForm from "./FinalizeForm";
import { useFormContext } from "./StepFormContext";

export default function Form1() {
  const formctx = useFormContext();
  const { step } = formctx;
  return (
    <>
      <div className={step == 0 ? "h-100" : "d-none"}>
        <GeneralForm />
      </div>

      <div className={step == 1 ? "h-100" : "d-none"}>
        <DownloadStep />
      </div>
      

      <div className={step == 2 ? "h-100" : "d-none"}>
        <FinalizeForm />
      </div>
    </>
  );
}
