import React from "react";
import { Form, Input, Select, Switch } from "antd";
import { countries } from "./constants";

const Business = (props: any = {}) => {
  const {} = props;
  return (
    <React.Fragment>

<Form.Item label='Brand' name='brand'>
        <Input placeholder='Product Tutor' />
      </Form.Item>

      <Form.Item label='Brand Domain' name='brandDomain'>
        <Input placeholder='https://Gamerapp.com' />
      </Form.Item>

      <Form.Item label='Email' name='email' extra={"Add your email address."}>
        <Input placeholder='hello@Gamerapp.com' />
      </Form.Item>

<div className='headingWrap'>
        <h2 className='heading'>Social Media Accounts</h2>
        <div className='note'>Add your social media accounts. Will be shown in footer and schemas.</div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <Form.Item label='Twitter' name='twitter'>
            <Input placeholder='@Gamerapp' />
          </Form.Item>
        </div>
        <div className='col-md-6'>
          <Form.Item label='Linkedin URL' name='linkedin' extra='Please start with https://'>
            <Input />
          </Form.Item>
        </div>
        <div className='col-md-6'>
          <Form.Item label='Facebook' name='facebook'>
            <Input />
          </Form.Item>
        </div>

        <div className='col-md-6'>
          <Form.Item label='Github' name='github'>
            <Input />
          </Form.Item>
        </div>

        <div className='col-md-6'>
          <Form.Item label='Youtube' name='youtube'>
            <Input />
          </Form.Item>
        </div>

        <div className='col-md-6'>
          <Form.Item label='Tiktok' name='tiktok'>
            <Input />
          </Form.Item>
        </div>

        <div className='col-md-6'>
          <Form.Item label='Pinterest' name='pinterest'>
            <Input />
          </Form.Item>
        </div>

        <div className='col-md-6'>
          <Form.Item label='Snapchat' name='snapchat'>
            <Input />
          </Form.Item>
        </div>
        <div className='col-md-6'>
          <Form.Item label='FB App ID' name='fbAppId'>
            <Input />
          </Form.Item>
        </div>
      </div>
     
     <div className="headingWrap mt-3">
        <h2 className="heading">Address</h2>
        <div className="note">Will be used to generate website schema.</div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <Form.Item
            label='Business Address'
            name='addressLine1'
          >
            <Input maxLength={100} placeholder='Street Address' />
          </Form.Item>
        </div>

        <div className='col'>
          <Form.Item
            label='Country'
            name='country'
          >
            <Select
              // {...propsFiltered}
              // key={Math.random(3)}
              showSearch
              style={{ width: "100%" }}
              placeholder='Select Country'
              optionFilterProp='children'
            >
              <Select.Option className='iconDropdownOption' key={"a"} value=''>
                Select Country
              </Select.Option>
              {countries.map((d, i) => (
                <Select.Option key={i} value={d.name}>
                  {d.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className='col'>
          <Form.Item
            label='City'
            name='city'
          >
            <Input maxLength={100} placeholder='City' />
          </Form.Item>
        </div>
        <div className='col'>
          <Form.Item
            label='State'
            name='state'
          >
            <Input maxLength={100} placeholder='State' />
          </Form.Item>
        </div>
        <div className='col'>
          <Form.Item
            label='Zip Code'
            name='pinCode'
          >
            <Input maxLength={10} placeholder='Zip Code' />
          </Form.Item>
        </div>
      </div>
    
     
    </React.Fragment>
  );
};

export default Business;
