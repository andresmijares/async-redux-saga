/* eslint-disable react/display-name*/
import React, {PropTypes} from 'react';

let Mixin = InnerComponent => class extends React.Component {

  static propTypes() {
    return {
      loadDashboard : PropTypes.loadDashboard.func.isRequired,
      user : PropTypes.user.object.isRequired,
      dashboard3: PropTypes.object.isRequired
    };
  }

 componentDidMount() {
   /*start the loading*/
   this.props.loadDashboard();
 }
  render() {
    return (<InnerComponent
      {...this.state}
      {...this.props} />);
  }
};

export default Mixin;
