import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber, Switch, Cascader, message } from "antd";
// import styles from "../Styles.module.scss";
import { useSpinner } from "src/components/spinner/Spinner";
import gqlErrorFirstMessage from "src/packages/string-fns/gqlErrorFirstMessage";
import { getGqlClient } from "src/lib/gql";
import objGetPath from "src/packages/string-fns/objGetPath";
import { mutation_websiteConnectWordpress } from "../../queries";
import { useFormContext } from './StepFormContext'
import { faArrowLeft, faArrowRight, faPaperPlane } from "@symbolia/plsicon";
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import HelpMarkup from "src/components/mix/HelpMarkup";
import { useRouter } from 'next/router'
// import styleAnt from "styles/Ant.module.scss";

export default function FinalizeForm() {
  const formctx = useFormContext()
  const spinner = useSpinner();
  const router = useRouter()
  const { id } = router.query;

  const onFinish = (values: any) => {
    if(!id) return
    formctx.setValues(values)
    let newvalues = Object.assign({}, formctx.formValues, values)
    // console.log(formctx.formValues)
    // console.log(newvalues);
    
    // formctx.next()
    // return;

    spinner?.show();
    getGqlClient()
      .request(mutation_websiteConnectWordpress, {
        id: id,
        input: newvalues,
      })
      .then((res) => {
        console.log(res);
        router.push(`/websites/${id}`)
      })
      .catch((err) => {
        // console.log(err);
        const msg = gqlErrorFirstMessage(err, {
          capitalize: true,
        });
        message.error(msg);
      })
      .finally(() => {
        spinner?.hide();
      });
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
        className="d-flex flex-column h-100"
      >
     
     
       <div className="flex-fill">
          <Form.Item
            label='Product Tutor API KEY'
            name='wpApiKey'
            rules={[{ required: true, message: "Field required." }]}
            extra={'Activate the PT Plugin and it will generate an API key just like in the screenshot.'}
          >
            <Input placeholder='PTWP-XXXXXXXXXXXXXXXXXXXX' />
          </Form.Item>
       </div>

        <div className="steps-action mt-4">
          <button className="btn btn-outline-main me-3" type="button" onClick={() => formctx.prev()}>
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Previous
          </button>
          <button className="btn btn-main" type="submit">
            Submit <FontAwesomeIcon icon={faPaperPlane} className="ms-2" />
          </button>
        </div>
     


      </Form>
    </>
  );
}
