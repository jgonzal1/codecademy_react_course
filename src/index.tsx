import './index.css';
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import $ from 'jquery';

const root = ReactDOM.createRoot(
  document.getElementById('root')??document.createElement('div')
);

interface CssJsTabsProps {
  css: string,
  enableCrudButtons: boolean,
  isJavascript?: boolean,
  javascript: string,
  selectedTab: string,
  tabs: any,
  typeOfCode: string,
  tabNameToManage: string
}
interface CssJsTabsState {
  css: string,
  enableCrudButtons: boolean,
  isJavascript?: boolean,
  loaded?: boolean,
  javascript: string,
  selectedTab: string,
  tabs: any,
  typeOfCode: string,
  tabNameToManage: string
};

interface CodeBodyProps {
  css: string,
  isJavascript: boolean,
  javascript: string,
  selectedTab: string,
  typeOfCode: string,
  tabName: string
}
interface CodeBodyState {
  css: string,
  isJavascript: boolean,
  javascript: string,
  selectedTab: string,
  typeOfCode: string,
  tabName: string
};
export const Panel = (
  {children, testId}: {children: ReactNode; testId?: string;}
) => (
  <div data-testid={testId}>{children}</div>
);

class _ extends React.Component<CssJsTabsProps, CssJsTabsState> {

  constructor(props) {
    super(props)
    this.state = {
      css: "",
      enableCrudButtons: false,
      javascript: "",
      loaded: false,
      selectedTab: "javascript",
      tabs: [{
        content: <></>,
        enabled: true,
        label: "-",
        tabStyle: {},
        testId: "-Tab"
      }],
      typeOfCode: "",
      tabNameToManage: ""
    }
  }

  componentDidMount() {
    this.setState({
      css: this.props.css,
      enableCrudButtons: this.props.enableCrudButtons,
      javascript: this.props.javascript,
      loaded: true,
      selectedTab: this.props.selectedTab,
      tabs: this.props.tabs,
      typeOfCode: this.props.typeOfCode,
      tabNameToManage: this.props.tabNameToManage
    });
  }
}

class CodeBody extends React.Component<CodeBodyProps, CodeBodyState> {

  constructor(props) {
    super(props)
    this.state = {
      css: "",
      isJavascript: false,
      javascript: "",
      selectedTab: "javascript",
      typeOfCode: "",
      tabName: ""
    }
  }

  change(ev) {
    const s = {...this.state};
    if (this.state.isJavascript) {
        s.javascript = ev.target.value;
    } else {
        s.css = ev.target.value;
    }
    this.setState(s);
  };

  // OK : console.log(this.state);

  render() {
    return (<div>
    <p>{this.state.isJavascript ?
      <span>
        Remember to add clear javascript, and do not use&nbsp;
        <code>{"<"}script{">"}</code> or other HTML tags.<br/>
        As a good practice, run the js trough a validator
        such as <a href="https://codebeautify.org/jsvalidate"
        >code beautify</a> before saving.
      </span>:
      null}
    </p>

    <textarea
      style={{"width": "100%", "height": "320px"}}
      onChange={(ev)=>this.change(ev)}
      defaultValue={ this.state.isJavascript ? this.state.javascript : this.state.css }
    >{/**/}
    </textarea>

    <p>
      Note: you need to reload the page to observe
      your newly saved { this.state.isJavascript ? "javascript" : "css" }.
    </p>
  </div>)
  }
}

class ManageAdditionalTabs extends React.Component<CssJsTabsProps, CssJsTabsState> {
  constructor(props) {
    super(props)
    this.state = {
      css: "",
      enableCrudButtons: false,
      javascript: "",
      selectedTab: "javascript",
      tabs: [{
        content: <></>,
        enabled: true,
        label: "-",
        tabStyle: {},
        testId: "-Tab"
      }],
      typeOfCode: "",
      tabNameToManage: ""
    }
  }

  
  modifyTabsVarBasedOnUpsert(settings: {
    css: string,
    enabled: boolean,
    isJavascript: boolean,
    javascript: string,
    previousTab: any,
    selectedTab: string,
    tabName: string,
    tabs: any,
    typeOfCode: string,
  }) {
    const tabToUpsert = {
      "content": <CodeBody
        css=''
        isJavascript={settings.isJavascript}
        javascript=''
        selectedTab=''
        tabName=''
        typeOfCode=''
      />,
      "enabled": settings.enabled,
      "isJavascript": settings.isJavascript,
      "label": settings.tabName,
      "tabStyle": { color: `var(--dark-${
        settings.isJavascript?"yellow":"blue"
      })` },
      "testId": settings.tabName+"Tab",
    };
    let tabs = settings.tabs;
    if(!settings.previousTab) {
      console.log("Inserting tab", settings.tabName, "\n\n");
      tabs.push(tabToUpsert);
      let domTabs = document.querySelectorAll('[role="tablist"]')[0].children;
      Array.from(domTabs).map(k=>
        k.setAttribute(
          "aria-setsize", 
          (domTabs.length+1).toString()
        )
      );
    } else {
      console.log("Modifying tab", settings.tabName, "\n\n");
      tabs = tabs.map(existingTab => {
        if(existingTab.label === settings.tabName) {
          return tabToUpsert;
        } else {
          return existingTab;
        }
      });
    }
    return tabs;
  }

  /**
 *  const typeCode = isJavascript ? "JS" : "CSS";
 *  const nodeToClone = document.querySelector(`[data-testid="Default ${typeCode}Tab"]`);
 *  if(!nodeToClone) {
 *    console.error("Node to clone was null");
 *  }
 *  workingTab = document.querySelector(`[data-testid="${tabName}Tab"]`);
 *  workingTab.setAttribute("aria-posinset", (domTabs.length+1).toString());
 *  workingTab.setAttribute("data-testid", tabName+"Tab");
 *  document.querySelector('[role="tablist"]').appendChild(workingTab);
 * 
 *  workingTab.innerText = tabName;
 * 
 *  ToDo set <AuiTabs tabs[k]content: this.renderCont(true)
 *  ToDo and save status correctly to API
 *  ToDo TypeCode, Enabled and InnerContents behavior
 *  ToDo textAreas are written in renderCont()
 */
  upsertTab() {
    const tabName = $("#tabNameToManage").value;
    console.log("tabName on upsert", tabName);
    if(tabName.search("\"")!==-1) { alert("Please select a tab name without quotes"); return; }
    const isJavascript = $("#typeCode").checked;
    const enabled = $("#enabled").checked;
    let tabs = this.state.tabs;
    console.log(`Tabs on upsertTab: ${tabs.map(t=>t.label)}.`);
    const previousTab = tabs.filter(
      tab => tab.label === tabName
    )[0];
    let previousCustomTabCheckers = {};
    if(!!previousTab && previousTab.length) {
      previousCustomTabCheckers = previousTab.map(
        t => {
          return {
            "enabled": t.enabled,
            "isJavascript": t.isJavascript,
            "testId": t.tabName+"Tab",
          }
        }
      );
    }
    const newCustomTabCheckers = {
        "enabled": enabled,
        "isJavascript": isJavascript,
        "testId": tabName+"Tab",
    };
    console.log(
      "tab", tabName,
      "previousCustomTab", previousCustomTabCheckers,
      "newCustomTab", newCustomTabCheckers
    );
    if(
      Object.keys(previousCustomTabCheckers).length &&
      previousCustomTabCheckers["testId"] === newCustomTabCheckers["testId"] &&
      previousCustomTabCheckers["isJavascript"] === newCustomTabCheckers["isJavascript"] &&
      previousCustomTabCheckers["enabled"] === newCustomTabCheckers["enabled"]
    ) {
      console.log("No changes on Global JS/CSS tab Upsert");
      return;
    }
    tabs = this.modifyTabsVarBasedOnUpsert({
      css: this.state.css,
      enabled: enabled,
      isJavascript: isJavascript,
      javascript: this.state.javascript,
      previousTab: previousTab,
      selectedTab: this.state.selectedTab,
      tabName: tabName,
      tabs: tabs,
      typeOfCode: this.state.typeOfCode
    })
    this.setState(
      state => ({ tabs: Object.assign([], state.tabs, tabs) })
    );
  }

  deleteTab() {
    //@ts-ignore
    const tabName = document.getElementById("tabName").value;
    if(tabName.search("\"")!==-1) {
      alert("Please select a tab name without quotes");
      return;
    }
    const tabs = this.state.tabs;
    const tabToDeleteAsChild = tabs.filter(
      tab => tab.label === tabName
    );
    
    if(!tabToDeleteAsChild.length) {
      console.log("The provided tab", tabName, "does not exist");
      return;
    } 
    const tabsAfterDeletion = tabs.filter(tab => tab.label!==tabName);
    let stateToModify = {...this.state};
    stateToModify.tabs = tabsAfterDeletion;
    //const tabInDom = document.querySelector(`[data-testid="${tabName}Tab"]`);
    //if(!tabInDom) {
    //  console.log("The provided tab", tabName, "does not exist");
    //  return;
    //}
    this.setState( stateToModify );
    let tabsDom = document.querySelectorAll('[role="tablist"]')[0].children;
    Array.from(tabsDom).map(
      k => k.setAttribute(
        "aria-setsize",
        (tabs.length-1).toString()
      )
    );
    //tabInDom.remove();
    console.log(`Deleted tab ${tabName}.\n`);
  }

  render() {
    return (<div>
      <div style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          margin: "0.6em 0" // top&bot left&right
      }}>
          <label htmlFor="typeCode" style={{textAlign: 'right', fontWeight: "bold"}}>Type of code:&nbsp;</label>
          <div>CSS <label className="switch">
            <input id="typeCode" type="checkbox"/>
            <span className="slider round"></span>
          </label> JavaScript</div>
          <label htmlFor="tabName" style={{textAlign: 'right', fontWeight: "bold"}}>Tab name:&nbsp;</label>
          <input
            id="tabNameToManage"
            onChange={AuiTabs.onTextSettingsChange}
            type="text"
            defaultValue={this.state.tabNameToManage}
          ></input>
          <label htmlFor="enabled" style={{textAlign: 'right', fontWeight: "bold"}}>Enabled:&nbsp;</label>
          <div> {/* Enables the checkbox to be aligned to the left*/}
            <input id="enabled" type='checkbox' style={{marginLeft: 0}}></input>
          </div>
      </div>
      <button className={this.state.enableCrudButtons?"":"disabled"} style={{
          backgroundColor: "var(--light-patina)",
          border: "1px solid var(--gray)",
          borderRadius: "0.3em",
          opacity: "0.8"
      }} onClick={()=>this.upsertTab()}>Upsert</button>&nbsp;
      <button className={this.state.enableCrudButtons?"":"disabled"} style={{
          backgroundColor: "var(--orange)",
          border: "1px solid var(--gray)",
          borderRadius: "0.3em",
          opacity: "0.8"
      }} onClick={()=>this.deleteTab()}>Delete</button>
  </div>)
  }
}

class AuiTabs extends React.Component<CssJsTabsProps, CssJsTabsState> {
  static onTextSettingsChange: any;

  constructor(props) {
    super(props)
    this.state = {
      css: "",
      enableCrudButtons: false,
      javascript: "",
      selectedTab: "javascript",
      tabs: [{
        content: <></>,
        enabled: true,
        label: "-",
        tabStyle: {},
        testId: "-Tab"
      }],
      typeOfCode: "",
      tabNameToManage: ""
    }
  }

  componentDidMount() {
    let loadedState = {
      loaded: true,
      css: this.props.css,
      enableCrudButtons: this.props.enableCrudButtons,
      javascript: this.props.javascript,
      selectedTab: this.props.selectedTab,
      tabs: this.props.tabs,
      typeOfCode: this.props.typeOfCode,
      tabNameToManage: this.props.tabNameToManage
    };
    this.props.tabs.map((tab,i) => {
      if(tab["isJavascript"] !== undefined) {
        loadedState.tabs[i].content = this.renderCont(tab.isJavascript);
      } else if (tab["label"] === "⚙") {
        loadedState.tabs[i].content = <ManageAdditionalTabs
         css={this.props.css}
         enableCrudButtons={this.props.enableCrudButtons}
         javascript={this.props.javascript}
         selectedTab={this.props.selectedTab}
         tabs={this.props.tabs}
         typeOfCode={this.props.typeOfCode}
         tabNameToManage={this.props.tabNameToManage}
        />;
      }
    });
    this.setState(loadedState);
  }

  onTextSettingsChange(e) {
    this.setState(
      //@ts-ignore-next-line
      {[e.target.id]: e.target.value},
      () => {
        if (this.state.tabNameToManage) {
          this.setState({ enableCrudButtons: true });
        } else {
          this.setState({ enableCrudButtons: false });
        }
      }
    );
  }

  renderCont(isJavascript) {

    const change = ((ev) => {
        const s = {...this.state};
        if (isJavascript) {
            s.javascript = ev.target.value;
        } else {
            s.css = ev.target.value;
        }
        this.setState(s);
    }).bind(this);

    // OK : console.log(this.state);

    return (<div>
      <p>{isJavascript ?
        <span>
          Remember to add clear javascript, and do not use&nbsp;
          <code>{"<"}script{">"}</code> or other HTML tags.<br/>
          As a good practice, run the js trough a validator
          such as <a href="https://codebeautify.org/jsvalidate"
          >code beautify</a> before saving.
        </span>:
        null}
      </p>

      <textarea
        style={{"width": "100%", "height": "320px"}}
        onChange={change.bind(this)}
        defaultValue={isJavascript ? this.state.javascript : this.state.css}
      >{/**/}
      </textarea>

      <p>
        Note: you need to reload the page to observe
        your newly saved { isJavascript ? "javascript" : "css" }.
      </p>
    </div>)
  }

  render() {

    if(this.state.loaded && this.state.tabs) {
      console.log(
        "AuiTabs.state on render\n", {
          "css":this.state.css
          ,"enableCrudButtons": this.state.enableCrudButtons
          ,"javascript":this.state.javascript
          ,"selectedTab":this.state.selectedTab
          ,"typeOfCode":this.state.typeOfCode
          ,"tabNameToManage":this.state.tabNameToManage
        },
        "  tabs.label\n",
        this.state.tabs.map(t=>t.label),
        "\n\n"
      );
      const tabs = this.state.tabs;
      const tabHeaders = tabs.map((val) => (
        <Tab testId={val.testId+"Tab"} key={val.testId+"Tab"}>
          <span style={val.tabStyle}>{val.label}</span>
        </Tab>
      ));
      const tabPanels = tabs.map((val) => (
        <TabPanel testId={val.testId+"TabPanel"} key={val.testId+"TabPanel"}>
          <Panel testId={val.testId+"TPanel"} key={val.testId+"TPanel"}>
            {val.content}
          </Panel>
        </TabPanel>
      ));
      return (<React.Fragment>
        <Tabs onChange = {
            (index) => console.log(`Selected Tab #${index + 1}.`)
          }
          id="tabsParent"
        >
          <TabList>{tabHeaders}</TabList>
          {tabPanels}
        </Tabs>
      </React.Fragment>)
    } else {
      return <div>Awaiting AuiTabs mount</div>
    }
  }
}

class ModalInterface extends React.Component<CssJsTabsProps, CssJsTabsState> {
  constructor(props) {
    super(props);
    this.state = {
      css: "",         enableCrudButtons: false,
      javascript: "",  selectedTab: "javascript",
      tabs: [{
        content: null, enabled: true,
        isJavascript: true,
        label: "Default JS",
        tabStyle: { fontSize: "1.2em", color: "var(--dark-yellow)" },
        testId: "Default JSTab",
      }, {
        content: null, enabled: true,
        isJavascript: false,
        label: "Default CSS",
        tabStyle: { fontSize: "1.2em", color: "var(--dark-blue)" },
        testId: "Default CSSTab",
      }, {
        content: null, label: "⚙",
        tabStyle: { fontSize: "1.2em", fontWeight: "bolder", color: "var(--gray)" },
        testId: "⚙Tab",
      }],
      typeOfCode: "",  tabNameToManage: ""
    };
  }
  /**
   * ```json
   * "state": {
   *   "css": "string",         "enableCrudButtons": "boolean", "loaded": "boolean|undefined",
   *   "javascript": "string",  "selectedTab": "string",        "tabs": "any",
   *   "typeOfCode": "string",  "tabNameToManage": "string"
   * };
   * ```
   */
  onChange(e) {
    this.setState(
      //@ts-ignore-next-line
      {[e.target.id]: e.target.value},
      () => {
        console.log("Managing enabeCrudButtons change")
        if (this.state.typeOfCode && this.state.tabNameToManage) {
          this.setState({ enableCrudButtons: true });
        } else {
          this.setState({ enableCrudButtons: false });
        }
      }
    );
  }

  updateUi() {
    console.log("updatedUi", this.state);
  }
  render() {
    return (
      <React.Fragment>
        <label htmlFor="typeOfCode">typeOfCode</label>&nbsp;
        <input
          type="text"
          id="typeOfCode"
          name="typeOfCode"
          onChange={this.onChange.bind(this)}
          value={this.state.typeOfCode}
        />
        <br/>
        <label htmlFor="tabNameToManage">tabNameToManage</label>&nbsp;
        <input
          type="text"
          id="tabNameToManage"
          name="tabNameToManage"
          onChange={this.onChange.bind(this)}
          value={this.state.tabNameToManage}
        />
        <br/>
        <button disabled={!this.state.enableCrudButtons}
          onClick={()=>this.updateUi()}
        >Set States</button>
        <AuiTabs
          css={this.state.css}
          enableCrudButtons={this.state.enableCrudButtons}
          javascript={this.state.javascript}
          selectedTab={this.state.selectedTab}
          tabs={this.state.tabs}
          typeOfCode={this.state.typeOfCode}
          tabNameToManage={this.state.tabNameToManage}
        />
      </React.Fragment>
    );
  }
}

root.render(<ModalInterface
  css={''} enableCrudButtons={false} javascript={''}
  selectedTab={''} tabs={undefined}
  typeOfCode={''} tabNameToManage={''}
/>);
