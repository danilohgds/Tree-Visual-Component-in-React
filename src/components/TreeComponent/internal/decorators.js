import React from 'react';
import PropTypes from 'prop-types';
import {VelocityComponent} from 'velocity-react';

const Loading = ({style}) => {
    return <div style={style}>loading...</div>;
};
Loading.propTypes = {
    style: PropTypes.object
};

const Toggle = ({style}) => {
    return (
      <div style={style.base}>
        <div style={style.wrapper}>
        </div>
      </div>
    );
};
Toggle.propTypes = {
    node: PropTypes.object
};

const Header = ({node, style}) => {
    return (
        <div style={style.base}>
            <div style={style.title}>
            </div>
        </div>
    );
};
Header.propTypes = {
    style: PropTypes.object,
    node: PropTypes.object.isRequired
};

const HeaderLabel = ({node, style}) => {

   let chosenStyle = null;
   let cursorType = null;
   let spantag = null;

   if(node.pushed || node.blocked){
     cursorType = 'not-allowed';
   }else{
     cursorType = 'pointer';
   }

   if(node.chosen){
       chosenStyle = {fontWeight  : 'bold', backgroundColor: '#ebeef4', cursor : cursorType};
   }else if(node.blocked){
      chosenStyle = {fontWeight  : 'bold', color: 'gray', cursor : cursorType};
   }
   else{
       chosenStyle = {fontWeight : 'bold', cursor : cursorType};
   }

   if(node.leaf === 1){
       spantag = <span>{node.legacyid} {node.name} </span>;
   }else{
       spantag = <span>{node.name} </span>;
   }

    return (
            <div style={chosenStyle}>
              {spantag}
            </div>
    );
};

HeaderLabel.propTypes = {
    style: PropTypes.object,
    node: PropTypes.object.isRequired
};

class Container extends React.Component {
    render() {
        const {style, decorators, onClick,onClick2, node} = this.props;
        return (
            <div className="row">
              <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2" style={style.container} onClick={onClick}
                   ref={ref => this.clickableRef = ref} >
                  <decorators.Header node={node}
                                     style={style.header}/>
              </div>
              <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10" onClick={onClick2}
                    ref={ref => this.clickableRef = ref}>
                  <decorators.HeaderLabel node={node} style={style.header}/>
              </div>
            </div>
        );
    }

    renderToggle() {
        const {animations} = this.props;

        if (!animations) {
            return this.renderToggleDecorator();
        }

        return (
            <VelocityComponent animation={animations.toggle.animation}
                               duration={animations.toggle.duration}
                               ref={ref => this.velocityRef = ref}>
                {this.renderToggleDecorator()}
            </VelocityComponent>
        );
    }

    renderToggleDecorator() {
        const {style, decorators} = this.props;

        return <decorators.Toggle style={style.toggle}/>;
    }
}
Container.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    terminal: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onClick2: PropTypes.func.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    node: PropTypes.object.isRequired
};

export default {
    Loading,
    Toggle,
    Header,
    Container,
    HeaderLabel
};
