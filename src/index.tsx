//#region Dependencies
import './index.css';
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import $ from 'jquery';

const root = ReactDOM.createRoot($('#root')[0]);

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
  enableCrudButtons: boolean,
  isJavascript: boolean,
  javascript: string,
  selectedTab: string,
  typeOfCode: string,
  tabName: string
}
interface CodeBodyState {
  css: string,
  enableCrudButtons: boolean,
  isJavascript: boolean,
  javascript: string,
  selectedTab: string,
  typeOfCode: string,
  tabName: string
};
//#endregion

class CodeBody extends React.Component<CodeBodyProps, CodeBodyState> {

  constructor(props) {
    super(props)
    this.state = {
      css: "",
      enableCrudButtons: false,
      isJavascript: false,
      javascript: "",
      selectedTab: "javascript",
      typeOfCode: "",
      tabName: ""
    }
  }

  onTextSettingsChange(e) {
    console.log("CodeBody.onTextSettingsChange")
    this.setState(
      //@ts-ignore-next-line
      {[e.target.id]: e.target.value},
      () => {
        if (this.state.tabName) {
          this.setState({ enableCrudButtons: true });
        } else {
          this.setState({ enableCrudButtons: false });
        }
      }
    );
  }

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
      className="h320 w100p"
      onChange={this.onTextSettingsChange.bind(this)}
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

  /**
   * ```json
   * "state": {
   *   "css": "string",         "enableCrudButtons": "boolean", "loaded": "boolean|undefined",
   *   "javascript": "string",  "selectedTab": "string",        "tabs": "any",
   *   "typeOfCode": "string",  "tabNameToManage": "string"
   * };
   * ```
   */
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

  onTextSettingsChange(e) {
    console.log(
      "ManageAdditionalTabs.onTextSettingsChange",
      e.target.id, e.target.value
    );
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
  
  modifyTabsVarBasedOnUpsert(settings: {
    css: string,
    enabled: boolean,
    isJavascript: boolean,
    javascript: string,
    previousTab: any,
    selectedTab: string,
    tabNameToManage: string,
    tabs: any,
    typeOfCode: string,
  }) {
    const tabToUpsert = {
      "content": <CodeBody
        css=''
        enableCrudButtons={false}
        isJavascript={settings.isJavascript}
        javascript=''
        selectedTab=''
        tabName={settings.tabNameToManage}
        typeOfCode=''
      />,
      "enabled": settings.enabled,
      "isJavascript": settings.isJavascript,
      "label": settings.tabNameToManage,
      "tabStyle": { color: `var(--dark-${
        settings.isJavascript?"yellow":"blue"
      })` },
      "testId": settings.tabNameToManage+"Tab",
    };
    let tabs = settings.tabs;
    if(!settings.previousTab) {
      console.log("Inserting tab", settings.tabNameToManage, "\n\n");
      tabs.push(tabToUpsert);
      let domTabs = document.querySelectorAll('[role="tablist"]')[0].children;
      Array.from(domTabs).map(k=>
        k.setAttribute(
          "aria-setsize", 
          (domTabs.length+1).toString()
        )
      );
    } else {
      console.log("Modifying tab", settings.tabNameToManage, "\n\n");
      tabs = tabs.map(existingTab => {
        if(existingTab.label === settings.tabNameToManage) {
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
    if(this.state.tabNameToManage.search("\"")!==-1) { alert("Please select a tab name without quotes"); return; }
    const isJavascript = $("#typeCode")[0].checked;
    const enabled = $("#enabled")[0].checked;
    console.log("IsJs", isJavascript, "Enabled", enabled);
    let tabs = this.state.tabs;
    console.log(`Tabs on upsertTab: ${tabs.map(t=>t.label)}.`);
    const previousTab = tabs.filter(
      tab => tab.label === this.state.tabNameToManage
    )[0];
    let previousCustomTabCheckers = {};
    if(!!previousTab && previousTab.length) {
      previousCustomTabCheckers = previousTab.map(
        t => {
          return {
            "enabled": t.enabled,
            "isJavascript": t.isJavascript,
            "testId": t.tabNameToManage+"Tab",
          }
        }
      );
    }
    const newCustomTabCheckers = {
        "enabled": enabled,
        "isJavascript": isJavascript,
        "testId": this.state.tabNameToManage+"Tab",
    };
    console.log(
      "tab", this.state.tabNameToManage,
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
      tabNameToManage: this.state.tabNameToManage,
      tabs: tabs,
      typeOfCode: this.state.typeOfCode
    })
    this.setState(
      state => ({ tabs: Object.assign([], state.tabs, tabs) })
    );
  }

  deleteTab() {
    if(this.state.tabNameToManage.search("\"")!==-1) {
      alert("Please select a tab name without quotes");
      return;
    }
    const tabs = this.state.tabs;
    const tabToDeleteAsChild = tabs.filter(
      tab => tab.label === this.state.tabNameToManage
    );
    
    if(!tabToDeleteAsChild.length) {
      console.log("The provided tab", this.state.tabNameToManage, "does not exist");
      return;
    } 
    const tabsAfterDeletion = tabs.filter(tab => tab.label!==this.state.tabNameToManage);
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
    console.log(`Deleted tab ${this.state.tabNameToManage}.\n`);
  }

  render() {
    return (<div>
      <div className="grid-2-cols">
          <label htmlFor="typeCode" className="label-for-input">Type of code:&nbsp;</label>
          <div>CSS <label className="switch">
            <input id="typeCode" type="checkbox"/>
            <span className="slider round"></span>
          </label> JavaScript</div>
          <label htmlFor="tabNameToManage" className="label-for-input">Tab name:&nbsp;</label>
          <input
            id="tabNameToManage"
            onChange={this.onTextSettingsChange.bind(this)}
            type="text"
            defaultValue={this.state.tabNameToManage}
          />
          <label htmlFor="enabled" className="label-for-input">Enabled:&nbsp;</label>
          <div> {/* Enables the checkbox to be aligned to the left*/}
            <input id="enabled" type='checkbox' style={{marginLeft: 0}}/>
          </div>
      </div>
      <button className="custom-css-js-button"
        style={{backgroundColor: "var(--light-patina)"}}
        disabled={!this.state.enableCrudButtons}
        onClick={()=>this.upsertTab()}
      >Upsert</button>&nbsp;
      <button className="custom-css-js-button"
        style={{backgroundColor: "var(--light-orange)"}}
        disabled={!this.state.enableCrudButtons}
        onClick={()=>this.deleteTab()}
      >Delete</button>
  </div>)
  }
}

class AuiTabs extends React.Component<CssJsTabsProps, CssJsTabsState> {
  constructor(props) {
    super(props)
    this.state = structuredClone(this.props) ?? JSON.parse(
      JSON.stringify(this.props)
    ); // when node < 17
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
        return "codeTab";
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
        return "settingsTab";
      }
      return "unknownTab";
    });
    this.setState(loadedState);
  }

  onTextSettingsChange(e) {
    console.log(
      "AuiTabs.onTextSettingsChange", this.state, e.target.value
    ); // ToDo change so every char can actually be seen and the saves are delayed
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
        className="h320 w100p"
        onChange={this.onTextSettingsChange.bind(this)}
        value={ isJavascript ? this.state.javascript : this.state.css }
      >{/*defaultValue allows writing, but value does not*/}
      </textarea>

      <p>
        Note: you need to reload the page to observe
        your newly saved { isJavascript ? "javascript" : "css" }.
      </p>
    </div>)
  }

  Panel = (
    {children, testId}: {children: ReactNode; testId?: string;}
  ) => (
    <div data-testid={testId}>{children}</div>
  );
  

  /** @param _
   * ```json
   *{
   *· "_isAnalyticsEvent": true,
   *· "context": [{
   *·   "componentName": "tabs",
   *·   "packageName": "@atlaskit/tabs",
   *·   "packageVersion": "13.4.3"
   *· }],
   *· "handlers": [],
   *· "hasFired": false,
   *· "payload": {
   *·   "action": "clicked",
   *·   "actionSubject": "tabs",
   *·   "attributes": {
   *·     "componentName": "tabs",
   *·     "packageName": "@atlaskit/tabs",
   *·     "packageVersion": "13.4.3"
   *·   }
   *· }
   *}
   * ```
   */
  render() {

    if(this.state.loaded) {
      console.log(`AuiTabs.state on render: {
        "css": "${this.state.css}"
        ,"enableCrudButtons": ${this.state.enableCrudButtons}
        ,"javascript": "${this.state.javascript}"
        ,"selectedTab": "${this.state.selectedTab}"
        ,"typeOfCode": "${this.state.typeOfCode}"
        ,"tabNameToManage": "${this.state.tabNameToManage}"
        ,"tabs.labels": [${
          this.state.tabs.map(t=>t.label).toString()
      }]\n}\n\n`);
      const tabs = this.state.tabs;
      const tabHeaders = tabs.map((val) => (
        <Tab testId={val.testId+"Tab"} key={val.testId+"Tab"}>
          <span style={val.tabStyle}>{val.label}</span>
        </Tab>
      ));
      const tabPanels = tabs.map((val) => (
        <TabPanel testId={val.testId+"TabPanel"} key={val.testId+"TabPanel"}>
          <this.Panel testId={val.testId+"TPanel"} key={val.testId+"TPanel"}>
            {val.content}
          </this.Panel>
        </TabPanel>
      ));
      return (<React.Fragment>
        <Tabs id="tabsParent" onChange = {
          (index, _) => console.log(`Selected Tab #${index + 1}.`)
        }>
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
    super(props)
    this.state = structuredClone(this.props) ?? JSON.parse(
      JSON.stringify(this.props)
    ); // when node < 17
  }

  render() {
    return (<AuiTabs
      css={this.state.css}
      enableCrudButtons={this.state.enableCrudButtons}
      javascript={this.state.javascript}
      selectedTab={this.state.selectedTab}
      tabs={this.state.tabs}
      typeOfCode={this.state.typeOfCode}
      tabNameToManage={this.state.tabNameToManage}
    />);
  }
}

root.render(<ModalInterface
  css=""
  enableCrudButtons={false}
  javascript=""
  selectedTab="javascript"
  tabs={[{
    content: null, enabled: true,
    isJavascript: true,
    label: "Default JS",
    tabStyle: { color: "var(--dark-yellow)" },
    testId: "Default JSTab",
  }, {
    content: null, enabled: true,
    isJavascript: false,
    label: "Default CSS",
    tabStyle: { color: "var(--dark-blue)" },
    testId: "Default CSSTab",
  }, {
    content: null, label: "⚙",
    tabStyle: { fontWeight: "bolder", color: "var(--dark-gray)" },
    testId: "⚙Tab",
  }]}
  typeOfCode=""
  tabNameToManage=""
/>);
