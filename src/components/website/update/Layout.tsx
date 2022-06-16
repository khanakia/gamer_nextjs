import React, { useState } from "react";
import { Form, Input, Button, Select, InputNumber, Switch, Cascader } from "antd";
import UploadFormItem from "../fields/UploadFormItem";
import ColorPickerControl from "./ColorPickerControl";
import ColorPresetSelect from "./ColorPresetSelect";
import { useFormContext } from "../context";
import UpgradeNote from "../UpgradeNote";
const Layout = (props: any = {}) => {
  const {} = props;

  const fc = useFormContext();
  const subDomain = fc.website.subDomain;
  const hasSubscription = fc.website.hasSubscription;

  return (
    <React.Fragment>
      <div className='headingWrap mt-3'>
        <h2 className='heading'>Home Hero Section</h2>
        <div className='note'>This will show the banner and heading on your home page.</div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <UploadFormItem
            field='homeBannerImageId'
            displayfield='homeBannerImageUrl'
            label='Banner Image'
            // required={true}
          />
        </div>
        <div className='col-md-8'>
          <Form.Item label='Home Hero Heading' name='homeBannerHeading'>
            <Input />
          </Form.Item>

          <Form.Item label='Home Hero Heading 2' name='homeBannerHeading2'>
            <Input />
          </Form.Item>

          <Form.Item label='Home Hero Description' name='homeBannerDescr'>
            <Input.TextArea />
          </Form.Item>
        </div>
      </div>

      <div className='headingWrap mt-3'>
        <h2 className='heading'>Override Homepage</h2>
        <div className='note'>This will override your homepage with custom doc post.</div>
      </div>

      <Form.Item label='Override Homepage ?' name='overrideIndexPage' valuePropName='checked'>
        <Switch />
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.channel !== currentValues.channel}>
        {({ getFieldValue }) => {
          const show = getFieldValue("overrideIndexPage");
          return show ? (
            <React.Fragment>
              <Form.Item label='Page Slug' name='overrideIndexPageSlug'>
                <Input />
              </Form.Item>
            </React.Fragment>
          ) : null;
        }}
      </Form.Item>

      <div className='headingWrap'>
        <h2 className='heading'>Theme Settings</h2>
      </div>
      <Form.Item label='Theme' name='theme' rules={[{ required: true, message: "Theme Name required." }]} extra='Select the theme for your site.'>
        <Select style={{ width: "100%" }} placeholder='Select' optionFilterProp='children'>
          <Select.Option key={1} value={"theme1"}>
            Default
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label='Theme Style'
        name='themeStyle'
        rules={[{ required: true, message: "Theme Style required." }]}
        extra='Select the theme style for your site. Different style could affect the site layout and layout related css.'
      >
        <Select style={{ width: "100%" }} placeholder='Select' optionFilterProp='children'>
          <Select.Option key={1} value={"light"}>
            Light
          </Select.Option>
          <Select.Option key={1} value={"dark"}>
            Dark
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label='Theme Font Heading' name='themeFontHeading' rules={[{ required: true, message: "Theme Font required." }]} extra='Select the heading font for your site.'>
        <Select style={{ width: "100%" }} placeholder='Select' optionFilterProp='children'>
          <Select.Option key={1} value={"poppins"}>
            Poppins
          </Select.Option>
          <Select.Option key={1} value={"opensauceone"}>
            Open Sauce One
          </Select.Option>
          <Select.Option key={1} value={"inter"}>
            Google Inter
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label='Theme Font' name='themeFont' rules={[{ required: true, message: "Theme Font required." }]} extra='Select the web font for your site.'>
        <Select style={{ width: "100%" }} placeholder='Select' optionFilterProp='children'>
          <Select.Option key={1} value={"poppins"}>
            Poppins
          </Select.Option>
          <Select.Option key={1} value={"opensauceone"}>
            Open Sauce One
          </Select.Option>
          <Select.Option key={1} value={"inter"}>
            Google Inter
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.channel !== currentValues.channel}>
        {({ getFieldValue }) => {
          const enableCustomDomain = getFieldValue("enableCustomDomain");

          return enableCustomDomain ? (
            <React.Fragment>
              <Form.Item label='NoIndex' name='noIndex' valuePropName='checked' extra='Blog web crawlers using robots.txt'>
                <Switch />
              </Form.Item>

              <Form.Item label='Meta NoIndex' name='metaNoIndex' valuePropName='checked' extra='Blog web crawlers using <meta> tag in <head> tag'>
                <Switch />
              </Form.Item>
            </React.Fragment>
          ) : null;
        }}
      </Form.Item>

      <div className='mb-4'>
        <Form.Item label='Enable Custom HTML Head?' name='enableCustomHtmlHead' valuePropName='checked' className='mb-0'>
          <Switch disabled={!hasSubscription} />
        </Form.Item>
        <UpgradeNote show={!hasSubscription} />
      </div>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.channel !== currentValues.channel}>
        {({ getFieldValue }) => {
          const isEnabled = getFieldValue("enableCustomHtmlHead");
          return isEnabled ? (
            <React.Fragment>
              <Form.Item label='Custom HTML Head' name='customHtmlHead' extra={`<script>console.log("hello")</script>`}>
                <Input.TextArea maxLength={8000} showCount autoSize={{ minRows: 3, maxRows: 20 }} />
              </Form.Item>
            </React.Fragment>
          ) : null;
        }}
      </Form.Item>

      <div className='mb-4'>
        <Form.Item label='Enable Custom HTML Footer?' name='enableCustomHtmlFooter' valuePropName='checked' className='mb-0'>
          <Switch disabled={!hasSubscription} />
        </Form.Item>
        <UpgradeNote show={!hasSubscription} />
      </div>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.channel !== currentValues.channel}>
        {({ getFieldValue }) => {
          const isEnabled = getFieldValue("enableCustomHtmlFooter");
          return isEnabled ? (
            <React.Fragment>
              <Form.Item label='Custom HTML Footer' name='customHtmlFooter' extra={`<script>console.log("hello")</script>`}>
                <Input.TextArea maxLength={8000} showCount autoSize={{ minRows: 3, maxRows: 20 }} />
              </Form.Item>
            </React.Fragment>
          ) : null;
        }}
      </Form.Item>

      <div className='headingWrap'>
        <h2 className='heading'>Color Settings</h2>
        <div className='note'>You can customize the color scheme for your site.</div>
      </div>
{/* 
      <div className='mb-4'>
        <label className='me-2'>Choose Preset:</label>
        <ColorPresetSelect />
        <div className='note'>This will auto populate the colors in below fields.</div>
      </div> */}

      <div className='row'>
        <div className='col-md-3'>
          <ColorPickerControl label={"Primary Color"} name='colorPrimary' note='Pick dark color for best effect. Will be used in Navbar and footer background.' />
        </div>

        {/* <div className='col-md-3 offset-1'>
          <ColorPickerControl label={"Secondary Color"} name='colorSecondary' note='Pick light color for best effect. Will be used as text color for your site.' />
        </div>

        <div className='col-md-3 offset-1'>
          <ColorPickerControl label={"Body Background"} name='themeColorBodyBg' note='Apply background color to body.' />
        </div> */}

        <div className='col-md-3'>
          <ColorPickerControl label={"Link Color"} name='colorLink' note='Pick dark color for best effect.' />
        </div>
{/* 
        <div className='col-md-3 offset-1'>
          <ColorPickerControl label={"Link Color Active"} name='colorLinkActive' note='Pick light color for best effect.' />
        </div>

        <div className='col-md-3 offset-1'>
          <ColorPickerControl label={"Navbar Background"} name='themeColorNavBg' note='Apply background color to Navbar.' />
        </div>

        <div className='col-md-3'>
          <ColorPickerControl label={"Navbar Links"} name='themeColorNavLink' note='Apply color to Navbar Links.' />
        </div>

        <div className='col-md-3 offset-1'>
          <ColorPickerControl label={"Navbar Links Active/Hover"} name='themeColorNavLinkActive' note='Apply color to Navbar Active or Hover Links.' />
        </div>

        <div className='col-md-3 offset-1'>
          <ColorPickerControl label={"Navbar Border"} name='themeColorNavBorder' note='Apply border color to Navbar.' />
        </div>

        <div className='col-md-3'>
          <ColorPickerControl label={"Post Sidebar Background"} name='themeColorPostSidebarBg' note='Apply color to Post Sidebar Background.' />
        </div>

        <div className='col-md-3 offset-1'>
          <ColorPickerControl label={"Post Sidebar Heading"} name='themeColorPostSidebarHeading' note='Apply color to Post Sidebar Heading.' />
        </div>

        <div className='col-md-3 offset-1'>
          <ColorPickerControl label={"Post Sidebar Border"} name='themeColorPostSidebarBorder' note='Apply border color to Post Sidebar.' />
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default Layout;
