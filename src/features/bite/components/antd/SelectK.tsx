import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import dot from "@muft/dot";

interface SelectKProps {
	valueKey?: string;
	displayKey?: string;
	apiFn?: Function;
	resultKey?: Array<string>;
	items?: Array<any>;
	useEffectUpdate?: Array<any>;
	disabled?: boolean;
	showSearch?: boolean;
	mode?: "multiple" | "tags";
	autocomplete?: boolean;
}

const SelectK = (props: SelectKProps = {}) => {
	const { items: itemsList = [], valueKey = "id", displayKey = "title", apiFn = null, resultKey = [], useEffectUpdate=[], autocomplete=true } = props;
	const [form] = Form.useForm();

	const [items, setItems] = useState(itemsList);

	const fetch = async () => {
		if (!apiFn) return;
		const response = await apiFn();
		const items = dot.getArrayValue(response, resultKey, []);
		setItems(items);
	};

	const fixAutocomplete = () => {
		document.querySelectorAll(".ant-select-selector input").forEach((e) => {
			 e.setAttribute("autocomplete", "stopDamnAutocomplete");
			//you can put any value but NOT "off" or "false" because they DO NOT works
		})
	}

	useEffect(() => {
		if(autocomplete==false) {
			fixAutocomplete()
		}
	}, [])

	useEffect(() => {
		fetch();
	}, useEffectUpdate);

	let propsFiltered = Object.assign({}, props);
	delete propsFiltered["apiFn"];
	delete propsFiltered["valueKey"];
	delete propsFiltered["displayKey"];
  delete propsFiltered["resultKey"];
  delete propsFiltered["items"];
	delete propsFiltered["useEffectUpdate"];
	delete propsFiltered["autocomplete"];

	return (
		<Select
			{...propsFiltered}
			// key={Math.random()}
			// showSearch
			style={{ width: "100%" }}
			placeholder="Select"
			optionFilterProp="children"
		>
			{(items||[]).map((d, i) => (
				<Select.Option key={i} value={d[valueKey]}>
					{d[displayKey]}
				</Select.Option>
			))}
		</Select>
	);
};

export default SelectK;
