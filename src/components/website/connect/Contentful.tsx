import React from "react";
import { Form, message, Input, Switch } from "antd";
import { useSpinner } from "src/components/spinner/Spinner";
import gqlErrorFirstMessage from "src/packages/string-fns/gqlErrorFirstMessage";
import { getGqlClient } from "src/lib/gql";
import { mutation_websiteConnectContentful } from "../queries";
import styles from "styles/Ant.module.scss";

type FormProps = {
  onSuccess?: () => void;
  id: string;
};
export default function Form1(props: FormProps) {
  const { onSuccess = () => {}, id } = props;
  const [form] = Form.useForm();
  const spinner = useSpinner();

  const onFinish = (values: any) => {
    // console.log(values)
    // return
    spinner?.show();
    getGqlClient()
      .request(mutation_websiteConnectContentful, {
        id: id,
        input: values,
      })
      .then((res) => {
        // console.log(res);
        // onSuccess();
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
    // console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form form={form} className={styles.AntForm} layout='vertical' name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed}  initialValues={{
        importDemo: false,
      }}>
        <div className='headingWrap mt-3'>
          <h2 className='heading'>Connect Contentful</h2>
          <div className='note'>Enter below detail to form contentful to connect your contentful site.</div>
        </div>

        <Form.Item label='Contentful Content Management Token' name='cmsAccessToken' rules={[{ required: false, message: "Field required." }]} extra={'Generate a new Personal access tokens from this url https://app.contentful.com/spaces/[SPACE_ID]/api/cma_tokens '}>
          <Input />
        </Form.Item>

        <Form.Item label='Contentful SpaceID' name='spaceId' rules={[{ required: false, message: "Field required." }]}
          extra={'You can get the SPACE ID from your contentful admin url.'}
        >
          <Input />
        </Form.Item>

        <Form.Item label='Import Demo Data' name='importDemo' rules={[{ required: false, message: "Field required." }]}
          extra={'Set to true if you want to import demo data.'} valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }} className='submitBtnRow'>
          <button className='me-3 btn btn-main '>Connect</button>
        </Form.Item>
      </Form>
    </>
  );
}
