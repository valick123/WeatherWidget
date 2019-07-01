import React from 'react'
export class WeatherBar extends React.Component {
    renderInfo = () => {
        const { weatherWidgetInfo } = this.props
        if (this.props.isSeccses) {
            if (this.props.sourceInfo == 'OpenWeather' || this.props.sourceInfo == null) {
                return <div className="widget__body">
                    <div className="main">
                        <div className="rigion"><span className="rigion__text">{weatherWidgetInfo.name}</span></div>
                        <span className="temp">{(weatherWidgetInfo.main.temp - 273).toFixed(1)}</span>
                    </div>
                    <div className="description">
                        <span className="weatherCondition">{weatherWidgetInfo.weather[0].main}</span>
                        <span className="windSpeed">{weatherWidgetInfo.wind.speed.toFixed(1)}</span>
                        <span className="windDeg">{weatherWidgetInfo.wind.deg.toFixed(1)}</span>
                        <span className="humidity">{weatherWidgetInfo.main.humidity.toFixed(1)}</span>
                        <span className="pressure">{weatherWidgetInfo.main.pressure.toFixed(1)}</span>
                        <span className="cloudness">{weatherWidgetInfo.clouds.all.toFixed(1)}</span>
                    </div>

                </div>


            } else if (this.props.sourceInfo == 'Weatherbit') {
                return <div className="widget__body">
                    <div className="main">
                        <div className="rigion"><span className="rigion__text">{weatherWidgetInfo.data[0].timezone}</span></div>
                        <span className="temp">{weatherWidgetInfo.data[0].temp.toFixed(1)}</span>
                    </div>
                    <div className="description">
                        <span className="weatherCondition">{weatherWidgetInfo.data[0].weather.description}</span>
                        <span className="windSpeed">{(weatherWidgetInfo.data[0].wind_spd).toFixed(1)}</span>
                        <span className="windDeg">{weatherWidgetInfo.data[0].wind_dir.toFixed(1)}</span>
                        <span className="humidity">{weatherWidgetInfo.data[0].rh.toFixed(1)}</span>
                        <span className="pressure">{weatherWidgetInfo.data[0].pres.toFixed(1)}</span>
                        <span className="cloudness">{weatherWidgetInfo.data[0].clouds.toFixed(1)}</span>
                    </div>

                </div>


            }
        } else {
            return <div></div>
        }
    }
    render() {

        return <React.Fragment>{this.renderInfo()}</React.Fragment>



    }
}