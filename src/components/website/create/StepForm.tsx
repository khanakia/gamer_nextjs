import React from "react";
import GeneralForm from "./GeneralForm";
import BrandingForm from "./BrandingForm";
import ConfigurationForm from "./ConfigurationForm";
import { useFormContext } from "./StepFormContext";

export default function Form1() {
  const formctx = useFormContext();
  const { step } = formctx;
  return (
    <>
      <div className={step == 0 ? "" : "d-none"}>
        <GeneralForm />
      </div>

      <div className={step == 1 ? "" : "d-none"}>
        <BrandingForm />
      </div>

      <div className={step == 2 ? "" : "d-none"}>
        <ConfigurationForm />
      </div>
    </>
  );
}
