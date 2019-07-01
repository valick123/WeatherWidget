import React from 'react';
export class ControllBar extends React.Component {
    constructor(props) {
        super(props);
        this.select = React.createRef();
    }

    getCookieValue = (name) => {

        let matches = null
        document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        )) !== null ? matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ))[1] : matches = null
        return matches !== undefined || matches !== null ? matches : 0;
    }
    setWeatherSource = () => {
        this.props.source(this.select.current.value)
        this.props.info({}, false)
        this.getWeatherInfo()


        document.cookie = `sourceSelect=${this.select.current.value}`

    }
    getWeatherInfo = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let weatherSourceURL = null
            switch (this.props.sourceInfo) {
                case 'OpenWeather':
                    weatherSourceURL = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=ec4d19bc7d1e29c21e0f91441ded26a7`;
                    break;
                case 'Weatherbit':
                    weatherSourceURL = `https://api.weatherbit.io/v2.0/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=79df585ea0374ab1a7e688956807a429`
                    break;
                default: weatherSourceURL = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=ec4d19bc7d1e29c21e0f91441ded26a7`
            }
            let xhr = new XMLHttpRequest();
            xhr.open("GET", weatherSourceURL, false);
            xhr.send();
            this.props.info(JSON.parse(xhr.responseText))
        })
    }
    componentWillMount() {
        this.getWeatherInfo()
        if (this.getCookieValue('sourceSelect')) { this.props.source(this.getCookieValue('sourceSelect')) }


    }

    componentDidMount() {
        this.select.current.value = this.getCookieValue('sourceSelect') ? this.getCookieValue('sourceSelect') : this.select.current.value = "OpenWeather";
        setInterval(() => {

            this.getWeatherInfo()
        }, 7200000)
    }
    render() {
        return <div className="widget__header">
            <select ref={this.select} onChange={this.setWeatherSource} className='source'>
                <option value='OpenWeather'>OpenWeather</option>
                <option value='Weatherbit'>Weatherbit</option>
            </select>
            <button onClick={this.getWeatherInfo} className='getWeatherBtn'>getWeather</button>
        </div>
    }
}
