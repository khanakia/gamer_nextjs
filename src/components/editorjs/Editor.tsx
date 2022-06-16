/* eslint-disable react-hooks/exhaustive-deps */
import { default as React, useEffect, useRef, useState } from 'react';
import EditorJS, {LogLevels} from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import Delimiter from '@editorjs/delimiter';
import NestedList from '@editorjs/nested-list';
import Table from '@editorjs/table';

import HrTool from './tools/Hr/HrTool';
import IframeTool from './tools/Iframe/tool';
import ImageTool from './tools/Image/tool';


const DEFAULT_INITIAL_DATA = () => {
  return {
    "time": new Date().getTime(),
    "blocks": [
      // {
      //   "type": "header",
      //   "data": {
      //     "text": "This is my awesome editor!",
      //     "level": 1
      //   }
      // },

      // {
      //   "type": "iframe",
      //   "data": {
      //     "src": "https://khanakia.com",
      //   }
      // },

      // {
      //   "type": "iframe",
      //   "data": {
      //     "src": "https://khanakia2.com",
      //   }
      // },
    ]
  }
}

const EDITTOR_HOLDER_ID = 'editorjs';

const Editor = (props: {onDataChange?: (data: any) => void}) => {
  const { onDataChange } = props;
  const ejInstance = useRef<any>();
  const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    }
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: "ERROR" as LogLevels.ERROR,
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async (api, event) => {
        let content = await ejInstance.current.save()
        // console.log(content)
        setEditorData(content);
        if(typeof onDataChange=="function") {
          onDataChange(content);
        }
      },
      autofocus: true,
      tools: { 
        header: Header, 
        delimiter: Delimiter,
        list: {
          class: NestedList,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true,
          shortcut: 'CMD+ALT+T'
        },
        image: ImageTool,
        hr: HrTool,
        iframe: IframeTool
      }, 
    });
  };

  return (
    <React.Fragment>
      <div id={EDITTOR_HOLDER_ID}> </div>
    </React.Fragment>
  );
}

export default Editor;