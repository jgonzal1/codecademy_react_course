import './index.css';
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';

const root = ReactDOM.createRoot(
  document.getElementById('root')??document.createElement('div')
);

interface MyProps {
  css: string,
  enableCrudButtons: boolean,
  javascript: string,
  selectedTab: string,
  tabs: any,
  text1: string,
  text2: string,
}
interface MyState {
  css: string,
  enableCrudButtons: boolean,
  loaded?: boolean,
  javascript: string,
  selectedTab: string,
  tabs: any,
  text1: string,
  text2: string,
};
export const Panel = (
  {children, testId}: {children: ReactNode; testId?: string;}
) => (
  <div data-testid={testId}>{children}</div>
);

class _ extends React.Component<MyProps, MyState> {

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
      text1: "",
      text2: ""
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
      text1: this.props.text1,
      text2: this.props.text2
    });
  }
}

class AuiTabs extends React.Component<MyProps, MyState> {

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
      text1: "",
      text2: ""
    }
  }

  componentDidMount() {
    let loadedState = {
      css: this.props.css,
      enableCrudButtons: this.props.enableCrudButtons,
      javascript: this.props.javascript,
      loaded: true,
      selectedTab: this.props.selectedTab,
      tabs: this.props.tabs,
      text1: this.props.text1,
      text2: this.props.text2
    };
    this.props.tabs.map((tab,i) => {
      if(tab["isJavascript"] !== undefined) {
        loadedState.tabs[i].content = this.renderCont(tab.isJavascript);
      } else if (tab["label"] === "⚙") {
        loadedState.tabs[i].content = this.manageAdditionalTabs();
      }
    });
    this.setState(loadedState);
  }


  modifyTabsVarBasedOnUpsert(settings: {
    enabled: boolean,
    isJavascript: boolean,
    previousTab: any,
    tabName: string,
    tabs: any
  }) {
    const tabToUpsert = {
      "label": settings.tabName,
      "testId": settings.tabName+"Tab",
      "content": this.renderCont(settings.isJavascript),
      "isJavascript": settings.isJavascript,
      "enabled": settings.enabled,
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
   *  //@ts-ignore
   *  workingTab.setAttribute("aria-posinset", (domTabs.length+1).toString());
   *  //@ts-ignore
   *  workingTab.setAttribute("data-testid", tabName+"Tab");
   *  //@ts-ignore
   *  document.querySelector('[role="tablist"]').appendChild(workingTab);
   * 
   *  //@ts-ignore
   *  workingTab.innerText = tabName;
   * 
   *  ToDo set <AuiTabs tabs[k]content: this.renderCont(true)
   *  ToDo and save status correctly to API
   *  ToDo TypeCode, Enabled and InnerContents behavior
   *  ToDo textAreas are written in renderCont()
   */
  upsertTab() {
    //@ts-ignore
    const tabName = document.getElementById("tabName").value;
    if(tabName.search("\"")!==-1) {
      alert("Please select a tab name without quotes");
      return;
    }
    //@ts-ignore
    const isJavascript = document.getElementById("typeCode").value === "1";
    //@ts-ignore
    const enabled = document.getElementById("enabled").checked;
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
      enabled: enabled,
      isJavascript: isJavascript,
      previousTab: previousTab,
      tabName: tabName,
      tabs: tabs
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

  manageAdditionalTabs() {
    return (<div>
        <div style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            margin: "0.6em 0" // top&bot left&right
        }}>
            <label htmlFor="typeCode" style={{textAlign: 'right', fontWeight: "bold"}}>Type of code:&nbsp;</label>
            <div>CSS <input
              id="typeCode" type='range' min="0" max="1" defaultValue="0" style={{height: "0.6em", width: "2em"}}
            /> JavaScript</div>
            <label htmlFor="tabName" style={{textAlign: 'right', fontWeight: "bold"}}>Tab name:&nbsp;</label>
            <input id="tabName" type='text'></input>
            <label htmlFor="enabled" style={{textAlign: 'right', fontWeight: "bold"}}>Enabled:&nbsp;</label>
            <div> {/* Enables the checkbox to be aligned to the left*/}
                <input id="enabled" type='checkbox' style={{marginLeft: 0}}></input>
            </div>
        </div>
        <button style={{
            backgroundColor: "#6C66",
            border: "1px solid #666",
            borderRadius: "0.3em"
        }} onClick={()=>this.upsertTab()}>Upsert</button>&nbsp;
        <button style={{
            backgroundColor: "#C666",
            border: "1px solid #666",
            borderRadius: "0.3em"
        }} onClick={()=>this.deleteTab()}>Delete</button>
    </div>)
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
        value={isJavascript ? this.state.javascript : this.state.css}
      ></textarea>

      <p>
          Note: you need to reload the page to observe
          your newly saved {
              isJavascript ? "javascript" : "css"
          }.
      </p>
    </div>)

  }

  render() {

    if(this.state.loaded && this.state.tabs) {
      console.log("AuiTabs.state on render\n", {
        "css":this.state.css
        ,"enableCrudButtons": this.state.enableCrudButtons
        ,"javascript":this.state.javascript
        ,"selectedTab":this.state.selectedTab
        ,"text1":this.state.text1
        ,"text2":this.state.text2
      });
      const tabs = this.state.tabs;
      console.log("  tabs.label\n", this.state.tabs.map(t=>t.label), "\n\n");
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

class ModalInterface extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      css: "",
      enableCrudButtons: false,
      javascript: "",
      selectedTab: "javascript",
      tabs: [{
        content: null,
        enabled: true,
        isJavascript: true,
        label: "Default JS",
        tabStyle: { color: "var(--dark-yellow)" },
        testId: "Default JSTab",
      }, {
        content: null,
        enabled: true,
        isJavascript: false,
        label: "Default CSS",
        tabStyle: { color: "var(--dark-blue)" },
        testId: "Default CSSTab",
      }, {
        content: null,
        label: "⚙",
        testId: "⚙Tab",
      }, {
        content: null,
        enabled: true,
        isJavascript: true,
        label: "JS2",
        tabStyle: { color: "var(--dark-yellow)" },
        testId: "JS2Tab",
      }],
      text1: "",
      text2: ""
    };
  }
  /**
   * ```json
   * "state": {
   *   "css": "string",
   *   "enableCrudButtons": "boolean",
   *   "loaded": "boolean|undefined",
   *   "javascript": "string",
   *   "selectedTab": "string",
   *   "tabs": "any",
   *   "text1": "string",
   *   "text2": "string",
   * };
   * ```
   */
  onChange(e) {
    this.setState(
      //@ts-ignore-next-line
      {[e.target.id]: e.target.value},
      () => {
        if (this.state.text1 && this.state.text2) {
          this.setState({ enableCrudButtons: true });
        } else {
          this.setState({ enableCrudButtons: false });
        }
      }
    );
  }

  updateUi() {
    console.log(this.state);
  }
  render() {
    return (
      <React.Fragment>
        <label htmlFor="text1">Text1</label>&nbsp;
        <input
          type="text"
          id="text1"
          name="text1"
          onChange={this.onChange.bind(this)}
          value={this.state.text1}
        />
        <br/>
        <label htmlFor="text2">Text2</label>&nbsp;
        <input
          type="text"
          id="text2"
          name="text2"
          onChange={this.onChange.bind(this)}
          value={this.state.text2}
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
          text1={this.state.text1}
          text2={this.state.text2}
        />
      </React.Fragment>
    );
  }
}

root.render(<ModalInterface
  css={''} enableCrudButtons={false} javascript={''}
  selectedTab={''} tabs={undefined}
  text1={''} text2={''}
/>);
