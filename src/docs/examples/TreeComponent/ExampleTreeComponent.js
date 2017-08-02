import React from 'react';
import TreeComponent from 'rfm2-reusable-components/TreeComponent';
import HierarchyJson from './internal/Data';
import $ from 'jquery';

/** Custom RFM2 TreeGen made with ReactJS: */
export default function ExampleTreeComponent() {
    return <TreeComponent hierarchyJson={HierarchyJson} functionMode={3} htmlId="tree1"
    pushLabelValue="incluir o SubLevel "
    unpushAlertText="plz choose something"
    pushAlertText="plz choose something"   />
}
