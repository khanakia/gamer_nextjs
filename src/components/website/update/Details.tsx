import React from "react";
import { Form, Input, Select } from "antd";
import SoftDeleteButton from "./SoftDeleteButton";
import { useFormContext } from "../context";
import ResyncContentfulButton from "./ResyncContentfulButton";


const Details = (props: any = {}) => {
  const {} = props;
  const fc = useFormContext();
  // const subDomain = fc.website.subDomain;
  return (
    <React.Fragment>
      <div className='headingWrap mt-3'>
        <h2 className='heading'>Connected Channel</h2>
        <div className='note'>This shows the channel you connected at the time of creating website.</div>
      </div>
      <Form.Item
        label='Channel'
        // name='channel'
        rules={[{ required: true, message: "Channel required." }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder='Select'
          optionFilterProp='children'
          value={fc.website.channel}
          disabled
        >
          <Select.Option key={1} value={"wordpress"}>
            Wordpress
          </Select.Option>
          <Select.Option key={2} value={"contentful"}>
            Contentful
          </Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.channel !== currentValues.channel}>
        {({ getFieldValue }) => {
          const channel = getFieldValue("channel");
          const show = channel == "wordpress" ? true : false;
          // console.log("show", show)

          return show ? (
            <>
            <React.Fragment>
              <Form.Item
                label='WP Host'
                // name='apiHost'
                // rules={[{ required: true, message: "Field required." }]}
              >
                <Input readOnly disabled value={fc.website.wpHost} />
              </Form.Item>
            </React.Fragment>
            
            <a target="_blank" rel="noreferrer" href={`${fc.website.wpHost}/wp-json/wp-pt-docs/v1/dash?key=${fc.website.wpApiKey}`} className="btn btn-main ">Login to Dashboard</a>
            </>
          ) : null;
        }}
      </Form.Item>
      {
        fc.website.channel === "contentful" ? <ResyncContentfulButton id={fc.website.id} /> : null
      }
      
      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.channel !== currentValues.channel}>
        {({ getFieldValue }) => {
          const channel = getFieldValue("channel");
          const show = channel == "contentful" ? true : false;
          // console.log("show", show)

          return show ? (
            <React.Fragment>
              <Form.Item label='Contentful CMS AccessToken'>
                <Input readOnly disabled value={fc.website.contentfulCmsAccessToken} />
              </Form.Item>

              <Form.Item label='Contentful SpaceID'>
                <Input readOnly disabled value={fc.website.contentfulSpaceID} />
              </Form.Item>

              <Form.Item label='Contentful DeliveryAccess Token'>
                <Input readOnly disabled value={fc.website.contentfulDeliveryAccessToken} />
              </Form.Item>
            </React.Fragment>
          ) : null;
        }}
      </Form.Item>
      
      <div className='headingWrap mt-5'>
        <h2 className='heading'>API</h2>
        <div className='note'>This key can be used to access productutor API.</div>
      </div>
      <React.Fragment>
        <Form.Item
          label='Api Key'
          // name='apiHost'
          // rules={[{ required: true, message: "Field required." }]}
        >
          <Input readOnly disabled value={fc.website.apiKey} />
        </Form.Item>
      </React.Fragment>
      
      <div className='headingWrap mt-5'>
        <h2 className='heading'>Archive Webiste</h2>
        <div className='note'>This will delete your site.</div>
      </div>
      <div className="mb-5">
        <SoftDeleteButton id={fc.form.getFieldValue("id")} />
      </div>
    </React.Fragment>

  );
};

export default Details;
