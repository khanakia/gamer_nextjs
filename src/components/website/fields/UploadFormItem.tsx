import React, { useState, useContext, useEffect } from "react";
import { Form, Input, } from "antd";
import Upload from "src/components/upload/Upload";
import { useFormContext } from "../context";
import styles from "../Styles.module.scss";
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import { faTrash } from "@symbolia/plsicon";

type UploadImageProps = {
  label?: string;
  field: string;
  displayfield: string;
  required?: boolean;
  requiredMessage?: string;
  mode?: string; // create|edit
  form?: any; // create|edit
};

function validatorUUID(rule: any, value: any) : any {
  // console.log(rule)
  if(value=='00000000-0000-0000-0000-000000000000') {
    return Promise.reject("Field required11.");
    // return Promise.reject(message as any);
  }
  return Promise.resolve();
}

function validatorUUIDWrap(message: any) {
  return function(rule: any, value: any) : any {
    // console.log(rule)
    if(value=='00000000-0000-0000-0000-000000000000') {
      // return Promise.reject("Field required.");
      return Promise.reject(message as any);
    }
    return Promise.resolve();
  }
   
}

const UploadFormItem = (props: UploadImageProps) => {
  const { required = false, requiredMessage="Field required", field, displayfield, label = "Image", mode='edit', form } = props;

  let fileUrl: any = null
  
  const fc = useFormContext();
  if(mode=='edit' && fc.website) {
    fileUrl = fc.website[displayfield]
  }

  const [url, setUrl] = useState(fileUrl);

  const onLogoUpload = (data: any) => {
    let formn = form
    if(mode=='edit') {
      formn = fc.form
    }

    console.log("FORM", formn)

    formn && formn.setFieldsValue({
      [field]: data[0].id,
    });

    setUrl(data[0].url);
  };

  useEffect(() => {
    setUrl(fileUrl);
  }, [fileUrl]);


  // const rules = required ? [{ required: required, message: requiredMessage}, {validator: validatorUUIDWrap(requiredMessage)}]: []
  const rules = required ? [{validator: validatorUUIDWrap(requiredMessage)}]: []

  return (
    <div className={styles.UploadFormItem}>
      <div className={styles.UploadFormItemInner}>
        <label className='mb-2'>{label}</label>
        <Upload onComplete={onLogoUpload} />
        <Form.Item
          label={label}
          name={field}
          rules={rules}
          // hidden
          className={"ant-hideinput"}
        >
          <Input />
        </Form.Item>

        {url ?
          <div className={styles.Droppable}>
            <button onClick={() => setUrl(null)} className={styles.trashIcon}><FontAwesomeIcon icon={faTrash} /></button>
            <img src={url} className='img-thumbnail1' alt="" />
            <div className={styles.UploadImageOverlay}></div>
          </div>
          : null
        }

      </div>
    </div>
  );
};

export default UploadFormItem