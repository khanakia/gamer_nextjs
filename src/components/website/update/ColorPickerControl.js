import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input } from "antd";
import { SliderPicker } from "react-color";
import { useFormContext } from "../context";

function ColorDisplay(props) {
  const { color } = props;
  return (
    <span className='colorDisplay' style={{ backgroundColor: color }}>
      &nbsp;
    </span>
  );
}

function ColorPickerControl(props) {
  const { name, label = "Color", note, form } = props;
  const [color, setColor] = useState();

  const fc = useFormContext();

  const handleChange = (colorSelected) => {
    setColor(colorSelected.hex);
    fc.form.setFieldsValue({
      [name]: colorSelected.hex,
    });
  };

  const handleChangeInput = (e) => {
    setColor(e.target.value);
  };

  useEffect(() => {
    setColor(fc.form.getFieldValue(name));
  }, [fc.form.getFieldValue(name)]);

  return (
    <React.Fragment>
      <Form.Item
        className='flex-direction-row'
        label={label}
        name={name}
        rules={[]}
      >
        <Input className='inputColor' addonBefore={<ColorDisplay color={color} />} onChange={handleChangeInput} />
      </Form.Item>
      <Row className='mb-5'>
        <Col span={24}>
          <SliderPicker color={color} onChange={handleChange} />
          <div className='note mt-2'>{note}</div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ColorPickerControl;
