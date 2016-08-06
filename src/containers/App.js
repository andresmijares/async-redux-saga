import React, {PropTypes} from 'react';

class App extends React.Component {
    render() {
      return (
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              {this.props.panel}
              {this.props.panel2}
              {this.props.panel3}
              <a href="https://github.com/andresmijares/async-redux-saga" target="_new">Check the repo here</a>
            </div>
          </div>
        </div>
      );
    }
}

App.propTypes = {
  panel: PropTypes.object.isRequired,
  panel2: PropTypes.object.isRequired,
  panel3: PropTypes.object.isRequired
};

export default App;
