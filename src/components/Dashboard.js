import React, {PropTypes} from 'react';

const Dashboard = ({title, user, data = {}}) => {

    const {departure, flight, forecast} = data;
    
    const displayUserName = () => {
        return (!!user) ? user.email : null;
    };

    const displayFlight = () => {
      return (!!flight) ? flight.plane.make : null;
    };

    const displayDeparture = () => {
      return (!!departure) ? departure.date : null;
    };

    const displayForecast = () => {
      return (!!forecast) ? forecast.forecast : null;
    };

   return (<div className="o-dashboard panel panel-default">
      <div className="panel-heading"><h4>{title}</h4></div>
      <div className="panel-body">
          <div className="user-name">
            <h5>Here is your itinerary:</h5>
            <span className="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;
            {displayUserName() || <span className="loading"></span>}
          </div>
          <div className="i-departure">
            <strong>Your Departure:</strong>  {displayDeparture() || <span className="loading"></span>}
          </div>
          <div className="i-flight">
            <strong>Your Flight:</strong>  {displayFlight() || <span className="loading"></span>}
          </div>
          <div className="i-forecast">
            <strong>Weather Forecast:</strong>  {displayForecast() || <span className="loading"></span>}
          </div>
      </div>
    </div>);
};

Dashboard.propTypes = {
  user : PropTypes.object,
  data : PropTypes.object,
  title : PropTypes.string
};

export default Dashboard;
