import { default as React, useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import Upload from "src/components/upload/Upload";
import { get } from '@muft/dot'
const DEFAULT_INITIAL_DATA = (): ImageData => {
  return {
    "class": "image",
  }
}

export interface ImageData {
  id?: string;
  src?: string;
  class?: string;
  style?: string;
}

export interface ImageProps  {
  onDataChange?: (data: ImageData) => void
  defaultValue?: ImageData
  readOnly?: boolean
}

const Image = (props: ImageProps) => {
  const { onDataChange, defaultValue } = props;
  // const [data, setData] = useState(defaultValue);

  const { register, setValue, getValues, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: defaultValue
  });
  const watchAllFields = watch(); 

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


  const onLogoUpload = (data: any) => {
    const id = get(data, '0.id')
    const url = get(data, '0.url')
    if(!id) return

    setValue("id", id)
    setValue("src", url)
    console.log(url)
  };

  console.log("watchAllFields", watchAllFields)

  const url = getValues('src')

  return (
    <div className="mb-4">
      <h3>Image</h3>
      <Upload onComplete={onLogoUpload} className="mb-2" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="form-control d-none" {...register("id", { required: true })} />
        <div className="mb-3">
          <label className="form-label">Enter URL</label>
          <input className="form-control" {...register("src", { required: true })} placeholder="Enter URL" />
        </div>

        <div className="mb-3 mt-2">
          <label className="form-label">Class</label>
          <input className="form-control" {...register("class")} />
        </div>

        <div className="mt-3">
          <img src={url} className="w-100" />
        </div>
      </form>
    </div>
  );
}

export default Image;