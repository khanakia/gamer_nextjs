import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber, Switch, Cascader, message } from "antd";
// import styles from "../Styles.module.scss";
import { useSpinner } from "src/components/spinner/Spinner";
import gqlErrorFirstMessage from "src/packages/string-fns/gqlErrorFirstMessage";
import { getGqlClient } from "src/lib/gql";
import objGetPath from "src/packages/string-fns/objGetPath";
import { mutation_websiteCreate } from "../queries";
import { useFormContext } from './StepFormContext'
import { faArrowLeft, faArrowRight, faPaperPlane } from "@symbolia/plsicon";
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import HelpMarkup from "src/components/mix/HelpMarkup";
import { useRouter } from 'next/router'
import styles from "./GeneralForm.module.scss"

export default function GeneralForm() {
  const formctx = useFormContext()
  const spinner = useSpinner();
  const router = useRouter()

  const onFinish = (values: any) => {
    console.log(values)
    formctx.setValues(values)
    let newvalues = Object.assign({}, formctx.formValues, values)
    console.log(newvalues);
    // formctx.next()
    // return;

    spinner?.show();
    getGqlClient()
      .request(mutation_websiteCreate, {
        // id: id,
        input: newvalues,
      })
      .then((res) => {
        console.log(res);
        const website = objGetPath(res, "websiteCreate");
        // onSuccess(website);
        router.push(`/websites/${website.id}/connect_${website.channel}`)
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
        // className={styles.AntForm}
        layout='vertical'
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
       {/* <div className="content-header">
        <h5 className="mb-0">Configuration</h5>
        <small className="text-muted">Enter Your Account Details.</small>
      </div> */}
     
      <Form.Item
      className={styles.formItem}
        label='Sub Domain'
        name='subDomain'
        rules={[{ required: true, message: "Field required." }]}
        extra={
          <HelpMarkup
            text={
              "This will be the URL to access your website."
            }
          />
        }
      >
        <Input addonBefore='https://' suffix=".docs.pub" placeholder="Gamerapp" />
      </Form.Item>
      
      <Form.Item
      className={styles.formItem}
        label='Content-Source (aka Channel):'
        name='channel'
        rules={[{ required: true, message: "Field required." }]}
      >
        <Select
          // key={Math.random(3)}
          style={{ width: "100%" }}
          placeholder='Select'
          optionFilterProp='children'
          // onChange={handleLeadRouteChange}
        >
          <Select.Option key={1} value={"wordpress"}>
            Wordpress
          </Select.Option>
          <Select.Option key={2} value={"contentful"}>
            Contentful
          </Select.Option>
        </Select>
      </Form.Item>

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
