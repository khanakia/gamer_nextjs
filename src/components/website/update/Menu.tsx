import React from "react";
import Link from "next/link";
import { Form, Input, Select, Switch } from "antd";
import HelpMarkup from "src/components/mix/HelpMarkup";
import HtmlMarkup from "src/components/mix/HtmlMarkup";
import objGetPath from "src/packages/string-fns/objGetPath";
import { useFormContext } from "../context";
import UploadFormItem from "../fields/UploadFormItem";
const domainHelp = `Enter domain without http:// or https://<br/>
You must have already purchased a domain via a domain name provider like GoDaddy. Once purchased you will need to create CNAME record as follows. <br/>
CNAME record for docs.YOUR_DOMAIN pointing to sites.Gamerapp.com
`;

const Configuration = (props: any = {}) => {
  const {} = props;
  const fc = useFormContext();
  const menus = objGetPath(fc, "response.p_menus", [])
  // console.log(menus)

  return (
    <React.Fragment>
      <div className='note mb-3'>This will override the Main Menu in the header.</div>
      <Form.Item label='Override Main Menu ?' name='overrideMainMenu' valuePropName='checked'>
        <Switch />
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.channel !== currentValues.channel}>
        {({ getFieldValue }) => {
          const show = getFieldValue("overrideMainMenu");
          return show ? (
            <React.Fragment>
                <Form.Item label='Main Menu' name='mainMenuId'>
                  <Select
                    style={{ width: "100%" }}
                    placeholder='Select'
                    optionFilterProp='children'          
                  >
                    <Select.Option value="00000000-0000-0000-0000-000000000000">Select Menu</Select.Option>
                    {menus.map((item: any, i: number) => {
                      // console.log(item)
                      return (
                        <Select.Option key={i} value={item.id}>
                          {item.name}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
            </React.Fragment>
          ) : null;
        }}
      </Form.Item>

      <div className='headingWrap'>
        <h2 className='heading'>Custom Footer Links</h2>
        <div className='note'>Add Custom Links to the footer.</div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <UploadFormItem field='customMenu1IconId' displayfield='customMenu1IconUrl' label='Custom Menu Icon 1' />
        </div>

        <div className='col-md-8'>
          <Form.Item label='Custom Menu Pre Title 1' name='customMenu1PreTitle'>
            <Input />
          </Form.Item>

          <Form.Item label='Custom Menu Title 1' name='customMenu1Title'>
            <Input />
          </Form.Item>

          <Form.Item label='Custom Menu Link 1' name='customMenu1Link'>
            <Input />
          </Form.Item>
        </div>

        <div className='col-md-4'>
          <UploadFormItem field='customMenu2IconId' displayfield='customMenu2IconUrl' label='Custom Menu Icon 2' />
        </div>

        <div className='col-md-8'>
          <Form.Item label='Custom Menu Pre Title 2' name='customMenu2PreTitle'>
            <Input />
          </Form.Item>

          <Form.Item label='Custom Menu Title 2' name='customMenu2Title'>
            <Input />
          </Form.Item>

          <Form.Item label='Custom Menu Link 2' name='customMenu2Link'>
            <Input />
          </Form.Item>
        </div>

        <div className='col-md-4'>
          <UploadFormItem field='customMenu3IconId' displayfield='customMenu3IconUrl' label='Custom Menu Icon 3' />
        </div>

        <div className='col-md-8'>
          <Form.Item label='Custom Menu Pre Title 3' name='customMenu3PreTitle'>
            <Input />
          </Form.Item>

          <Form.Item label='Custom Menu Title 3' name='customMenu3Title'>
            <Input />
          </Form.Item>

          <Form.Item label='Custom Menu Link 3' name='customMenu3Link'>
            <Input />
          </Form.Item>
        </div>
      </div>
     

      <Form.Item label='Footer Menu Title' name='footerMenu1Title' extra='Will be used as footer menu heading'>
        <Input />
      </Form.Item>

      <Form.Item label='Footer Menu' name='footerMenuId1' extra={<HtmlMarkup>Will be used as footer menu. <Link href="/menus"><a>Click here to Manage Menus</a></Link></HtmlMarkup>}>
        <Select
          style={{ width: "100%" }}
          placeholder='Select'
          optionFilterProp='children'          
        >
          <Select.Option value="00000000-0000-0000-0000-000000000000">Select Menu</Select.Option>
          {menus.map((item: any, i: number) => {
            // console.log(item)
            return (
              <Select.Option key={i} value={item.id}>
                {item.name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>

      <Form.Item label='Privacy Menu' name='privacyMenuId'>
        <Select
          style={{ width: "100%" }}
          placeholder='Select'
          optionFilterProp='children'          
        >
          <Select.Option value="00000000-0000-0000-0000-000000000000">Select Menu</Select.Option>
          {menus.map((item: any, i: number) => {
            // console.log(item)
            return (
              <Select.Option key={i} value={item.id}>
                {item.name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>


      <Form.Item label='Privacy Page Link' name='privacyLink' extra={"Add your site privacy policy page link. Will be used in schema and newswletter form in footer."}>
        <Input />
      </Form.Item>

    </React.Fragment>
  );
};

export default Configuration;
