import React, { useState, useContext } from "react";

export interface FormContextProps {
  form: any;
  values ?: any;
  website ?: any;
  response ?: any;
}


export const FormContext = React.createContext<FormContextProps>({} as any);

export const useFormContext = () => {
  return useContext(FormContext)
}