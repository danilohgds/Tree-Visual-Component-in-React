import React from 'react';
import PropTypes from 'prop-types';

import TreeNode from './assignednode';
import defaultDecorators from './assigneddecorators';
import defaultTheme from './themes/default';
import defaultAnimations from './themes/animations';

class AssignedRfmTree extends React.Component {
    render() {
        const {animations, decorators, data: propsData, onToggle,onToggle3, style, chosennodes} = this.props;
        let data = propsData;

        if (!Array.isArray(data)) {
            data = [data];
        }

        return (
            <div style={style.tree.base}
                ref={ref => this.treeBaseRef = ref}>
                {data.map((node, index) =>
                    <TreeNode animations={animations}
                              decorators={decorators}
                              key={node.id || index}
                              node={node}
                              onToggle={onToggle}
                              onToggle3={onToggle3}
                              style={style.tree.node}
                              chosennodes={chosennodes}/>
                )}
            </div>
        );
    }
}

AssignedRfmTree.propTypes = {
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
    onToggle3: PropTypes.func,
    decorators: PropTypes.object,
    chosennodes: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};

AssignedRfmTree.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators
};

export default AssignedRfmTree;
