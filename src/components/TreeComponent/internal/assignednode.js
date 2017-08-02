import React from 'react';
import PropTypes from 'prop-types';

import AssignedNodeHeader from './assignedheader';

class AssignedTreeNode extends React.Component {
    constructor() {
        super();
        this.onClick3 = this.onClick3.bind(this);
    }

    onClick3() {
        const {node, onToggle3} = this.props;
        const {toggled} = node;
        if (onToggle3) {
            onToggle3(node, !toggled);
        }
    }

    decorators() {
        // Merge Any Node Based Decorators Into The Pack
        const {decorators, node} = this.props;
        let nodeDecorators = node.decorators || {};

        return Object.assign({}, decorators, nodeDecorators);
    }

    render() {
        const {style} = this.props;
        const decorators = this.decorators();

        return (
            <div ref={ref => this.topLevelRef = ref}
                style={style.base}>
                {this.renderHeader(decorators, null)}

                {this.renderDrawer(decorators, null)}
            </div>
        );
    }

    renderDrawer(decorators, animations) {
        return this.renderChildren(decorators, animations);
    }

    renderHeader(decorators, animations) {
        const {node, style} = this.props;

        if(node.pushed !== true){
          return null;
        }

        return (
            <AssignedNodeHeader animations={animations}
                        decorators={decorators}
                        node={Object.assign({}, node)}
                        onClick3={this.onClick3}
                        style={style}
                        chosennodes={this.chosennodes}
                        test={this.test}/>
        );
    }

    renderChildren(decorators) {
        const {animations, decorators: propDecorators, node, style} = this.props;

        let children = node.children;
        if (!Array.isArray(children)) {
            children = children ? [children] : [];
        }

        return (
            <div style={style.assignedsubtree}
                ref={ref => this.subtreeRef = ref}>
                {children.map((child, index) => <AssignedTreeNode {...this._eventBubbles2()}
                                                          animations={animations}
                                                          decorators={propDecorators}
                                                          key={child.id || index}
                                                          node={child}
                                                          style={style}/>
                )}
            </div>
        );
    }

    _eventBubbles2() {
        const {onToggle3} = this.props;

        return {
            onToggle3
        };
    }
}

AssignedTreeNode.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onToggle3: PropTypes.func,
    test: PropTypes.func,
    selectNode: PropTypes.func,
    pushNode: PropTypes.func,
    pullNode: PropTypes.func
};

export default AssignedTreeNode;
