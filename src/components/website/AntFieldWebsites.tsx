import React, { useCallback, useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber, Switch, Cascader } from "antd";
import gqlErrorFirstMessage from "src/packages/string-fns/gqlErrorFirstMessage";
import { getGqlClient } from "src/lib/gql";
import objGetPath from "src/packages/string-fns/objGetPath";
export const queryWebsites = `
  query websites {
    websites {
     id
     name
    }
  }
`;


const AntFieldWebsites = (props: {data?: any}) => {
	// const { data } = props
  // const client = useApolloClient();
  const [items, setItems] = useState<any>([]);

  const fetchSites = useCallback(() => {
    getGqlClient()
      .request(queryWebsites)
      .then((res) => {
        // console.log(res);
        const items1 = objGetPath(res, "websites");
        setItems(items1);
      })
      .catch((err) => {
        // console.log(err);
        // const msg = gqlErrorFirstMessage(err, {
        //   capitalize: true,
        // });
        // message.error(msg);
      })
      .finally(() => {
      
      });
  }, [])

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);



	// useEffect(() => {
	// 	setItems(data);
	// }, [JSON.stringify(data)])


	return (
		<Form.Item
			label={'Website'}
			name="websiteId"
			rules={[{ required: true, message: "Website Required." }]}
			// initialValue={txType}
    >
			<Select style={{ width: "100%" }} placeholder="Select Website">
				{items.map((item: any) => {
					return (
						<Select.Option key={item?.id} value={item?.id} >
							{item?.name}
						</Select.Option>
					);
				})}
			</Select>
		</Form.Item>
	);
};

export default AntFieldWebsites