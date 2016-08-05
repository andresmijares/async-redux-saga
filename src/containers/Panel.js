/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import Dashboard from '../components/Dashboard';
import Mixin from './CustomMixin';

const Panel = (props) => {
  return(
        <div className="col-md-4">
          <Dashboard title="Panel Sequenced" user={props.user} data={props.dashboard} />
        </div>
    );
};

let PanelMixed = Mixin(Panel);

const mapStateToProps =(state) => ({
    user : state.user,
    dashboard : state.dashboard
});

function mapDispatchToProps(dispatch) {
  return {
    loadDashboard : function() {
      return dispatch({type: 'LOAD_DASHBOARD'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelMixed);
