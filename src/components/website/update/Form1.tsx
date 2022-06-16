import React, { useState, useEffect } from "react";
import gqlErrorFirstMessage from "src/packages/string-fns/gqlErrorFirstMessage";
import { getGqlClient } from "src/lib/gql";
import { mutation_websiteUpdate } from "../queries";
import { Form, message, Tabs } from "antd";
const TabPane = Tabs.TabPane;
import AntFormErrorsDisplay from "../AntFormErrorsDisplay";
import { useFormContext } from "../context";
import ShowWrap from "src/components/mix/ShowWrap";
import { useSpinner } from "src/components/spinner/Spinner";
import Basic from "./Basic";
import Layout from "./Layout";
import Menu from "./Menu";
import Business from "./Business";
import Seo from "./Seo";
// import Visual from "./Visual";
import Configuration from "./Configuration";
import Details from "./Details";
import styles from "../Styles.module.scss";
import styleAnt from "styles/Ant.module.scss";
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import { faWindow, faCog, faPaperPlane, faSave, faExternalLink, faPencil, faBullhorn, faPallet, faBars, faBriefcase, faInfoSquare } from "@symbolia/plsicon";

type FormProps = {
  id: string;
  data: any;
};

function TitleWithIcon(props: { title: string; subtitle?: string; icon?: any }) {
  const { title, subtitle, icon } = props;

  return (
    <div>
      {icon ? <FontAwesomeIcon icon={icon} className='me-2' /> : null}
      <span>
        {title}
        {/* {subtitle ? <div>{subtitle}</div> : null} */}
      </span>
    </div>
  );
}

function TabBarExtraContent(props: { fc: any }) {
  const { fc } = props;
  return (
    <div className=''>
      <button className='me-3 btn btn-success ' type='submit'>
        <FontAwesomeIcon icon={faSave} className='ms-211' />
      </button>

      <a className='btn btn-warning ' href={fc.form && fc.form.getFieldValue("siteUrl")} target='blank'>
        <FontAwesomeIcon icon={faExternalLink} className='ms-21' />
      </a>
    </div>
  );
}

export default function Form1(props: FormProps) {
  const { id, data = {} } = props;
  const [formValues, setFormValues] = useState(data);
  // const [form] = Form.useForm();
  const [errors, setErrors] = useState([]);
  const [saveRedirect, setSaveRedirect] = useState(false);
  const spinner = useSpinner();
  const fc = useFormContext();

  const submitForm = () => {
    setSaveRedirect(true);
    fc.form.submit();
  };

  const onFinish = (values: any) => {
    // console.log(values)
    // return
    spinner?.show();
    getGqlClient()
      .request(mutation_websiteUpdate, {
        id: id,
        input: values,
      })
      .then((res) => {
        // console.log(res);
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

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
    setErrors(errorInfo.errorFields);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fc.form.setFieldsValue(formValues);
  }, [JSON.stringify(formValues)]);

  // console.log(errors)

  return (
    <>
      <ShowWrap show={errors.length > 0}>
        <AntFormErrorsDisplay errors={errors} />
      </ShowWrap>

      <Form
        form={fc.form}
        // {...antFormLayout}
        className={styleAnt.AntForm}
        layout='vertical'
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          colorPrimary: "#ff000",
          noIndex: false,
        }}
        onValuesChange={(val) => {
          setFormValues(val);
        }}
      >
        {/* <FormContext.Provider
					value={{
						form: form,
						values: formValues,
						website: data
				}}> */}


        <Tabs type='card' defaultActiveKey='basic' className='AntTabWebsiteForm' tabBarExtraContent={<TabBarExtraContent fc={fc} />}>
          <TabPane tab={<TitleWithIcon title='Basic' icon={faWindow} subtitle='Setup Account Details' />} key={"basic"} forceRender={true}>
            <Basic />
          </TabPane>

          <TabPane tab={<TitleWithIcon title='Layout' icon={faPallet} subtitle='Add Personal Info' />} key={"layout"} forceRender={true}>
            <Layout />
          </TabPane>

          <TabPane tab={<TitleWithIcon title='Menu' icon={faBars} subtitle='Setup Account Details' />} key={"menu"} forceRender={true}>
            <Menu />
          </TabPane>

          <TabPane tab={<TitleWithIcon title='Business' icon={faBriefcase} subtitle='Setup Account Details' />} key={"business"} forceRender={true}>
            <Business />
          </TabPane>

          <TabPane tab={<TitleWithIcon title='SEO' icon={faBullhorn} subtitle='Setup Account Details' />} key={"seo"} forceRender={true}>
            <Seo />
          </TabPane>

          <TabPane tab={<TitleWithIcon title='Configuration' icon={faCog} />} key={"config"} forceRender={true}>
            <Configuration />
          </TabPane>
          {/* 
						<TabPane tab={"Visual"} key={'visual'} forceRender={true}>
              <Visual />
						</TabPane> */}

          <TabPane tab={<TitleWithIcon title='Details' icon={faInfoSquare} />} key={"detail"} forceRender={true}>
            <Details />
          </TabPane>
        </Tabs>
        {/* </FormContext.Provider> */}

        <Form.Item wrapperCol={{ offset: 0, span: 24 }} className='submitBtnRow'>
          {/* <button type="button" onClick={() => submitForm()} className="me-3 btn btn-main ">
						Save
					</button> */}
          <ShowWrap show={!!id}>
            <button className='me-3 btn btn-main ' type='submit'>
              Save <FontAwesomeIcon icon={faSave} className='ms-2' />
            </button>
          </ShowWrap>
        </Form.Item>
      </Form>
    </>
  );
}
