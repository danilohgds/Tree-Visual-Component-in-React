import React from 'react';
import PropTypes from 'prop-types';
import RfmTree from './internal/rfmtree';
import AssignedRfmTree from './internal/assignedrfmtree';
import { StyleRoot }  from 'radium';
import decorators from './internal/decorators';
import assigneddecorators from './internal/assigneddecorators';
import './internal/themes/index.css';
import styles from './internal/sample/styles';
import * as filters from './internal/utils/filter';

decorators.Header = ({style, node}) => {
    let folderIcon = null;
    let chosenStyle = {color : '#e0d665'};

    if(!node.toggled){
        folderIcon = 'glyphicon glyphicon-folder-close';
    }
    else{
        folderIcon = 'glyphicon glyphicon-folder-open';
    }

    const iconType = node.leaf !== 1 ? folderIcon  : 'glyphicon glyphicon-cutlery' ;

    return (
        <div style={style.base}>
            <div style={style.title}>
                <span className={iconType} style={chosenStyle} aria-hidden="true"></span>
            </div>
        </div>
    );
};

assigneddecorators.Header = ({style, node}) => {
    let chosenStyle = {color : '#e0d665'};

    return (
        <div style={style.base}>
            <div style={style.title}>
                <span style={chosenStyle} aria-hidden="true"></span>
            </div>
        </div>
    );
};

class PushSubFlag extends React.Component {
  render(){
    let label = this.props.pushLabelValue;
    return (
      <div className="row text-center" style={styles.hierarachybuttons}>
          <button onClick={this.props.pushNodeSubLvl} >
              <span className="glyphicon glyphicon-chevron-right" />
              <span><b>{label}</b></span>
          </button>
      </div>
    )
  }
}

PushSubFlag.propTypes = {
    pushLabelValue: PropTypes.string
}

class PushButton extends React.Component {
    render(){
        let fval = this.props.functionval;
        let buttonSub = null;
        if(fval === 2){
          buttonSub = <PushSubFlag pushLabelValue={this.props.pushLabelValue}
                        pushNodeSubLvl={this.props.pushNodeSubLvl} />;
        }
        return (
              <div>
                  <div className="row text-center"  style={styles.hierarachybuttons}>
                      <button onClick={this.props.pushNode}>
                          <span className="glyphicon glyphicon-chevron-right" />
                      </button>
                  </div>
              <div>
                  {buttonSub}
              </div>
                  <div className="row text-center" style={styles.hierarachybuttons}>
                      <button onClick={this.props.unpushNode}>
                          <span className="glyphicon glyphicon-chevron-left" />
                      </button>
                  </div>
              </div>
          );
    }
}
PushButton.propTypes = {
    pushNode: PropTypes.func.isRequired,
    unpushNode: PropTypes.func.isRequired,
    functionval: PropTypes.number.isRequired,
    pushLabelValue: PropTypes.string.isRequired,
    pushNodeSubLvl : PropTypes.func.isRequired
};

class PushDouble extends React.Component {
    render(){
      let functionval = this.props.functionval;

      if(functionval === 2 || functionval === 4 ){
        return null;
      }
        return (
            <div>
                <div className="row text-center" style={styles.hierarachybuttons}>
                    <button onClick={this.props.pushNodeAll}>
                        <span className="glyphicon glyphicon-chevron-right" />
                        <span className="glyphicon glyphicon-chevron-right" />
                    </button>
                </div>
                <div className="row text-center" style={styles.hierarachybuttons}>
                    <button  onClick={this.props.unpushNodeAll}>
                        <span className="glyphicon glyphicon-chevron-left" />
                        <span className="glyphicon glyphicon-chevron-left" />
                    </button>
                </div>
            </div>
        );
    }
}
PushDouble.propTypes = {
    unpushNodeAll: PropTypes.func.isRequired,
    pushNodeAll: PropTypes.func.isRequired,
    functionval: PropTypes.number.isRequired
};

class NodeViewer extends React.Component {
    render() {
        let hiddennStyle = {visibility : 'hidden', display: 'none'};
        let json = JSON.stringify(this.props.node, null, 4);

        if (!json) {
            json = "help";
        }

        return <div style={hiddennStyle}>
        <input type="hidden" id="newJsonValue" data-value={json} />
        </div>;
    }
}
NodeViewer.propTypes = {
    node: PropTypes.object
};


class TreeComponent extends React.Component {
    constructor(props) {
        super(props);
        //Perf.start();
        this.state = {data:this.props.hierarchyJson, selectednodes: [], chosennodes:[], nodesToUnpush:[]};
        this.onToggle = this.onToggle.bind(this);
        this.onToggle2 = this.onToggle2.bind(this);
        this.onToggle3 = this.onToggle3.bind(this);
        this.onPush = this.onPush.bind(this);
        this.onPushSubLevel = this.onPushSubLevel.bind(this);
        this.onUnpushNode = this.onUnpushNode.bind(this);
        this.onUnpushNode2 = this.onUnpushNode2.bind(this);
        this.onpushNode2 = this.onpushNode2.bind(this);
        this.test = this.test.bind(this);
        this.selectFromAssignment = this.selectFromAssignment.bind(this);
    }

    componentDidUpdate() {
      //Perf.stop()
      //Perf.printInclusive()
      //Perf.printWasted()
    }

    onToggle(node, toggled) {
        const {cursor} = this.state;

        if (cursor) {
            cursor.active = false;
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        this.setState({cursor: node});
    }


    onToggle2(node, toggled) {
      if(node.pushed === true || node.blocked === true){
        return;
      }
      node.chosen = !node.chosen;
      this.setState({cursor: node});
    }


    onToggle3(node, toggled) {
      if(node.chosenToUnpush === undefined){
        node.chosenToUnpush = true;
      }else{
        node.chosenToUnpush = !node.chosenToUnpush;
      }
      this.setState({cursor: node});
    }

    test(obj){
      alert(obj);
    }

    selectFromAssignment(obj){
            let unpushed = [];
            if(this.state.nodesToUnpush !== undefined ){
              unpushed = this.state.nodesToUnpush;
            }
            if(obj.selected === undefined){
                obj.selected = true;
            }
            else{
              obj.selected = !obj.selected;
            }

            if(obj.selected === true){
              unpushed.push(obj.id);
            }else{
              var index = unpushed.indexOf(obj.id);
              if(index !== -1){
                  unpushed.splice(index,1);
              }
          }
            this.setState({nodesToUnpush:unpushed})
    }

    onFilterMouseUp(e) {
        const filter = e.target.value.trim();
        if (!filter) {
            return this.setState({data:this.props.hierarchyJson});
        }
        var filtered = filters.filterTree(this.props.hierarchyJson, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState({data: filtered});
    }

    onUnpushNode(event){
      const tree = [];
      const unpushAlertText = this.props.unpushAlertText;
      tree.push(this.state.data);
      let counter = filters.unpushAllAssignedNodes(tree,unpushAlertText,0 );
      if(counter === 0 ){
        alert(unpushAlertText);
      }
      this.setState({data:tree[0]});
    }

    onpushNode2(e){
      const tree = [];
      tree.push(this.state.data);
      filters.pushAllNodes(tree);
      this.setState({data:tree[0]});
    }

    onUnpushNode2(e){
      const tree = [];
      tree.push(this.state.data);
      filters.unpushAllNodes(tree);
      this.setState({data:tree[0],selectednodes:[], selectednodesid:[],selectedNodeNames:[]});
    }

    onPush(event){
        const tree = [];
        const pushAlertText = this.props.pushAlertText;
        tree.push(this.state.data);
        var chosennodes =  filters.getChosenNodes(tree);

        if(chosennodes.length === 0){
          alert(pushAlertText);
          return;
        }

        let previousNodes = this.state.selectednodes;
        let resultNames = [];
        let resultNodes = [];

        if(this.state.selectednodesid !== undefined && this.state.selectednodesid != null){
              resultNodes = this.state.selectednodesid ;
        }

        if(this.state.selectedNodeNames !== undefined && this.state.selectedNodeNames != null){
              resultNames = this.state.selectedNodeNames ;
        }

        chosennodes.forEach(node => {
            previousNodes.push(node);
            resultNames = resultNames.concat([node.name]);
            resultNodes = resultNodes.concat([node.id]);
        })

        this.setState({selectednodes: previousNodes, selectednodesid:resultNodes, data:tree[0], selectedNodeNames:resultNames, updateSelection:true});
    }


    onPushSubLevel(e){
        const tree = [];
        const pushAlertText = this.props.pushAlertText;
        tree.push(this.state.data);
        var chosennodes =  filters.getChosenNodesWithSubLevel(tree);

        if(chosennodes.length === 0){
          alert(pushAlertText);
          return;
        }

        let previousNodes = this.state.selectednodes;
        let resultNames = [];
        let resultNodes = [];

        if(this.state.selectednodesid !== undefined && this.state.selectednodesid != null){
              resultNodes = this.state.selectednodesid ;
        }

        if(this.state.selectedNodeNames !== undefined && this.state.selectedNodeNames != null){
              resultNames = this.state.selectedNodeNames ;
        }

        chosennodes.forEach(node => {
            previousNodes.push(node);
            resultNames = resultNames.concat([node.name]);
            resultNodes = resultNodes.concat([node.id]);
        })

        this.setState({selectednodes: previousNodes, selectednodesid:resultNodes, data:tree[0], selectedNodeNames:resultNames, updateSelection:true});
    }

    render() {
        const {data: stateData, chosennodes} = this.state;
        const selectednodes = this.state.selectednodes;
        const funcMode = this.props.functionMode;
        const labelText = this.props.pushLabelValue;
        const unpushAlertText = this.props.unpushAlertText;
        const pushAlertText = this.props.pushAlertText;
        return (
            <StyleRoot>
              <div className="allboxholder">
                <div className="row">
                    <div className="col-lg-5" style={styles.searchBoxPad}>
                        <input className="form-control"
                               onKeyUp={this.onFilterMouseUp.bind(this)}
                               placeholder="Search the tree..."
                               type="text"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-5 rfmtreebox" style={styles.component}>
                        <RfmTree data={stateData}
                                 selectednodes={selectednodes}
                                 decorators={decorators}
                                 onToggle={this.onToggle}
                                 onToggle2={this.onToggle2}
                                 chosennodes={chosennodes}/>
                    </div>
                    <div className="col-lg-2">
                        <PushButton pushNode={this.onPush} functionval={funcMode}
                                    pushNodeSubLvl={this.onPushSubLevel}
                                    unpushNode={this.onUnpushNode}
                                    pushLabelValue={labelText}
                                    pushAlertText={pushAlertText} />
                        <PushDouble functionval={funcMode} unpushNodeAll={this.onUnpushNode2}
                                    pushNodeAll={this.onpushNode2}
                                    unpushAlertText={unpushAlertText}/>
                    </div>
                  
                </div>
              </div>
            </StyleRoot>
        );
    }
}

TreeComponent.propTypes = {
    /**     Hierarchy Json String sent by the server  */
    hierarchyJson: PropTypes.object.isRequired,

    /**     Available modes are 1:Market-Only 2:Push-Sub_Flag 3:Expand_Rests 4: AuditLog */
    functionMode: PropTypes.number.isRequired,

    /**     HTML ID prop     */
    htmlId: PropTypes.string.isRequired,

    /**    Label value for include sub levels. React cannot acccess I18n directly. Only use on mode 2    */
    pushLabelValue: PropTypes.string,

    /** Alert text for no nodes chosen to unpush */
    unpushAlertText: PropTypes.string.isRequired,

    /** Alert text for no nodes chosen to unpush */
    pushAlertText: PropTypes.string.isRequired,
}

export default TreeComponent;
