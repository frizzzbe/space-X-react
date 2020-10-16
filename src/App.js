import React from 'react';
import './style.css';
import Header from './components/header/header.js';
import Main from './components/main/Main.js';
import Features from './components/features/features.js';
import Footer from './components/footer/footer.js';
// import Details from './components/details/details.js';
// import Calendar from './components/calendar/calendar.js';
import FetchData from './service/FetchData.js';

class App extends React.Component {

  fetchData = new FetchData();

  state = {
    rocket: "Falcon 1",
    rocketFeatures: null,
    rockets: [],
  };

  componentDidMount() {
    this.updateRocket();
    // this.fetchData.getRocket().then(data => console.log(data));
  }

  updateRocket() {
    this.fetchData.getRocket()
    .then(data => {
      this.setState({ rockets: data.map(item => item.name) });
      return data;
    })
    .then(data => {data.find(item => item.name === this.state.rocket)})
    .then(rocketFeatures => this.setState({ rocketFeatures }));
  }

  changeRocket = (rocket) => {
    this.setState({
      rocket
    }, this.updateRocket());
  }

  render(){
    return (
      <>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket}/> 
        <Main rocket={this.state.rocket}/>
        <Features/>
        <Footer/>
      </>
    );
  }
}

export default App;
