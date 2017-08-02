import React from 'react';
import ReactDOM from 'react-dom';
import TreeComponent from './components/TreeComponent';
import $ from 'jquery';

//import registerServiceWorker from './registerServiceWorker';

const hierarchyJsonv = $('#content-treegen').attr("data-value");
const pushLabelValue = $('#content-treegen').attr("data-pushlabelvalue");
const unpushAlertText = $('#content-treegen').attr("data-unpushalerttext");
const pushAlertText = $('#content-treegen').attr("data-pushalerttext");
const funcionMode = $('#content-treegen').attr("data-functionmode");

let hierarchyJson = JSON.parse(hierarchyJsonv);

ReactDOM.render(<TreeComponent hierarchyJson={hierarchyJson} functionMode={funcionMode} htmlId="tree1"
pushLabelValue={pushLabelValue}
unpushAlertText={unpushAlertText}
pushAlertText={pushAlertText}/>, document.getElementById('root-treegen'));
//registerServiceWorker();
