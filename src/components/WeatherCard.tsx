import React from 'react';
import { WeatherData } from '../services/weatherApi';
import './WeatherCard.css';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case '晴天':
        return '☀️';
      case '多云':
        return '⛅';
      case '小雨':
        return '🌧️';
      case '阴天':
        return '☁️';
      case '雪':
        return '❄️';
      default:
        return '🌤️';
    }
  };

  const getWindDescription = (windSpeed: string) => {
    if (windSpeed.includes('1级') || windSpeed.includes('2级')) return '微风';
    if (windSpeed.includes('3级') || windSpeed.includes('4级')) return '轻风';
    if (windSpeed.includes('5级') || windSpeed.includes('6级')) return '中风';
    if (windSpeed.includes('7级') || windSpeed.includes('8级')) return '强风';
    return '大风';
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="city-info">
          <h1 className="city-name">{weatherData.city}</h1>
          <p className="current-time">
            {weatherData.date} {weatherData.week} {weatherData.update_time}
          </p>
        </div>
        <div className="weather-icon">
          {getWeatherIcon(weatherData.weather)}
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">{weatherData.temperature}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="weather-desc">{weatherData.weather}</div>
        <div className="temp-range">
          {weatherData.lowTemp}° / {weatherData.highTemp}°
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <div className="detail-label">湿度</div>
            <div className="detail-value">{weatherData.humidity}</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">💨</div>
          <div className="detail-content">
            <div className="detail-label">风速</div>
            <div className="detail-value">
              {weatherData.windSpeed}
              <div className="wind-desc">{getWindDescription(weatherData.windSpeed)}</div>
            </div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <div className="detail-label">气压</div>
            <div className="detail-value">{weatherData.pressure} hPa</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">👁️</div>
          <div className="detail-content">
            <div className="detail-label">能见度</div>
            <div className="detail-value">{weatherData.visibility}</div>
          </div>
        </div>
      </div>

      {weatherData.air && weatherData.air !== '0' && (
        <div className="air-quality">
          <h3>空气质量</h3>
          <div className="air-info">
            <div className="air-level">
              <span className="air-label">AQI:</span>
              <span className="air-value">{weatherData.air}</span>
              <span className="air-status">{weatherData.airLevel}</span>
            </div>
            <div className="air-tips">{weatherData.airTips}</div>
          </div>
        </div>
      )}

      <div className="sun-info">
        <div className="sun-item">
          <div className="sun-icon">🌅</div>
          <div className="sun-time">
            <div className="sun-label">日出</div>
            <div className="sun-value">{weatherData.sunrise}</div>
          </div>
        </div>
        <div className="sun-item">
          <div className="sun-icon">🌇</div>
          <div className="sun-time">
            <div className="sun-label">日落</div>
            <div className="sun-value">{weatherData.sunset}</div>
          </div>
        </div>
      </div>

      {weatherData.alarm && weatherData.alarm.length > 0 && (
        <div className="weather-alarm">
          <h3>⚠️ 气象预警</h3>
          {weatherData.alarm.map((alarm, index) => (
            <div key={index} className="alarm-item">
              <div className="alarm-header">
                <span className="alarm-type">{alarm.alarmType}</span>
                <span className={`alarm-level ${alarm.alarmLevel}`}>{alarm.alarmLevel}</span>
              </div>
              <div className="alarm-title">{alarm.alarmTitle}</div>
              <div className="alarm-content">{alarm.alarmContent}</div>
            </div>
          ))}
        </div>
      )}

      <div className="hourly-preview">
        <h3>24小时预报</h3>
        <div className="hourly-list">
          {weatherData.hourlyForecast.slice(0, 6).map((item, index) => (
            <div key={index} className="hourly-item">
              <div className="hourly-time">{item.hours}</div>
              <div className="hourly-icon">{getWeatherIcon(item.weather)}</div>
              <div className="hourly-temp">{item.temperature}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

