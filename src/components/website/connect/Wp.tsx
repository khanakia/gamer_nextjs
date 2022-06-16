import React from "react";
import { Form, message, Input } from "antd";
import gqlErrorFirstMessage from "src/packages/string-fns/gqlErrorFirstMessage";
import { getGqlClient } from "src/lib/gql";
import { useSpinner } from 'src/components/spinner/Spinner'
import { mutation_websiteConnectWordpress } from '../queries'
import styles from "styles/Ant.module.scss";

type FormProps = {
  onSuccess?: () => void;
  id: string
};

export default function Form1(props: FormProps) {
  const { onSuccess = () => {}, id } = props;
  const [form] = Form.useForm();
	const spinner = useSpinner()

  const onFinish = (values: any) => {
    // console.log(values)
		// return
		spinner?.show();
    getGqlClient()
      .request(mutation_websiteConnectWordpress, {
        id: id,
        input: values,
      })
      .then((res) => {
        // console.log(res);
        onSuccess()
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

  }

  const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

  return (
    <>
    	<Form
				form={form}
        className={styles.AntForm}
        layout="vertical"
				name="basic"				
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				
        <div className='headingWrap mt-3'>
          <h2 className='heading'>Connect Wordpress</h2>
          <div className='note'>Install the Wordpress plugin first and then fill the below form.</div>
        </div>

        <Form.Item
          label='Api Host'
          name='wpHost'
          rules={[{ required: true, message: "Field required." }]}
          extra={'Enter your Wordpress site URL followed by https://'}
        >
          <Input placeholder='https://mysite.com' />
        </Form.Item>

        <Form.Item
          label='Api Key'
          name='wpApiKey'
          rules={[{ required: true, message: "Field required." }]}
          extra={'Enter your Wordpress site Api Key'}
        >
          <Input placeholder='PTWP-XXXXXXXXXXXXXXXXXXXX' />
        </Form.Item>
		
				<Form.Item wrapperCol={{ offset: 0, span: 24 }} className="submitBtnRow">
					<button className="me-3 btn btn-main ">
						Connect
					</button>
				</Form.Item>
			</Form>
     
    </>
  );
}
