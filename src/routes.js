import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import PanelMixed from './containers/Panel';
import PanelMixed2 from './containers/Panel2';
import PanelMixed3 from './containers/Panel3';

export default(
  <Route  path="/" component={App} >
    <IndexRoute  components={{ panel: PanelMixed, panel2: PanelMixed2, panel3: PanelMixed3}} />
  </Route>
);
