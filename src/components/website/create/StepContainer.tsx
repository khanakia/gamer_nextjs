import React, { useState, useEffect } from "react";
import { Steps, Form, Input, Button, Select, InputNumber, Switch, message, Tabs } from "antd";
// const TabPane = Tabs.TabPane;
const { Step } = Steps;
import StepForm from "./StepForm";
import { FormProvider, useFormContext } from "./StepFormContext";
import styles from "./GeneralForm.module.scss";

const steps = [
  {
    title: "Your Site",
    content: "Tell us more",
  },
  {
    title: "Branding",
    content: "Explain your brand",
  },
  {
    title: "Configurations",
    content: "Launch site.",
  },
];

function DotIcon(icon: any, data: any) {
  // console.log(a,b)
  if (data.status == "process") {
    return <i className='far fa-dot-circle'></i>;
  }
  return icon;
}

function StepHeader() {
  const formctx = useFormContext();
  return (
    <div className='bs-stepper-header'>
      <Steps current={formctx.step} direction='vertical'>
        {steps.map((item) => (
          <Step className={styles.stepItem} key={item.title} title={item.title} description={item.content} />
        ))}
      </Steps>
    </div>
  );
}

export default function StepContainer() {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <FormProvider>
        <div className='bs-stepper-ctr'>
          <div className='text-center pt-5 mb-5'>
            <h2>Create Website</h2>
            <div>Provide application data with this form</div>
          </div>
          <div className='bs-stepper vertical'>
            <StepHeader />
            <div className='bs-stepper-content'>
              <div className='steps-content'>
                {/* {steps[current].content} */}
                <StepForm />
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
}
