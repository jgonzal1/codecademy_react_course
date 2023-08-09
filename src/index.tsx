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
  isJavascript?: boolean,
  javascript: string,
  selectedTab: string,
  tabs: any,
  typeOfCode: string,
  tabNameToManage: string
}
interface CssJsTabsProps {
  css: string,
  enableCrudButtons: boolean,
  isJavascript?: boolean,
  javascript: string,
  selectedTab: string,
  tabs: any,
  typeOfCode: string,
  tabNameToManage: string,
  onTextSettingsChange: Function,
  modifyTabsVarBasedOnUpsert: Function,
  upsertTab: Function,
  deleteTab: Function,
  renderCont: Function,
  Panel: any
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
  tabNameToManage: string,
  onTextSettingsChange?: Function,
  modifyTabsVarBasedOnUpsert?: Function,
  upsertTab?: Function,
  deleteTab?: Function,
  renderCont?: Function,
  Panel?: any
};

interface CodeBodyProps {
  css: string,
  enableCrudButtons: boolean,
  isJavascript: boolean,
  javascript: string,
  selectedTab: string,
  typeOfCode: string,
  tabName: string,
  onTextSettingsChange: Function
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
      css: this.props.css,
      enableCrudButtons: this.props.enableCrudButtons,
      isJavascript: this.props.isJavascript,
      javascript: this.props.javascript,
      selectedTab: this.props.selectedTab,
      tabName: this.props.tabName,
      typeOfCode: this.props.typeOfCode
    }
  }

  /*componentDidUpdate(prevProps, prevState) {
    console.log("CodeBody did update")
  }*/

  render() {
    console.log(`CodeBody.render/state: {
      "css": "${this.state.css}"
      ,"enableCrudButtons": ${this.state.enableCrudButtons}
      ,"isJavascript": "${this.state.isJavascript}"
      ,"javascript": "${this.state.javascript}"
      ,"selectedTab": "${this.state.selectedTab}"
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
      selectedTab: this.props.selectedTab,
      tabs: this.props.tabs,
      typeOfCode: this.props.typeOfCode,
      tabNameToManage: this.props.tabNameToManage,
    }
  }

  /*componentDidUpdate(prevProps, prevState) {
    console.log("ManageAdditionalTabs did update");
  }*/

  render() {
    /*console.log(`MngAddTbs.render/state: {
      "css": "${this.state.css}"
      ,"enableCrudButtons": ${this.state.enableCrudButtons}
      ,"javascript": "${this.state.javascript}"
      ,"selectedTab": "${this.state.selectedTab}"
      ,"typeOfCode": "${this.state.typeOfCode}"
      ,"tabNameToManage": "${this.state.tabNameToManage}"
      ,"tabs.labels": [${
        this.state.tabs.map(t=>t.label).toString()
    }]\n}\n\n`);*/
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
        onClick={()=>this.props.upsertTab(this.state)}
      >Upsert</button>&nbsp;
      <button className="custom-css-js-button"
        style={{backgroundColor: "var(--light-orange)"}}
        disabled={!this.props.enableCrudButtons}
        onClick={()=>this.props.deleteTab(this.state)}
      >Delete</button>
  </div>)
  }
}

class AuiTabs extends React.Component<CssJsTabsProps, CssJsTabsState> {
  constructor(props) {
    super(props)
    this.state = {
      css: this.props.css,
      enableCrudButtons: this.props.enableCrudButtons,
      javascript: this.props.javascript,
      selectedTab: this.props.selectedTab,
      tabs: this.props.tabs,
      typeOfCode: this.props.typeOfCode,
      tabNameToManage: this.props.tabNameToManage,
    }
  }

  /*componentDidUpdate(prevProps, prevState) {
    console.log("AuiTabs did update")
  }*/

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
  render() { return (
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
          <this.props.Panel testId={val.testId+"TPanel"} key={val.testId+"TPanel"}>{
            val["isJavascript"] !== undefined ?
              this.props.renderCont(val.isJavascript, this.props) :
            val["label"] === "⚙" ?
              <ManageAdditionalTabs
                css={this.props.css}
                enableCrudButtons={this.props.enableCrudButtons}
                javascript={this.props.javascript}
                selectedTab={this.props.selectedTab}
                tabs={this.props.tabs}
                typeOfCode={this.props.typeOfCode}
                tabNameToManage={this.props.tabNameToManage}
                onTextSettingsChange={this.props.onTextSettingsChange.bind(this)}
                modifyTabsVarBasedOnUpsert={this.props.modifyTabsVarBasedOnUpsert}
                upsertTab={this.props.upsertTab}
                deleteTab={this.props.deleteTab}
                renderCont={this.props.renderCont}
                Panel={this.props.Panel}
              />
            : null
          }</this.props.Panel>
        </TabPanel>))}
      </Tabs>
    </React.Fragment>
  )}
}

class ModalInterface extends React.Component<CssJsModalInterfaceProps, CssJsTabsState> {
  constructor(props) {
    super(props)
    this.state = {
      css : this.props.css,
      enableCrudButtons : this.props.enableCrudButtons,
      javascript : this.props.javascript,
      selectedTab : this.props.selectedTab,
      tabs : this.props.tabs,
      typeOfCode : this.props.typeOfCode,
      tabNameToManage : this.props.tabNameToManage,
      onTextSettingsChange : this.onTextSettingsChange.bind(this),
      modifyTabsVarBasedOnUpsert : this.modifyTabsVarBasedOnUpsert.bind(this),
      upsertTab : this.upsertTab.bind(this),
      deleteTab : this.deleteTab.bind(this),
      renderCont : this.renderCont.bind(this),
      Panel : this.Panel.bind(this)
    }
  }

  onTextSettingsChange(e) {
    this.setState(
      //@ts-ignore-next-line
      {[e.target.id]: e.target.value},
      () => {
        if (this.state.tabNameToManage) {
          this.setState(
            { enableCrudButtons: true },
            () => {
              console.log(`ModalInterface.onTextSettingsChange/]TN`);/*\n/state: {
                "css": "${this.state.css}"
                ,"enableCrudButtons": ${this.state.enableCrudButtons}
                ,"javascript": "${this.state.javascript}"
                ,"selectedTab": "${this.state.selectedTab}"
                ,"typeOfCode": "${this.state.typeOfCode}"
                ,"tabNameToManage": "${this.state.tabNameToManage}"
                ,"tabs.labels": [${
                  this.state.tabs.map(t=>t.label).toString()
                }]\n}\n\n`
              );*/
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
                ,"selectedTab": "${this.state.selectedTab}"
                ,"typeOfCode": "${this.state.typeOfCode}"
                ,"tabNameToManage": "${this.state.tabNameToManage}"
                ,"tabs.labels": [${
                  this.state.tabs.map(t=>t.label).toString()
              }]\n}\n\n`
            )
          );
        }
      }
    );
  }

  modifyTabsVarBasedOnUpsert(state) {
    console.log(`ModalInterface.modifyTabsVarBasedOnUpsert/i
      /state: {
        "css": "${state.css}"
        ,"enableCrudButtons": ${state.enableCrudButtons}
        ,"javascript": "${state.javascript}"
        ,"selectedTab": "${state.selectedTab}"
        ,"typeOfCode": "${state.typeOfCode}"
        ,"tabNameToManage": "${state.tabNameToManage}"
        ,"tabs.labels": [${
          state.tabs.map(t=>t.label).toString()
      }]\n}\n\n`
    );
    const tabToUpsert = {
      "content": <CodeBody
        css=''
        enableCrudButtons={false}
        isJavascript={state.isJavascript}
        javascript=''
        selectedTab=''
        tabName={state.tabNameToManage}
        typeOfCode=''
        onTextSettingsChange={this.onTextSettingsChange.bind(this)}
      />,
      "enabled": state.enabled,
      "isJavascript": state.isJavascript,
      "label": state.tabNameToManage,
      "tabStyle": { color: `var(--dark-${
        state.isJavascript?"yellow":"blue"
      })` },
      "testId": state.tabNameToManage+"Tab",
    };
    let tabs = state.tabs;
    if(!state.previousTab) {
      console.log(`MngAddTbs.modTabsVarBasedOnUpsert/I
        \n${state.tabNameToManage}"\n\n`
      );
      tabs.push(tabToUpsert);
      let domTabs = document.querySelectorAll('[role="tablist"]')[0].children;
      Array.from(domTabs).map(k=>
        k.setAttribute(
          "aria-setsize", 
          (domTabs.length+1).toString()
        )
      );
    } else {
      console.log(`MngAddTbs.modTabsVarBasedOnUpsert/M
        \n${state.tabNameToManage}"\n\n`
      );
      tabs = tabs.map(existingTab => {
        if(existingTab.label === state.tabNameToManage) {
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
 *  ToDo save status correctly to API
 *  ToDo TypeCode, Enabled and InnerContents behavior
 */
  upsertTab(state) {
    console.log(`ModalInterface.upsertTab/i
      /state: {
        "css": "${state.css}"
        ,"enableCrudButtons": ${state.enableCrudButtons}
        ,"javascript": "${state.javascript}"
        ,"selectedTab": "${state.selectedTab}"
        ,"typeOfCode": "${state.typeOfCode}"
        ,"tabNameToManage": "${state.tabNameToManage}"
        ,"tabs.labels": [${
          state.tabs.map(t=>t.label).toString()
      }]\n}\n\n`
    );
    if(state.tabNameToManage.search("\"")!==-1) { alert("Please select a tab name without quotes"); return; }
    const isJavascript = $("#typeCode")[0].checked;
    const enabled = $("#enabled")[0].checked;
    let tabs = this.state.tabs;
    console.log(`MngAddTbs.upsertTab/uniques: {
      "isJavascript": ${isJavascript},
      "enabled": ${enabled},
      "tabs": "${tabs.map(t=>t.label)}"\n}`
    );
    const previousTab = tabs.filter(
      tab => tab.label === state.tabNameToManage
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
    console.log("MngAddTbs.upsertTab/prevVsNew",
      "\n  tab:", this.state.tabNameToManage,
      "\n  previousCustomTab:", previousCustomTabCheckers,
      "\n  newCustomTab:", newCustomTabCheckers
    );
    if(
      Object.keys(previousCustomTabCheckers).length &&
      previousCustomTabCheckers["testId"] === newCustomTabCheckers["testId"] &&
      previousCustomTabCheckers["isJavascript"] === newCustomTabCheckers["isJavascript"] &&
      previousCustomTabCheckers["enabled"] === newCustomTabCheckers["enabled"]
    ) {
      console.log(`MngAddTbs.upsertTab/noChanges
      on Global JS/CSS tab Upsert`);
      return;
    }
    tabs = this.modifyTabsVarBasedOnUpsert(state)
    console.log("MngAddTbs.upsertTab/tabsBefore:" +
      "\n", state.tabs
    );
    console.log("MngAddTbs.upsertTab/tabs2BChanged:" +
      "\n", tabs
    );
    this.setState(
      state => ({ tabs: Object.assign([], state.tabs, tabs) })
    );
    console.log("MngAddTbs.upsertTab/tabsAfter:" +
      "\n", state.tabs
    );
  }

  deleteTab(state) {
    console.log(`ModalInterface.deleteTab/i
      /state: {
        "css": "${state.css}"
        ,"enableCrudButtons": ${state.enableCrudButtons}
        ,"javascript": "${state.javascript}"
        ,"selectedTab": "${state.selectedTab}"
        ,"typeOfCode": "${state.typeOfCode}"
        ,"tabNameToManage": "${state.tabNameToManage}"
        ,"tabs.labels": [${
          state.tabs.map(t=>t.label).toString()
      }]\n}\n\n`
    );
    if(state.tabNameToManage.search("\"")!==-1) {
      alert("Please select a tab name without quotes");
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
    //const tabInDom = document.querySelector(`[data-testid="${tabName}Tab"]`);
    //if(!tabInDom) {
    //  console.log("MngAddTbs.deleteTab/\nThe provided tab", tabName, "does not exist");
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
    console.log(`MngAddTbs.deleteTab/\nDeleted tab ${
      state.tabNameToManage
    }.\n`);
  }

  renderCont(isJavascript, state) {
    /*console.log(`ModalInterface.renderCont/i
      /isJavascript: ${isJavascript}
      /state: {
        "css": "${state.css}"
        ,"enableCrudButtons": ${state.enableCrudButtons}
        ,"javascript": "${state.javascript}"
        ,"selectedTab": "${state.selectedTab}"
        ,"typeOfCode": "${state.typeOfCode}"
        ,"tabNameToManage": "${state.tabNameToManage}"
        ,"tabs.labels": [${
          state.tabs.map(t=>t.label).toString()
      }]\n}\n\n`
    );*/
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

  render() {
    /*console.log(`ModalInterface.render/state: {
      "css": "${this.state.css}"
      ,"enableCrudButtons": ${this.state.enableCrudButtons}
      ,"javascript": "${this.state.javascript}"
      ,"selectedTab": "${this.state.selectedTab}"
      ,"typeOfCode": "${this.state.typeOfCode}"
      ,"tabNameToManage": "${this.state.tabNameToManage}"
      ,"tabs.labels": [${
        this.state.tabs.map(t=>t.label).toString()
    }]\n}\n\n`);*/
    return (<AuiTabs
      css={this.state.css}
      enableCrudButtons={this.state.enableCrudButtons}
      javascript={this.state.javascript}
      selectedTab={this.state.selectedTab}
      tabs={this.state.tabs}
      typeOfCode={this.state.typeOfCode}
      tabNameToManage={this.state.tabNameToManage}
      onTextSettingsChange={this.onTextSettingsChange.bind(this)}
      modifyTabsVarBasedOnUpsert={this.modifyTabsVarBasedOnUpsert.bind(this)}
      upsertTab={this.upsertTab.bind(this)}
      deleteTab={this.deleteTab.bind(this)}
      renderCont={this.renderCont.bind(this)}
      Panel={this.Panel}
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
