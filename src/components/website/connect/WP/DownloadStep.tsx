import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber, Switch, Cascader, Radio, Space } from "antd";
import { useFormContext } from "./StepFormContext";
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import { faArrowLeft, faArrowRight, faPaperPlane } from "@symbolia/plsicon";
// import styles from "../Styles.module.scss";
// import styleAnt from "styles/Ant.module.scss";

import Image from "next/image";
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

  const handleCheckChange = (e: any) => {
    console.log(e.target.checked);
  };

  return (
    <>
      <div className="d-flex flex-column h-100">
        <div className="flex-fill ">
          <div className='fw-bold'>Download the Product Tutor plugin and install it into your WordPress website.</div>
          <ul className='mt-4'>
            <li className='mb-2'>It will connect your WordPress website with the Product Tutor</li>
            <li className='mb-2'>Install Product Tutor demo content (optional)</li>
            <li className=''>Allow you to manage your documentation</li>
          </ul>

          <div className='mt-4'>
            <a className='btn btn-main' rel='noreferrer' href='https://files.Gamerapp.com/wp/Gamerapp/Gamerapp.zip' target='_blank'>
              Download Plugin
            </a>
          </div>

        </div>

        <div>

          <label className='mt-4 d-flex align-items-center'>
            <input type='checkbox' onChange={handleCheckChange} className="me-2" /> I have downloaded the plugin and ready to install.{" "}
          </label>
          <div className='steps-action mt-4'>
            <button className='btn btn-outline-main me-3' type='button' onClick={() => formctx.prev()}>
              <FontAwesomeIcon icon={faArrowLeft} className='me-2' /> Previous
            </button>
            <button className='btn btn-main' onClick={() => formctx.next()}>
              Next <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
            </button>
          </div>

        </div>

      </div>
    </>
  );
}
