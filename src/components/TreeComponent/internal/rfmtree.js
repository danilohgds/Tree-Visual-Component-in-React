import React from 'react';
import PropTypes from 'prop-types';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultTheme from './themes/default';
import defaultAnimations from './themes/animations';

class RfmTree extends React.Component {
    render() {
        const {animations, decorators, data: propsData, onToggle,onToggle2, style, selectNode,chosennodes} = this.props;
        let data = propsData;
        let pushedData = [];

        if (!Array.isArray(data)) {
            data = [data];
        }

        return (
            <ul style={style.tree.base}
                ref={ref => this.treeBaseRef = ref}>
                {data.map((node, index) =>
                    <TreeNode animations={animations}
                              decorators={decorators}
                              key={node.id || index}
                              node={node}
                              onToggle={onToggle}
                              onToggle2={onToggle2}
                              style={style.tree.node}
                              selectNode={selectNode}
                              chosennodes={chosennodes}/>
                )}
            </ul>
        );
    }
}

RfmTree.propTypes = {
    style: PropTypes.object,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onToggle: PropTypes.func,
    onToggle2: PropTypes.func,
    decorators: PropTypes.object,
    selectNode: PropTypes.func,
    chosennodes: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};

RfmTree.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators
};

export default RfmTree;
