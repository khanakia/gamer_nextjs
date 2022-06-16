import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber, Switch, Cascader, Radio, Space } from "antd";
import { useFormContext } from "./StepFormContext";
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import { faArrowLeft, faArrowRight, faPaperPlane } from "@symbolia/plsicon";
// import styles from "../Styles.module.scss";
// import styleAnt from "styles/Ant.module.scss";

import Image from 'next/image'
export default function GeneralForm() {
  const formctx = useFormContext();

  const onFinish = (values: any) => {
    // console.log(values);
    formctx.setValues(values);
    formctx.next();
    return;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        // form={form}
        // className={styleAnt.AntForm}
        layout='vertical'
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
       <Form.Item
          label='Website URL'
          name='wpHost'
          rules={[{ required: true, message: "Field required." }]}
          extra={'Enter your Wordpress site URL followed by https://'}
        >
          <Input placeholder='https://mysite.com' />
        </Form.Item>

        <Form.Item name='wpSiteStatus' label='Website status' rules={[{ required: true, message: "Field required." }]}>
          <Radio.Group className="d-block">
            <ul className='list-group list-group-flush mw-500'>
              <li className='list-group-item mb-2 border-0 px-0'>
                <label className='d-flex cursor-pointer'>
                  <span className='avatar avatar-tag me-3'>
                    <Image src='/images/icons8-blog-64.png' width='40' height='40' alt='Blog'/>
                  </span>
                  <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                    <span className='me-1'>
                      <span className='h5 d-block'>Active: Brand/Corporate Website</span>
                      <span>Scales with Any Business</span>
                    </span>
                    <span>
                      {/* <input className='form-check-input' id='createAppCrm' type='radio' name='categoryRadio' /> 
                      */}
                      <Radio value='Active: Brand/Corporate Website'></Radio>
                    </span>
                  </span>
                </label>
              </li>
              <li className='list-group-item mb-2 border-0 px-0'>
                <label className='d-flex cursor-pointer'>
                  <span className='avatar avatar-tag me-3'>
                    <Image src='/images/icons8-documents-48.png' width='40' height='40' alt='Blog'/>
                  </span>
                  <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                    <span className='me-1'>
                      <span className='h5 d-block'>Active: Brand/Corporate Blog</span>
                      <span>Grow Your Business With App</span>
                    </span>
                    <span>
                      {/* <input className='form-check-input' id='createAppEcommerce' type='radio' 
                      name='categoryRadio' /> */}
                      <Radio value='Active: Brand/Corporate Blog'></Radio>
                    </span>
                  </span>
                </label>
              </li>
              <li className='list-group-item mb-2 border-0 px-0'>
                <label className='d-flex cursor-pointer'>
                  <span className='avatar avatar-tag me-3'>
                    <Image src='/images/icons8-documents-100.png' width='40' height='40' alt='Blog'/>
                  </span>
                  <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                    <span className='me-1'>
                      <span className='h5 d-block'>Passive: Created for Gamerapp</span>
                      <span>Start learning today</span>
                    </span>
                    <span>
                      {/* <input className='form-check-input' id='createAppOnlineLearning' type='radio' 
                      name='categoryRadio' /> */}
                      <Radio value='Passive: Created for Gamerapp'></Radio>
                    </span>
                  </span>
                </label>
              </li>
            </ul>
          </Radio.Group>
        </Form.Item>

        <div className='alert alert-warning'> Your existing website won’t be affected by Product Tutor - and it will only be used as CMS.</div>


        <div className='mt-4 text-end'>
          <button className='btn btn-main' type='submit'>
            Next <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
          </button>
        </div>
      </Form>
    </>
  );
}
