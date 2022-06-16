import { default as React, useEffect, useRef, useState } from 'react';

const DEFAULT_INITIAL_DATA = () => {
  return {
    "class": "dotted",
  }
}

type HrToolProps = {
  onDataChange?: (data: any) => void
  defaultValue?: any
  readOnly?: boolean
}

const Hr = (props: HrToolProps) => {
  const { onDataChange, defaultValue } = props;
  const [data, setData] = useState(defaultValue||DEFAULT_INITIAL_DATA);

  return (
    <div className="alert alert-info">
      Horizontal Ruler
    </div>
  );
}

export default Hr;