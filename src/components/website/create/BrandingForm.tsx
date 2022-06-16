import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber, Switch, Cascader } from "antd";
import { useSpinner } from "src/components/spinner/Spinner";
import UploadFormItem from "../fields/UploadFormItem";
import { useFormContext } from './StepFormContext'
import { faArrowLeft, faArrowRight, faPaperPlane } from "@symbolia/plsicon";
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import styles from "./GeneralForm.module.scss";

export default function BrandingForm() {
  const formctx = useFormContext()

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
    formctx.setValues(values)
    formctx.next()
    return;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        // className={styles.AntForm}
        layout='vertical'
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* <div className='content-header'>
          <h5 className='mb-0'>Account Details</h5>
          <small className='text-muted'>Enter Your Account Details.</small>
        </div> */}

        <div className='content-header mb-3'>
          <h5 className='mb-0'>Your Knowledge Base</h5>
          {/* <small className='text-muted'>Add logo and favicon.</small> */}
        </div>

        <div className='row'>
          <div className='col-md-5'>
            <UploadFormItem field='logoId' displayfield='logoUrl' label='Logo' required={true} requiredMessage='Logo Required' mode="add" form={form} />
          </div>
          <div className='col-md-5'>
            <UploadFormItem field='faviconId' displayfield='faviconUrl' label='Favicon' mode="add" form={form} />
          </div>
        </div>


        <div className='content-header mb-3 mt-4'>
          <h5 className='mb-0'>Your Brand</h5>
          {/* <small className='text-muted'>Add logo and favicon.</small> */}
        </div>

        <Form.Item  className={styles.formItem} label='Brand' name='brand'>
          <Input placeholder='MySaaS' />
        </Form.Item>

        <Form.Item className={styles.formItem} label='Brand Domain' name='brandDomain'>
          <Input placeholder='https://mysaas.com' />
        </Form.Item>

        <div className="steps-action mt-4">
          <button className="btn btn-outline-main me-3" type="button" onClick={() => formctx.prev()}>
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Previous
          </button>
          <button className="btn btn-main" type="submit">
            Next <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </button>
        </div>
      </Form>
    </>
  );
}
