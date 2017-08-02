import React from 'react';
import PropTypes from 'prop-types';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from './header';

class TreeNode extends React.Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
        this.onClick2 = this.onClick2.bind(this);
        this.pushNode = this.pushNode.bind(this);
        this.pullNode = this.pullNode.bind(this);
    }

    onClick() {
        const {node, onToggle} = this.props;
        const {toggled} = node;
        if (onToggle) {
            onToggle(node, !toggled);
        }
    }

    onClick2() {
        const {node, onToggle2} = this.props;
        const {toggled} = node;
        if (onToggle2) {
            onToggle2(node, !toggled);
        }
    }

    pushNode() {
          const {node} = this.props;
          node.pushed = true;
          this.setState({node: node});
    }

    pullNode() {
          const {node} = this.props;
          node.pushed = true;
          this.setState({node: node});
    }

    /*animations() {
        const {animations, node} = this.props;

        if (animations === false) {
            return false;
        }

        const anim = Object.assign({}, animations, node.animations);
        return {
            toggle: anim.toggle(this.props),
            drawer: anim.drawer(this.props)
        };
    }*/

    decorators() {
        // Merge Any Node Based Decorators Into The Pack
        const {decorators, node} = this.props;
        let nodeDecorators = node.decorators || {};

        return Object.assign({}, decorators, nodeDecorators);
    }

    render() {
        const {style} = this.props;
        const decorators = this.decorators();
        //const animations = this.animations();

        return (
            <li ref={ref => this.topLevelRef = ref}
                style={style.base}>
                {this.renderHeader(decorators, null)}

                {this.renderDrawer(decorators, null)}
            </li>
        );
    }

    renderDrawer(decorators, animations) {
        const {node: {toggled}} = this.props;

        if (!animations && !toggled) {
            return null;
        } else if (!animations && toggled) {
            return this.renderChildren(decorators, animations);
        }

        const {animation, duration, ...restAnimationInfo} = animations.drawer;
        return (
            <VelocityTransitionGroup {...restAnimationInfo}
                                     ref={ref => this.velocityRef = ref}>
                {toggled ? this.renderChildren(decorators, animations) : null}
            </VelocityTransitionGroup>
        );
    }

    renderHeader(decorators, animations) {
        const {node, style} = this.props;
        return (
            <NodeHeader animations={animations}
                        decorators={decorators}
                        node={Object.assign({}, node)}
                        onClick={this.onClick}
                        onClick2={this.onClick2}
                        style={style}
                        selectNode={this.onClick2}
                        pushNode={this.pushNode}
                        pullNode={this.pullNode}
                        chosennodes={this.chosennodes}
                        test={this.test}/>
        );
    }

    renderChildren(decorators) {
        const {animations, decorators: propDecorators, node, style} = this.props;

        if (node.loading) {
            return this.renderLoading(decorators);
        }

        let children = node.children;
        if (!Array.isArray(children)) {
            children = children ? [children] : [];
        }

        return (
            <ul style={style.subtree}
                ref={ref => this.subtreeRef = ref}>
                {children.map((child, index) => <TreeNode {...this._eventBubbles()}
                                                          {...this._eventBubbles2()}
                                                          animations={animations}
                                                          decorators={propDecorators}
                                                          key={child.id || index}
                                                          node={child}
                                                          style={style}/>
                )}
            </ul>
        );
    }

    renderLoading(decorators) {
        const {style} = this.props;

        return (
            <ul style={style.subtree}>
                <li>
                    <decorators.Loading style={style.loading}/>
                </li>
            </ul>
        );
    }

    _eventBubbles() {
        const {onToggle} = this.props;

        return {
            onToggle
        };
    }

    _eventBubbles2() {
        const {onToggle2} = this.props;

        return {
            onToggle2
        };
    }
}

TreeNode.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onToggle: PropTypes.func,
    onToggle2: PropTypes.func,
    test: PropTypes.func,
    selectNode: PropTypes.func,
    pushNode: PropTypes.func,
    pullNode: PropTypes.func
};

export default TreeNode;
