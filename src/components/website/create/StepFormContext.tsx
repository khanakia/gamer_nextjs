import React, { createContext, useState, useContext, useEffect } from "react";

interface FormContextProps {
  formValues: any;
  step: any;
  next: Function;
  prev: Function;
  setValues: (data: any) => void;
}

export const FormContext = React.createContext<FormContextProps>({} as any);

export const FormProvider = ({ children }: any) => {
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState({});

  const next = () => {
    let newstep = step + 1
    // newstep = newstep > 2 ? 2 : newstep
    console.log("next", newstep)
    setStep(newstep);
  };

  const prev = () => {
    let newstep = step - 1
    newstep = newstep < 0 ? 0 : newstep
    console.log("prev", newstep)
    setStep(newstep);
  };

  const setValues = (data: any) => {
    const data_ = Object.assign({}, data, formValues);
		// console.log(data_);
		setFormValues(data_);
  };
  

  return <FormContext.Provider value={{ step, next, prev, setValues, formValues }}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  return useContext(FormContext);
};
