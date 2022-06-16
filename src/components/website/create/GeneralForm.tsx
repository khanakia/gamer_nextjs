import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber, Switch, Cascader, Radio, Space } from "antd";
import { useFormContext } from "./StepFormContext";
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import { faArrowLeft, faArrowRight, faPaperPlane } from "@symbolia/plsicon";
import styles from "./GeneralForm.module.scss";
import Image from 'next/image'
export default function GeneralForm() {
  const formctx = useFormContext();

  const onFinish = (values: any) => {
    console.log(values);
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
        // className={styles.AntForm}
        layout='vertical'
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* <div className='content-header mb-4'>
          <h5 className='mb-0'>Account Details</h5>
          <small className='text-muted'>Enter Your Account Details.</small>
        </div> */}

        <Form.Item className={styles.formItem} label='Website Name' name='name' rules={[{ required: true, message: "Field required." }]}>
          <Input placeholder='Gamerapp Docs' />
        </Form.Item>

        <Form.Item className={styles.formItem} label='Website Title' name='title' rules={[{ required: true, message: "Field required." }]}>
          <Input placeholder='MySaaS Knowledge Base, BestScooter User Manual' />
        </Form.Item>

        <Form.Item className={styles.formItem} name='useCase' label='Use Case' rules={[{ required: true, message: "Field required." }]}>
          <Radio.Group className="d-block">
            <ul className='list-group list-group-flush mw-500'>
              <li className='list-group-item mb-2 border-0 px-0'>
                <label className='d-flex cursor-pointer'>
                  <span className='avatar avatar-tag me-3'>
                    <Radio value='Public documentation (SaaS)'></Radio>
                  </span>
                  <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                    <span className='me-1'>
                      <span className='h5 d-block'>Public documentation (SaaS)</span>
                      <span>Scales with Any Business</span>
                    </span>
                  </span>
                </label>
              </li>
              <li className='list-group-item mb-2 border-0 px-0'>
                <label className='d-flex cursor-pointer'>
                  <span className='avatar avatar-tag me-3'>
                  <Radio value='Public documentation (Others)'></Radio>
                  </span>
                  <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                    <span className='me-1'>
                      <span className='h5 d-block'>Public documentation (Others)</span>
                      <span>Grow Your Business With App</span>
                    </span>
                  </span>
                </label>
              </li>
              <li className='list-group-item mb-2 border-0 px-0'>
                <label className='d-flex cursor-pointer'>
                  <span className='avatar avatar-tag me-3'>
                  <Radio value='Blog/content'></Radio>
                  </span>
                  <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                    <span className='me-1'>
                      <span className='h5 d-block'>Blog/content</span>
                      <span>Start learning today</span>
                    </span>
                  </span>
                </label>
              </li>
            </ul>
          </Radio.Group>
        </Form.Item>


        <div className='mt-4 text-end'>
          <button className='btn btn-main' type='submit'>
            Next <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
          </button>
        </div>
      </Form>
    </>
  );
}
