import React, { useState, useEffect } from "react";
import { Steps, Form, Input, Button, Select, InputNumber, Switch, message, Tabs, Collapse } from "antd";
// const TabPane = Tabs.TabPane;
const { Step } = Steps;
const { Panel } = Collapse;
import StepForm from "./StepForm";
import { FormProvider, useFormContext } from "./StepFormContext";
import VideoModal from './VideoModal'

const steps = [
  {
    title: "Your Site",
    content: "Basic WordPress Info.",
  },
  {
    title: "Our Plugin",
    content: "Gamerapp on WP.",
  },
  {
    title: "Activation",
    content: "Connect PT & WP.",
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
          <Step key={item.title} title={item.title} description={item.content} />
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
        <div className="bs-stepper-ctr">
          <div className="text-center pt-5 mb-5">
            <h2>Connect Your WordPress</h2>
            {/* <div>Provide application data with this form</div> */}
          </div>
          <div className="bs-stepper vertical">
            <StepHeader />
            <div className="bs-stepper-content">
              <div className="steps-content">
                {/* {steps[current].content} */}
                <div className="row">
                  <div className="col-md-7">
                    <StepForm />
                  </div>
                  <div className="col-md-4 offset-md-1">

                    <VideoModal imagesrc="https://i.ytimg.com/vi/rospKq0NasA/hq720.jpg" url="https://www.youtube.com/embed/rospKq0NasA?autoplay=1" />
                    <Collapse defaultActiveKey={['1']} expandIconPosition="right" bordered={true} >
                      <Panel header="This is panel header 1" key="1">
                        Testing
                      </Panel>
                      <Panel header="This is panel header 2" key="2">
                        Testing 2
                      </Panel>
                      <Panel header="This is panel header 3" key="3">
                        Testing 3
                      </Panel>
                    </Collapse>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
}
