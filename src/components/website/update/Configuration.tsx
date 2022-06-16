import React from "react";
import { Form, Input, Select, Switch } from "antd";
import HelpMarkup from "src/components/mix/HelpMarkup";
import objGetPath from "src/packages/string-fns/objGetPath";
import { useFormContext } from "../context";
import ClearCache from "../ClearCache";

import UpgradeNote from '../UpgradeNote'
const domainHelp = `Enter domain without http:// or https://<br/>
You must have already purchased a domain via a domain name provider like GoDaddy. Once purchased you will need to create CNAME record as follows. <br/>
CNAME record for docs.YOUR_DOMAIN pointing to sites.Gamerapp.com
`;

const Configuration = (props: any = {}) => {
  const {} = props;
  const fc = useFormContext();
  const subDomain = fc.website.subDomain;

  const hasSubscription = fc.website.hasSubscription;
  // console.log("hasSubscription", hasSubscription)

  const menus = objGetPath(fc, "response.p_menus", [])
  // console.log(menus)

  return (
    <React.Fragment>
      <Form.Item label='Status' name='status' valuePropName='checked'>
        <Switch />
      </Form.Item>
      
      <div className='headingWrap mt-3'>
        <h2 className='heading'>Password Protect Site</h2>
        <div className='note'>This will password protect your site. Users will require the password to access the site.</div>
      </div>

      <Form.Item label='Password Protect ?' name='hasPassword' valuePropName='checked'>
        <Switch />
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.channel !== currentValues.channel}>
        {({ getFieldValue }) => {
          const hasPassword = getFieldValue("hasPassword");
          return hasPassword ? (
            <React.Fragment>
              <Form.Item label='Password' name='password'>
                <Input />
              </Form.Item>
            </React.Fragment>
          ) : null;
        }}
      </Form.Item>
      
      <div className='headingWrap mt-3'>
        <h2 className='heading'>Enable Cache</h2>
        <div className='note'>This will cache your site content and optimize it for speed.</div>
      </div>

      <Form.Item label='Enable Cache?' name='cacheEnabled' valuePropName='checked' extra='Enable website page caching.'>
        <Switch />
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.channel !== currentValues.channel}>
        {({ getFieldValue }) => {
          const cacheEnabled = getFieldValue("cacheEnabled");
          const id = getFieldValue("id"); // clear cache button requries websiteId to send in ajax

          return cacheEnabled && id ? (
            <React.Fragment>
              <ClearCache id={getFieldValue("id")} />
            </React.Fragment>
          ) : null;
        }}
      </Form.Item>



      <div className='headingWrap'>
        <h2 className='heading'>Newsletter</h2>
        <div className='note'>Connect your newsletter channel with the site.</div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <Form.Item label='Newsletter Channel' name='newsletterChannel'>
            <Select style={{ width: "100%" }} placeholder='Select'>
              <Select.Option key={1} value={"mailchimp"}>
                Mailchimp
              </Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className='col-md-6'>
          <Form.Item label='Newsletter List ID' name='newsletterListId'>
            <Input placeholder='' />
          </Form.Item>
        </div>
        <div className='col-md-6'>
          <Form.Item label='Newsletter Api Key' name='newsletterApiKey'>
            <Input placeholder='' />
          </Form.Item>
        </div>
      </div>

      <div className='headingWrap'>
        <h2 className='heading'>Domain Detail</h2>
        <div className='note'>You can connect your custom domain here.</div>
      </div>
      

      <div className='mb-4'>
        <Form.Item label='Enable CustomDomain?' name='enableCustomDomain' rules={[{ required: true, message: "Enable CustomDomain required." }]} valuePropName='checked' className="mb-0">
          <Switch disabled={!hasSubscription} />
        </Form.Item>
        <UpgradeNote show={!hasSubscription} />
      </div>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.channel !== currentValues.channel}>
        {({ getFieldValue }) => {
          const enableCustomDomain = getFieldValue("enableCustomDomain");
          return enableCustomDomain ? (
            <React.Fragment>
              <Form.Item
                label='Custom Domain'
                name='host'
                rules={[
                  {
                    // required: true,
                    message: "Custom Domain required.",
                    // type: 'url'
                  },
                ]}
                extra={<HelpMarkup text={domainHelp} />}
              >
                <Input placeholder="mysite.productutor.com" />
              </Form.Item>
            </React.Fragment>
          ) : null;
        }}
      </Form.Item>

      <div className='row'>
        <div className='col-md-6'>
          <Form.Item label='Sub Domain' extra={<HelpMarkup text={"This will be the URL to access your website."} />}>
            <Input className='disabled' readOnly addonBefore='https://' suffix=".docs.pub" value={subDomain} />
          </Form.Item>
        </div>
      </div>

      

    </React.Fragment>
  );
};

export default Configuration;
