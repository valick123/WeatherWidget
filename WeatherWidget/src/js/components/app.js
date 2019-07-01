import React from 'react';
import { WeatherBar } from './weatherBar';
import { ControllBar } from './controllBar'
export class App extends React.Component {
    state = {

        weatherInfo: {},
        seccses: false,
        weatherSource: null
    }
    setWeatherData = (info, seccses = true) => {
        this.setState({

            weatherInfo: info,
            seccses: seccses
        })
    }
    setWeathersource = (source) => {
        this.setState({
            weatherSource: source
        })
    }
    render() {
        return <div className="widget">
            <ControllBar info={this.setWeatherData} source={this.setWeathersource} sourceInfo={this.state.weatherSource} />
            <WeatherBar weatherWidgetInfo={this.state.weatherInfo} isSeccses={
                this.state.seccses} sourceInfo={this.state.weatherSource} />
        </div>
    }
}