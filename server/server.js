const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();

const port = 3000;
const darkSkyURL =
  'https://api.darksky.net/forecast/[DARKSKY_API_KEY]/42.3601,-71.0589?exclude=[minutely,hourly,flags]';

app.use(cors());

app.get('/weather', async (req, res) => {
  try {
    const data = await axios.get(darkSkyURL);
    const darkSkyData = data.data;

    res.send(
      JSON.stringify({
        currentTime: darkSkyData.currently.time,
        todayIcon: darkSkyData.currently.icon,
        todaySummary: darkSkyData.currently.summary,
        currentTemperature: darkSkyData.currently.temperature,
        currentApparentTemperature: darkSkyData.currently.apparentTemperature,
        currentPrecipitation: darkSkyData.currently.precipProbability,
        currentHumidity: darkSkyData.currently.humidity,
        currentDewPoint: darkSkyData.currently.dewPoint,
        currentPressure: darkSkyData.currently.pressure,
        currentWindSpeed: darkSkyData.currently.windSpeed,
        currentUVIndex: darkSkyData.currently.uvIndex,
        currentVisibility: darkSkyData.currently.visibility,
        dailyForecast: darkSkyData.daily.data
      })
    );
  } catch (err) {
    console.log(err);
    res.send('ERROR!');
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));