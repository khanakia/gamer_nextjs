import { default as React } from 'react';
import ReactDOM from 'react-dom';
import Hr from './Hr';

interface HrData {
  class?: string;
}

interface HrConfig {
  placeholder: string;
  levels: number[];
  defaultLevel: number;
}


export default class HrTool {

  public data: HrData;
  public readOnly: boolean;
  public api: object;
  public CSS: any
  public nodes: any

  static get toolbox() {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z"/></svg>`,
      title: 'Hr',
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  constructor(config : { data: HrData, config: HrConfig, api: object, readOnly:boolean }) {
    this.api = config.api as any;
    this.readOnly = config?.readOnly;
    this.data = {
    };

    this.CSS = {
      wrapper: 'editor-hr',
    };

    this.nodes = {
      holder: null,
    };
  }

  render() {
    const rootNode = document.createElement('div');
    rootNode.setAttribute('class', this.CSS.wrapper);
    this.nodes.holder = rootNode;

    const onDataChange = (newData: any) => {
      this.data = {
        ...newData
      };
    }

    ReactDOM.render(
      (
        <Hr
          onDataChange={onDataChange}
          readOnly={this.readOnly}
          defaultValue={this.data} />
      ),
      rootNode);

    return this.nodes.holder;
  }

  save() {
    return this.data;
  }
}