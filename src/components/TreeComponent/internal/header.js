
import React from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import deepEqual from 'deep-equal';

class NodeHeader extends React.Component {
    shouldComponentUpdate(nextProps) {
        const props = this.props;
        const nextPropKeys = Object.keys(nextProps);

        for (let i = 0; i < nextPropKeys.length; i++) {
            const key = nextPropKeys[i];

            if (key === 'animations' || key === 'chosen' || key === 'pushNode'
                || key === 'pullNode' || key ==='chosennodes') {
                continue;
            }

            const isEqual = shallowEqual(props[key], nextProps[key]);
            if (!isEqual) {
                return true;
            }
        }

        return !deepEqual(props.animations, nextProps.animations, {strict: true});
    }

    render() {
        const {animations, decorators, node, onClick,onClick2, style, selectNode, pushNode, pullNode} = this.props;
        const {active, children} = node;
        const terminal = !children;
        const container = [style.link, active ? style.activeLink : null];
        const headerStyles = Object.assign({container}, style);

        return (
          <div>
            <decorators.Container animations={animations}
                                  decorators={decorators}
                                  node={node}
                                  onClick={onClick}
                                  onClick2={onClick2}
                                  style={headerStyles}
                                  terminal={terminal}
                                  selectNode={selectNode}
                                  pushNode={pushNode}
                                  pullNode={pullNode}/>
          </div>
        );
    }
}

NodeHeader.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    node: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    onClick2: PropTypes.func,
    selectNode: PropTypes.func,
    pushNode: PropTypes.func,
    pullNode: PropTypes.func
};

export default NodeHeader;
