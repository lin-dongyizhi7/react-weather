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

  const getWindDirection = (windSpeed: number) => {
    if (windSpeed < 5) return '微风';
    if (windSpeed < 10) return '轻风';
    if (windSpeed < 15) return '中风';
    if (windSpeed < 20) return '强风';
    return '大风';
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="city-info">
          <h1 className="city-name">{weatherData.city}</h1>
          <p className="current-time">
            {new Date().toLocaleString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
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
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <div className="detail-label">湿度</div>
            <div className="detail-value">{weatherData.humidity}%</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">💨</div>
          <div className="detail-content">
            <div className="detail-label">风速</div>
            <div className="detail-value">
              {weatherData.windSpeed} km/h
              <div className="wind-desc">{getWindDirection(weatherData.windSpeed)}</div>
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
            <div className="detail-value">{weatherData.visibility} km</div>
          </div>
        </div>
      </div>

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

      <div className="hourly-preview">
        <h3>今日预报</h3>
        <div className="hourly-list">
          {weatherData.hourlyForecast.slice(0, 6).map((item, index) => (
            <div key={index} className="hourly-item">
              <div className="hourly-time">{item.time}</div>
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
