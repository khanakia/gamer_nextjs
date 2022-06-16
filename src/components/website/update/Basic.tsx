import React from "react";
import { Form, Input, Select, Switch } from "antd";
import UploadFormItem from "../fields/UploadFormItem";
const General = (props: any = {}) => {
  const {} = props;
  return (
    <React.Fragment>
      <Form.Item label='Site Name' name='name' rules={[{ required: true, message: "Site Name required." }]} extra={"Used to generate the copyright text and schema tag."}>
        <Input />
      </Form.Item>

      <div className='headingWrap mt-3'>
        <label className='formtitle'>Logo & Favicon</label>
        <div className='note'>Add logo and favicon.</div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <UploadFormItem field='logoId' displayfield='logoUrl' label='Logo' required={true} requiredMessage='Logo Required' />
        </div>

        <div className='col-md-4'>
          <UploadFormItem field='brandLogoId' displayfield='brandLogoUrl' label='Brand Logo' required={false} requiredMessage='Logo Required' />
        </div>
        {/* <div className="col-md-4">
          <UploadFormItem 
            field="logoSquareId"
            displayfield="logoSquareUrl"
            label="Logo Square"
            // required={true}
          />
        </div> */}
        <div className='col-md-4'>
          <UploadFormItem field='faviconId' displayfield='faviconUrl' label='Favicon' />
        </div>
      </div>

      <Form.Item label='Language' name='lang' rules={[{ required: true, message: "Language required." }]} extra={"Will be used to to show your site language and also for localization."}>
        <Select
          style={{ width: "100%" }}
          placeholder='Select'
          optionFilterProp='children'
          // onChange={handleLeadRouteChange}
        >
          <Select.Option key={1} value={"en"}>
            English
          </Select.Option>
          {/* <Select.Option key={2} value={"ru"}>
            Russian
          </Select.Option> */}
        </Select>
      </Form.Item>


      <Form.Item label='Status' name='status' valuePropName='checked'>
        <Switch />
      </Form.Item>
   

    </React.Fragment>
  );
};

export default General;
