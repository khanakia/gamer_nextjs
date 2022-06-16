import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Select } from "antd";
const { Option } = Select;

import { useFormContext } from "../context";

const colors = {
  'default': {
    'themeColorBodyBg' : "#fafafa",
    'themeColorNavBg' : "#333e52",
    'themeColorNavLink' : "#fff",
    'themeColorNavLinkActive' : "#fff",
    'themeColorNavBorder' : "#333e52",
    'themeColorPostSidebarBg' : "#f4f4f4",
    'themeColorPostSidebarHeading' : "#6564e9",
    'themeColorPostSidebarBorder' : "#d5dce3",
    'colorPrimary' : "#333e52",
    'colorSecondary' : "#172b4d",
    'colorLink' : "#0052cc",
    'colorLinkActive' : "#0d6efd",
  },

  'preset1': {
    'themeColorBodyBg' : "#fff",
    'themeColorNavBg' : "#fff",
    'themeColorNavLink' : "#000",
    'themeColorNavLinkActive' : "#0d6efd",
    'themeColorNavBorder' : "#E4E8ED",
    'themeColorPostSidebarBg' : "#fff",
    'themeColorPostSidebarHeading' : "#0041EB",
    'themeColorPostSidebarBorder' : "#E4E8ED",
    'colorPrimary' : "#0041EB",
    'colorSecondary' : "#172b4d",
    'colorLink' : "#0052cc",
    'colorLinkActive' : "#0d6efd"
  }
}

function ColorPresetSelect() {
  const fc = useFormContext();
  function onChange(value) {
    console.log(`selected ${value}`);
    const values = (colors[value] || colors['default'])
    fc.form.setFieldsValue(values)
  }
  
  // function onSearch(val) {
  //   console.log('search:', val);
  // }

  return (
    <React.Fragment>
      <Select
        showSearch
        placeholder="Select a preset"
        optionFilterProp="children"
        onChange={onChange}
        // onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="default">Default</Option>
        <Option value="preset1">Preset1</Option>
      </Select>
    </React.Fragment>
  );
}

export default ColorPresetSelect;
