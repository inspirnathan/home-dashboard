import moment from 'moment';
import axios from 'axios';

const darkSkyURL = 'http://localhost:3000/weather';

export const getDarkSkyData = async () => {
  try {
    const data = await axios.get(darkSkyURL);
    const darkSkyData = data.data;

    return darkSkyData;
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return '';
  }
};

export const getDayOfWeek = time => moment.unix(time).format('dddd');

export const getTodayDayOfWeek = () => moment().format('dddd');

export const getRecentWeatherTimeStamp = time =>
  moment.unix(time).format('dddd, MMM DD, h:mm A');

export const getTodaySunriseSunsetTime = time =>
  moment.unix(time).format('h:mm A');

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const getIconFormatted = icon => {
  return icon
    .split('-')
    .map(el => capitalize(el))
    .join(' ');
};

export const mapIconToImg = {
  'clear-day': 'fas fa-sun',
  'clear-night': 'fas fa-moon',
  rain: 'fas fa-cloud-rain',
  snow: 'fas fa-cloud-snow',
  sleet: 'fas fa-cloud-sleet',
  wind: 'fas fa-wind',
  fog: 'fab fa-cloudversify',
  cloudy: 'fas fa-cloud',
  'partly-cloudy-day': 'fas fa-cloud-sun',
  'partly-cloudy-night': 'fas fa-cloud-moon'
};

export const pendingData = {
  currentTime: '',
  todayIcon: '',
  todaySummary: '',
  currentTemperature: '',
  currentApparentTemperature: '',
  currentPrecipitation: '',
  currentHumidity: '',
  currentDewPoint: '',
  currentPressure: '',
  currentWindSpeed: '',
  currentUVIndex: '',
  currentVisibility: '',
  dailyForecast: Array.from({ length: 8 }, () => {
    return {
      time: '',
      summary: '',
      icon: '',
      sunriseTime: '',
      sunsetTime: '',
      moonPhase: '',
      precipIntensity: '',
      precipIntensityMax: '',
      precipIntensityMaxTime: '',
      precipProbability: '',
      precipType: '',
      temperatureHigh: '',
      temperatureHighTime: '',
      temperatureLow: '',
      temperatureLowTime: '',
      apparentTemperatureHigh: '',
      apparentTemperatureHighTime: '',
      apparentTemperatureLow: '',
      apparentTemperatureLowTime: '',
      dewPoint: '',
      humidity: '',
      pressure: '',
      windSpeed: '',
      windGust: '',
      windGustTime: '',
      windBearing: '',
      cloudCover: '',
      uvIndex: '',
      uvIndexTime: '',
      visibility: '',
      ozone: '',
      temperatureMin: '',
      temperatureMinTime: '',
      temperatureMax: '',
      temperatureMaxTime: '',
      apparentTemperatureMin: '',
      apparentTemperatureMinTime: '',
      apparentTemperatureMax: '',
      apparentTemperatureMaxTime: ''
    };
  })
};
