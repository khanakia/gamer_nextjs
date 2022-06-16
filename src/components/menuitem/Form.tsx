import React, { useState, useEffect } from "react";
import gqlErrorFirstMessage from "src/packages/string-fns/gqlErrorFirstMessage";
import { getGqlClient } from "src/lib/gql";
import { mutation_menuItemCreate, mutation_menuItemUpdate } from "src/queries";
import { Form, Input, InputNumber, Select, Switch, message } from "antd";
import ShowWrap from "src/components/mix/ShowWrap";
import { useSpinner } from 'src/components/spinner/Spinner'
import styleAnt from "styles/Ant.module.scss";
type FormProps = {
  id?: string
  data?: any;
	menuId?: string;
	onSubmit?: Function;
};

export default function Form1(props: FormProps) {
  const { id, menuId, data = {}, onSubmit } = props;
  const [formValues, setFormValues] = useState(data)
  const [form] = Form.useForm();
  const [errors, setErrors] = useState([]);
	const [saveRedirect, setSaveRedirect] = useState(false);
	const spinner = useSpinner()

	const submitForm = () => {
		setSaveRedirect(true);
		form.submit();
	};

  const onFinish = (values: any) => {
    // console.log(values)
		// return

		let gqlInput = {}
		let mutation = mutation_menuItemCreate

		if(id) {
			mutation = mutation_menuItemUpdate
			gqlInput = {
        id: id,
        input: values,
      }
		} else {
			if(!menuId) return
			values['menuId'] = menuId
			gqlInput = {
        input: values,
      }
		}

		spinner?.show();
    getGqlClient()
      .request(mutation, gqlInput)
      .then((res) => {
        // console.log(res);
				message.success("Saved successfully.")

				if(typeof onSubmit=="function") {
					onSubmit(saveRedirect)
				}
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
		// console.log("Failed:", errorInfo);
		setErrors(errorInfo.errorFields);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};


  useEffect(() => {
		form.setFieldsValue(data);
	}, [JSON.stringify(data)]);

	// console.log(errors)

  return (
    <>
    	<Form
				form={form}
				// {...antFormLayout}
        className={styleAnt.AntForm}
        layout="vertical"
				name="basic"				
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				initialValues={{
					colorPrimary: "#ff000",
					noIndex: false
				}}
			>
			<Form.Item label='Item Name' name='name' rules={[{ required: true, message: "Name required." }]}>
        <Input />
      </Form.Item>

			<Form.Item label='Status' name='status' valuePropName='checked'>
        <Switch />
      </Form.Item>

			<Form.Item label='Order' name='sortOrder' rules={[{ required: true, message: "Order required." }]}>
        <InputNumber />
      </Form.Item>

			<Form.Item label='Link' name='link' rules={[{ required: true, message: "Link required." }]}>
        <Input />
      </Form.Item>

			<Form.Item wrapperCol={{ offset: 0, span: 24 }} className="submitBtnRow">
				<button type="button" onClick={() => submitForm()} className="me-3 btn btn-main ">
					Save
				</button>
				<ShowWrap show={!!id}>
					<button className="me-3 btn btn-main " type="submit">
						Save & Continue
					</button>
				</ShowWrap>
			</Form.Item>
			</Form>
     
    </>
  );
}
