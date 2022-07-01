import { useRouter } from "next/router";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { Form, Input, Select, message } from "antd";
import { useSpinner } from "src/features/bite/components";
import { getGqlClient } from "src/features/bite";
import { mutation_p_paymentRequestProcess } from "src/features/app";
import styleAnt from "styles/Ant.module.scss";

export const PaymentProcess_Status_Declined = "declined";
export const PaymentProcess_Status_InProcess = "inprocess";
export const PaymentProcess_Status_Completed = "complted";

type FormProps = {
  id?: string;
  data?: any;
  onSubmit?: Function;
};

export default function ProcessPaymentRequest() {
  const [form] = Form.useForm();
  const spinner = useSpinner();
  const router = useRouter();
  const { id } = router.query;

  const onFinish = (values: any) => {
    if (!id) return;

    let gqlInput = {};
    let mutation = mutation_p_paymentRequestProcess;
    gqlInput = {
      input: values,
      id: id,
    };

    spinner?.show();
    getGqlClient()
      .request(mutation, gqlInput)
      .then((res) => {
        router.push(`/payment_requests`);
        message.success("Saved successfully.");
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

  return (
    <>
      <Form
        form={form}
        className={styleAnt.AntForm}
        layout='vertical'
        name='basic'
        onFinish={onFinish}
        initialValues={{
          colorPrimary: "#ff000",
          noIndex: false,
        }}
      >
        <Form.Item
          label='Status'
          name='statusId'
          rules={[{ required: true, message: "Field required." }]}
        >
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder='Select Status'
            optionFilterProp='children'
          >
            <Select.Option key={2} value={PaymentProcess_Status_InProcess}>
              In Process
            </Select.Option>
            <Select.Option key={2} value={PaymentProcess_Status_Completed}>
              Completed
            </Select.Option>
            <Select.Option key={1} value={PaymentProcess_Status_Declined}>
              Declined
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='Note' name='note'>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label='Internal Note' name='internalNote'>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 0, span: 24 }}
          className='submitBtnRow'
        >
          <button type='submit' className='me-3 btn btn-main '>
            Save
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
