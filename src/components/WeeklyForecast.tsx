import React from 'react';
import { WeeklyForecast as WeeklyForecastType } from '../services/weatherApi';
import './WeeklyForecast.css';

interface WeeklyForecastProps {
  weeklyForecast: WeeklyForecastType[];
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ weeklyForecast }) => {
  if (!weeklyForecast || weeklyForecast.length === 0) {
    return (
      <div className="weekly-forecast">
        <h3>7天预报</h3>
        <div className="no-data">暂无7天预报数据</div>
      </div>
    );
  }

  const getWeatherIcon = (weatherImg: string) => {
    const iconMap: { [key: string]: string } = {
      'qing': '☀️',
      'yun': '⛅',
      'yu': '🌧️',
      'yin': '☁️',
      'xue': '❄️',
      'wu': '🌫️'
    };
    return iconMap[weatherImg] || '🌤️';
  };

  return (
    <div className="weekly-forecast">
      <h3>7天预报</h3>
      <div className="forecast-grid">
        {weeklyForecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="day-header">
              <div className="date">{day.date}</div>
              <div className="week">{day.week}</div>
            </div>
            <div className="weather-icon">
              {getWeatherIcon(day.weatherImg)}
            </div>
            <div className="weather-desc">{day.weather}</div>
            <div className="temperature">
              <span className="high">{day.highTemp}°</span>
              <span className="low">{day.lowTemp}°</span>
            </div>
            <div className="wind-info">
              <div className="wind">{day.wind}</div>
              <div className="wind-speed">{day.windSpeed}</div>
            </div>
            <div className="details">
              <div className="detail-item">
                <span className="label">湿度:</span>
                <span className="value">{day.humidity}</span>
              </div>
              <div className="detail-item">
                <span className="label">能见度:</span>
                <span className="value">{day.visibility}</span>
              </div>
              <div className="detail-item">
                <span className="label">气压:</span>
                <span className="value">{day.pressure}hPa</span>
              </div>
              <div className="detail-item">
                <span className="label">降水:</span>
                <span className="value">{day.rainPcpn}mm</span>
              </div>
            </div>
            <div className="sun-times">
              <div className="sunrise">
                <span className="icon">🌅</span>
                <span className="time">{day.sunrise}</span>
              </div>
              <div className="sunset">
                <span className="icon">🌇</span>
                <span className="time">{day.sunset}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
