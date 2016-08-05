/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import Dashboard from '../components/Dashboard';
import Mixin from './CustomMixin';

const Panel = (props) => {
  return(
        <div className="col-md-4">
          <Dashboard title="Panel Non Sequenced" user={props.user} data={props.dashboard2} />
        </div>
    );
};

let PanelMixed2 = Mixin(Panel);

const mapStateToProps =(state) => ({
    user : state.user,
    dashboard2 : state.dashboard2
});

function mapDispatchToProps(dispatch) {
  return {
    loadDashboard : function() {
      return dispatch({type: 'LOAD_DASHBOARD_NON_SEQUENCED'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelMixed2);
