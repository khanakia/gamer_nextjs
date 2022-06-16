import React from "react";
import { Form, Input, Select } from "antd";
import UploadFormItem from "../fields/UploadFormItem";

const SEO = (props: any = {}) => {
  const {} = props;

  return (
    <React.Fragment>
      <div className='headingWrap mt-3'>
        <h2 className='heading'>Meta Settings</h2>
        <div className='note'>This shows the default site meta description and image.</div>
      </div>

      <Form.Item label='Meta Title' name='title' rules={[{ required: true, message: "Meta Title required." }]} extra={"Used to generate the copyright text and default meta title."}>
        <Input />
      </Form.Item>

      <Form.Item label='Description' name='description' extra='Will show as meta description tag.'>
        <Input.TextArea />
      </Form.Item>

      <UploadFormItem field='ogImageId' displayfield='ogImageUrl' label='Open Graph image' required={false} requiredMessage='Open Graph image required.' />


      {/* <h2 className='heading'>Call To Actions</h2>

      <div className='row'>
        <div className='col-md-6'>
          <Form.Item label='CTA Title 1' name='cta1Title'>
            <Input />
          </Form.Item>
        </div>
        <div className='col-md-6'>
          <Form.Item label='CTA Link 1' name='cta1Link'>
            <Input />
          </Form.Item>
        </div>
        <div className='col-md-6'>
          <Form.Item label='CTA Title 2' name='cta2Title'>
            <Input />
          </Form.Item>
        </div>
        <div className='col-md-6'>
          <Form.Item label='CTA Link 2' name='cta2Link'>
            <Input />
          </Form.Item>
        </div>
      </div> */}

    
    </React.Fragment>
  );
};

export default SEO;
