//#region Dependencies
import './index.css';
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import $ from 'jquery';

const root = ReactDOM.createRoot($('#root')[0]);

interface CssJsModalInterfaceProps {
  css: string,
  enableCrudButtons: boolean,
  javascript: string,
  //label: string,
  selectedTab: string,
  tabs: any,
  typeOfCode: string,
  tabNameToManage: string
}
interface CssJsTabsProps {
  css: string,
  enableCrudButtons: boolean,
  javascript: string,
  //label: string,
  selectedTab: string,
  tabs: any,
  tabNameToManage: string,
  Panel: any,
  deleteTab: Function,
  modifyTabsVarBasedOnUpsert: Function,
  onTextSettingsChange: Function,
  renderCont: Function,
  upsertTab: Function
}
interface CssJsTabsState {
  css: string,
  enableCrudButtons: boolean,
  javascript: string,
  //label: string,
  loaded?: boolean,
  selectedTab: string,
  tabs: any,
  tabNameToManage: string,
  Panel?: any,
  deleteTab?: Function,
  modifyTabsVarBasedOnUpsert?: Function,
  onTextSettingsChange?: Function,
  renderCont?: Function,
  upsertTab?: Function
};

interface CodeBodyProps {
  css: string,
  enabled: boolean,
  enableCrudButtons: boolean,
  isJavascript: boolean,
  javascript: string,
  //label: string,
  onTextSettingsChange: Function
  tabName: string,
  testId: string,
  typeOfCode: string,
}
interface CodeBodyState {
  css: string,
  enabled: boolean,
  enableCrudButtons: boolean,
  isJavascript: boolean,
  javascript: string,
  //label: string,
  tabName: string,
  testId: string,
  typeOfCode: string,
};
//#endregion

class CodeBody extends React.Component<CodeBodyProps, CodeBodyState> {

  constructor(props) {
    super(props)
    this.state = {
      css: this.props.css,
      enabled: this.props.enabled,
      enableCrudButtons: this.props.enableCrudButtons,
      isJavascript: this.props.isJavascript,
      javascript: this.props.javascript,
      //label: this.props.label,
      tabName: this.props.tabName,
      testId: this.props.testId,
      typeOfCode: this.props.typeOfCode
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const propsDiff = JSON.stringify(prevProps) !== JSON.stringify(this.props);
    const stateDiff = JSON.stringify(prevState) !== JSON.stringify(this.state);
    let update = propsDiff ?
      Object.keys(prevProps).filter(
        k => (typeof(this.props[k])!=="function" && prevProps[k]!==this.props[k])
      ).map(
        k => `"${k}": {"prevProps":${
          JSON.stringify(prevProps[k])
        }, "newProps":${
          JSON.stringify(this.props[k])
        }}`
      ).toString() :
      "";
    update += stateDiff ?
      Object.keys(prevState).filter(
        k => (typeof(this.props[k])!=="function" && prevState[k]!==this.state[k])
      ).map(
        k => `"${k}": {"prevState":${
          JSON.stringify(prevState[k])
        }, "newProps":${
          JSON.stringify(this.state[k])
        }}`
      ).toString() :
      "";
    if(update !== "") {
      console.log(`CodeBody did update: {\n  ${update}\n}`);
    }
  }

  render() {
    console.log(`CodeBody.render/state: {
      "css": "${this.state.css}"
      ,"enableCrudButtons": ${this.state.enableCrudButtons}
      ,"isJavascript": "${this.state.isJavascript}"
      ,"javascript": "${this.state.javascript}"
      ,"typeOfCode": "${this.state.typeOfCode}"\n}
    \n`);
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
      id={this.state.isJavascript ? "javascript" : "css"}
      className="h320 w100p"
      onChange={this.props.onTextSettingsChange.bind(this)}
      defaultValue={
        this.state.isJavascript ? this.state.javascript : this.state.css
      }
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
      css: this.props.css,
      enableCrudButtons: this.props.enableCrudButtons,
      javascript: this.props.javascript,
      //label: this.props.label,
      selectedTab: this.props.selectedTab,
      tabs: this.props.tabs,
      tabNameToManage: this.props.tabNameToManage,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const propsDiff = JSON.stringify(prevProps) !== JSON.stringify(this.props);
    const stateDiff = JSON.stringify(prevState) !== JSON.stringify(this.state);
    let update = propsDiff ?
      Object.keys(prevProps).filter(
        k => (typeof(this.props[k])!=="function" && prevProps[k]!==this.props[k])
      ).map(
        k => `"${k}": {"prevProps":${
          JSON.stringify(prevProps[k])
        }, "newProps":${
          JSON.stringify(this.props[k])
        }}`
      ).toString() :
      "";
    update += stateDiff ?
      Object.keys(prevState).filter(
        k => (typeof(this.props[k])!=="function" && prevState[k]!==this.state[k])
      ).map(
        k => `"${k}": {"prevState":${
          JSON.stringify(prevState[k])
        }, "newProps":${
          JSON.stringify(this.state[k])
        }}`
      ).toString() :
      "";
    if(update !== "") {
      console.log(`ManageAdditionalTabs did update: {\n  ${update}\n}`);
    }
  }

  render() {
    /*console.log(`MngAddTbs.render/state: {
      "css": "${this.state.css}"
      ,"enableCrudButtons": ${this.state.enableCrudButtons}
      ,"javascript": "${this.state.javascript}"
      ,"selectedTab": "${this.state.selectedTab}"
      ,"typeOfCode": "${this.state.typeOfCode}"
      ,"tabNameToManage": "${this.state.tabNameToManage}"
      ,"tabs.labels": ["${state.tabs.map(t=>t.label).join('","')}"]\n}
    \n\n`);*/
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
            onChange={this.props.onTextSettingsChange.bind(this)}
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
        disabled={!this.props.enableCrudButtons}
        onClick={()=>this.props.upsertTab(this.props)}
      >Upsert</button>&nbsp;
      <button className="custom-css-js-button"
        style={{backgroundColor: "var(--light-orange)"}}
        disabled={!this.props.enableCrudButtons}
        onClick={()=>this.props.deleteTab(this.props)}
      >Delete</button>
  </div>)
  }
}

class ModalInterface extends React.Component<CssJsModalInterfaceProps, CssJsTabsState> {
  constructor(props) {
    super(props)
    this.state = {
      css : this.props.css,
      enableCrudButtons : this.props.enableCrudButtons,
      javascript : this.props.javascript,
      //label: this.props.label,
      selectedTab : this.props.selectedTab,
      tabs : this.props.tabs,
      tabNameToManage : this.props.tabNameToManage,
      onTextSettingsChange : this.onTextSettingsChange.bind(this),
      modifyTabsVarBasedOnUpsert : this.modifyTabsVarBasedOnUpsert.bind(this),
      upsertTab : this.upsertTab.bind(this),
      deleteTab : this.deleteTab.bind(this),
      renderCont : this.renderCont.bind(this),
      Panel : this.Panel.bind(this)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const propsDiff = JSON.stringify(prevProps) !== JSON.stringify(this.props);
    const stateDiff = JSON.stringify(prevState) !== JSON.stringify(this.state);
    let update = propsDiff ?
      Object.keys(prevProps).filter(
        k => (typeof(this.props[k])!=="function" && prevProps[k]!==this.props[k])
      ).map(
        k => `"${k}": {"prevProps":${
          JSON.stringify(prevProps[k])
        }, "newProps":${
          JSON.stringify(this.props[k])
        }}`
      ).toString() :
      "";
    update += stateDiff ?
      Object.keys(prevState).filter(
        k => (typeof(this.props[k])!=="function" && prevState[k]!==this.state[k])
      ).map(
        k => `"${k}": {"prevState":${
          JSON.stringify(prevState[k])
        }, "newProps":${
          JSON.stringify(this.state[k])
        }}`
      ).toString() :
      "";
    if(update !== "") {
      console.log(`ModalInterface did update: {\n  ${update}\n}`);
    }
    //this.setState({tabsStateToParentCallback: this.props.tabs});
  }

  //#region Functions
  //stateInParentCallback(tabsStateFromChild){ this.setState({tabs:{...tabsStateFromChild}}); }

  onTextSettingsChange(e) {
    this.setState(
      //@ts-ignore-next-line
      {[e.target.id]: e.target.value},
      () => {
        if (this.state.tabNameToManage) {
          this.setState(
            { enableCrudButtons: true },
            () => {
              console.log(`ModalInterface.onTextSettingsChange/]TN\n\n`);/*\n/state: {
                "css": "${this.state.css}"
                ,"enableCrudButtons": ${this.state.enableCrudButtons}
                ,"javascript": "${this.state.javascript}"
                ,"selectedTab": "${this.state.selectedTab}"
                ,"typeOfCode": "${this.state.typeOfCode}"
                ,"tabNameToManage": "${this.state.tabNameToManage}"
                ,"tabs.labels": ["${state.tabs.map(t=>t.label).join('","')}"]\n}
              \n\n`);*/
              this.forceUpdate();
            }
          );
        } else {
          this.setState(
            { enableCrudButtons: false },
            ()=>console.log(`ModalInterface.onTextSettingsChange/!TN\n/state: {
                "css": "${this.state.css}"
                ,"enableCrudButtons": ${this.state.enableCrudButtons}
                ,"javascript": "${this.state.javascript}"
                ,"tabNameToManage": "${this.state.tabNameToManage}"
                ,"tabs.labels": ["${this.state.tabs.map(t=>t.label).join('","')}"]\n}
            \n\n`)
          );
        }
      }
    );
  }

  modifyTabsVarBasedOnUpsert(state, enabled, isJavascript) {
    console.log(`ModalInterface.modifyTabsVarBasedOnUpsert/i
      /state: {
        "css": "${state.css}"
        ,"enabled: ${enabled}
        ,"enableCrudButtons": ${state.enableCrudButtons}
        ,"isJavascript": ${isJavascript}
        ,"javascript": "${state.javascript}"
        ,"tabNameToManage": "${state.tabNameToManage}"
        ,"tabs.labels": ["${state.tabs.map(t=>t.label).join('","')}"]\n}`
    );
    const tabToUpsert = {
      "content": <CodeBody
        css=''
        enableCrudButtons={false}
        enabled={enabled}
        isJavascript={isJavascript}
        javascript=''
        //label={state.label}
        onTextSettingsChange={this.onTextSettingsChange.bind(this)}
        tabName={state.tabNameToManage}
        testId={state.tabNameToManage+"Tab"}
        typeOfCode=''
      />,
      "enabled": enabled,
      "isJavascript": isJavascript,
      "label": state.tabNameToManage, //+ (isJavascript?".js":".css"),
      "tabStyle": { color: `var(--dark-${
        isJavascript?"yellow":"blue"
      })` },
      "testId": state.tabNameToManage+"Tab",
    };
    //const label = state.tabNameToManage + (isJavascript?".js":".css");
    const tabExisted = state.tabs.filter(
      t => t.label===state.tabNameToManage
    );
    let tabs = state.tabs;
    if(!tabExisted.length) {
      console.log(
        `MngAddTbs.modTabsVarBasedOnUpsert/I: {
        "tabNameToManage":"${state.tabNameToManage}"\n}`
      );
      tabs.push(tabToUpsert);
      let domTabs = document.querySelectorAll('[role="tablist"]')[0].children;
      Array.from(domTabs).map(k=>
        k.setAttribute(
          "aria-setsize",
          (domTabs.length+1).toString()
        )
      );
      return tabs;
    } else {
      console.log(`MngAddTbs.modTabsVarBasedOnUpsert/M: {
        "tabNameToManage":"${state.tabNameToManage}"\n}\n\n`
      );
      tabs = state.tabs.map(existingTab => {
        if(existingTab.label === state.tabNameToManage) { // label
          return tabToUpsert;
        } else {
          return existingTab;
        }
      });
      return tabs;
    }
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
   *  ToDo save status correctly to API
   *  ToDo TypeCode, Enabled and InnerContents behavior
   */
  upsertTab(state) {
    if(state.tabNameToManage.search("\"")!==-1) { alert("Please select a tab name without quotes"); return; }
    const isJavascript = $("#typeCode")[0].checked; // ToDo make it react-dependant
    const enabled = $("#enabled")[0].checked; // ToDo make it react-dependant
    // const label = state.tabNameToManage + (isJavascript?".js":".css");
    console.log(`ModalInterface.upsertTab/i
      /state: {
        "css": "${state.css}"
        ,"javascript": "${state.javascript}"
        ,"tabs.labels": ["${state.tabs.map(t=>t.label).join('","')}"]
        ,"enabled": ${enabled},
        ,"isJavascript": ${isJavascript},
        ,"tabNameToManage": "${state.tabNameToManage}"\n}`
    );
    const previousTab = state.tabs.filter(
      tab => tab.label === state.tabNameToManage // label
    )[0];
    let previousCustomTabCheckers = {};
    if(!!previousTab && Object.keys(previousTab)) {
      previousCustomTabCheckers = {
        "enabled": previousTab.enabled,
        "isJavascript": previousTab.isJavascript,
        "testId": previousTab.label+"Tab"
      }
    } else {
      console.log("ModalInterface.upsertTab/previousTabNotFound:", previousTab);
    }
    const newCustomTabCheckers = {
        "enabled": enabled,
        "isJavascript": isJavascript,
        "testId": state.tabNameToManage+"Tab",
    };
    console.log("MngAddTbs.upsertTab/prevVsNew",
      "\n  tab:", state.tabNameToManage,
      "\n  previousCustomTab:", previousCustomTabCheckers,
      "\n  newCustomTab:", newCustomTabCheckers
    );
    if(
      Object.keys(previousCustomTabCheckers).length &&
      previousCustomTabCheckers["testId"] === newCustomTabCheckers["testId"] &&
      previousCustomTabCheckers["isJavascript"] === newCustomTabCheckers["isJavascript"] &&
      previousCustomTabCheckers["enabled"] === newCustomTabCheckers["enabled"]
    ) {
      console.log(`MngAddTbs.upsertTab/noChanges on Global JS/CSS tab Upsert`);
      return;
    }
    const tabs = this.modifyTabsVarBasedOnUpsert(state, enabled, isJavascript);
    /*
    console.log("MngAddTbs.upsertTab/tabsState:\n", tabs);
    console.log("MngAddTbs.upsertTab/tabs2BChanged:\n", this.state.tabs); // won't work before next
    this.setState(state => ({ tabs: Object.assign([], tabs) })); // worked once
    */
    this.setState({ tabs: Object.assign([], tabs) });
    console.log("MngAddTbs.upsertTab/tabsAfter:\n", this.state.tabs, "\n\n");
  }

  deleteTab(state) {
    if(state.tabNameToManage.search("\"")!==-1) {
      alert("Please select a tab name without quotes");
      return;
    }
    const typeOfCode = state.isJavascript?"JS":"CSS";
    // const label = state.tabNameToManage + (state.isJavascript?".js":".css");
    console.log(`ModalInterface.deleteTab/i
      /state: {
        "css": "${state.css}"
        ,"javascript": "${state.javascript}"
        ,"tabNameToManage": "${state.tabNameToManage}"
        ,"typeOfCode": "${typeOfCode}"
        ,"tabs.labels": ["${state.tabs.map(t=>t.label).join('","')}"]\n}
    \n\n`);
    const doDelete = window.confirm(`Are you sure you want to delete the code from the ${state.tabNameToManage} tab?`)
    if(!doDelete) {
      console.log("Prevented deleteTab() further execution");
      return;
    }
    const tabs = state.tabs;
    const tabToDeleteAsChild = tabs.filter(
      tab => tab.label === state.tabNameToManage
    );
    
    if(!tabToDeleteAsChild.length) {
      console.log("MngAddTbs.deleteTab/\nThe provided tab", state.tabNameToManage, "does not exist");
      return;
    } 
    const tabsAfterDeletion = tabs.filter(tab => tab.label!==state.tabNameToManage);
    let stateToModify = {...state};
    stateToModify.tabs = tabsAfterDeletion;
    /*
    const tabInDom = document.querySelector(`[data-testid="${tabName}Tab"]`);
    if(!tabInDom) {
      console.log("MngAddTbs.deleteTab/\nThe provided tab", tabName, "does not exist");
      return;
    }
    */
    this.setState( stateToModify );
    let tabsDom = document.querySelectorAll('[role="tablist"]')[0].children;
    Array.from(tabsDom).map(
      k => k.setAttribute("aria-setsize", (tabs.length-1).toString() )
    );
    //tabInDom.remove();
    console.log(`MngAddTbs.deleteTab/\nDeleted tab ${state.tabNameToManage}.\n`);
  }

  renderCont(isJavascript, state) {
    /*console.log(`ModalInterface.renderCont/i
      /isJavascript: ${isJavascript}
      /state: {
        "css": "${state.css}"
        ,"javascript": "${state.javascript}"
        ,"typeOfCode": "${state.typeOfCode}"
        ,"tabNameToManage": "${state.tabNameToManage}"
        ,"tabs.labels": ["${state.tabs.map(t=>t.label).join('","')}"]\n}
    \n\n`);*/
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
        id={isJavascript ? "javascript" : "css"}
        className="h320 w100p"
        onChange={this.onTextSettingsChange.bind(this)}
        defaultValue={ isJavascript ? state.javascript : state.css }
      >{/*defaultValue allows writing, but value does not*/}
      </textarea>

      <p>
        Note: you need to reload the page to observe
        your newly saved { isJavascript ? "javascript" : "css" }.
      </p>
    </div>)
  }

  Panel = ( {children, testId}: {children: ReactNode; testId?: string;} ) => (
    <div data-testid={testId}>{children}</div>
  );
  //#endregion

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
    /*console.log(`ModalInterface.render/state: {
      "css": "${this.state.css}"
      ,"enableCrudButtons": ${this.state.enableCrudButtons}
      ,"javascript": "${this.state.javascript}"
      ,"typeOfCode": "${this.state.typeOfCode}"
      ,"tabNameToManage": "${this.state.tabNameToManage}"
      ,"tabs.labels": ["${state.tabs.map(t=>t.label).join('","')}"]\n}
    \n\n`);*/
    return (
      <React.Fragment>
        <Tabs id="tabsParent" onChange = {
          (index, _) => console.log(`AuiTabs.render/selectedTab: ${this.state.tabs[index].label}.`)
        }>
          <TabList>{this.state.tabs.map((val) => (
            <Tab testId={val.testId+"Tab"} key={val.testId+"Tab"}>
              <span style={val.tabStyle}>{val.label}</span>
            </Tab>
          ))}</TabList>
          {this.state.tabs.map((val,i) => (<TabPanel testId={val.testId+"TabPanel"} key={val.testId+"TabPanel"}>
            <this.Panel testId={val.testId+"TPanel"} key={val.testId+"TPanel"}>{
              val["isJavascript"] !== undefined ?
                this.renderCont(val.isJavascript, this.props) :
              val["label"] === "⚙" ?
                <ManageAdditionalTabs
                  css={this.state.css}
                  enableCrudButtons={this.state.enableCrudButtons}
                  javascript={this.state.javascript}
                  //label={this.state.label}
                  selectedTab={this.state.selectedTab}
                  tabs={this.state.tabs}
                  tabNameToManage={this.state.tabNameToManage}
                  Panel={this.Panel}
                  deleteTab={this.deleteTab.bind(this)}
                  modifyTabsVarBasedOnUpsert={this.modifyTabsVarBasedOnUpsert.bind(this)}
                  onTextSettingsChange={this.onTextSettingsChange.bind(this)}
                  renderCont={this.renderCont.bind(this)}
                  upsertTab={this.upsertTab.bind(this)}
                />
              : null
            }</this.Panel>
          </TabPanel>))}
        </Tabs>
      </React.Fragment>
    );
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
    label: "default.js",
    tabStyle: { color: "var(--dark-yellow)" },
    testId: "default.jsTab",
  }, {
    content: null, enabled: true,
    isJavascript: false,
    label: "default.css",
    tabStyle: { color: "var(--dark-blue)" },
    testId: "default.cssTab",
  }, {
    content: null, label: "⚙",
    tabStyle: { fontWeight: "bolder", color: "var(--dark-gray)" },
    testId: "⚙Tab",
  }]}
  typeOfCode=""
  tabNameToManage=""
/>);
