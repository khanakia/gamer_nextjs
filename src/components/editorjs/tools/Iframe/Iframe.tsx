import { default as React, useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";

const DEFAULT_INITIAL_DATA = (): IframeData => {
  return {
    "class": "dotted",
  }
}

export interface IframeData {
  class?: string;
  src?: string;
  style?: string;
}

export interface IframeProps  {
  onDataChange?: (data: IframeData) => void
  defaultValue?: IframeData
  readOnly?: boolean
}

const Iframe = (props: IframeProps) => {
  const { onDataChange, defaultValue } = props;
  // const [data, setData] = useState(defaultValue);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: defaultValue
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  }

  // console.log(watch("src")); // watch input value by passing the name of it

  // console.log("SDfds")

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type)
      if(typeof onDataChange === 'function') {
        onDataChange(value)
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  console.log(defaultValue)

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Iframe</h3>
        <div className="mb-3">
          <label className="form-label">URL</label>
          <input className="form-control" {...register("src", { required: true })} />
          {errors.src && <span>This field is required</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Class</label>
          <input className="form-control" {...register("class")} />
        </div>

        <div className="mb-3">
          <label className="form-label">Style</label>
          <input className="form-control" {...register("style")} />
        </div>
          
      </form>
    </div>
  );
}

export default Iframe;