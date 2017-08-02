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
   let cursorType = 'pointer';

   let subLevelSign = null;

   if(node.subLevel){
     subLevelSign = '*';
   }


   if(node.chosenToUnpush === true){
       chosenStyle = {fontWeight  : 'bold', backgroundColor: '#ebeef4', cursor : cursorType};
   }
   else{
       chosenStyle = {fontWeight : 'bold', cursor : cursorType};
   }

    return (
            <div style={chosenStyle}>
              <span>{node.name} {subLevelSign}</span>
            </div>
    );
};

HeaderLabel.propTypes = {
    style: PropTypes.object,
    node: PropTypes.object.isRequired
};

class Container extends React.Component {
    render() {
        const {style, decorators, onClick3, node} = this.props;
        return (
            <div className="row">
              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12" onClick={onClick3}
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
    onClick3: PropTypes.func.isRequired,
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
