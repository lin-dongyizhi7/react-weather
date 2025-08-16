import React, { useState } from 'react';
import { MonthlyForecast as MonthlyForecastType } from '../services/weatherApi';
import './MonthlyForecast.css';

interface MonthlyForecastProps {
  monthlyForecast: MonthlyForecastType[];
}

const MonthlyForecast: React.FC<MonthlyForecastProps> = ({ monthlyForecast }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(monthlyForecast.length / itemsPerPage);

  if (!monthlyForecast || monthlyForecast.length === 0) {
    return (
      <div className="monthly-forecast">
        <h3>30天预报</h3>
        <div className="no-data">暂无30天预报数据</div>
      </div>
    );
  }

  const getWeatherIcon = (weatherImg: string) => {
    const iconMap: { [key: string]: string } = {
      'qing': '☀️', 'yun': '⛅', 'yu': '🌧️', 'yin': '☁️', 'xue': '❄️', 'wu': '🌫️'
    };
    return iconMap[weatherImg] || '🌤️';
  };

  const getCurrentPageData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return monthlyForecast.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="monthly-forecast">
      <h3>30天预报</h3>
      
      <div className="forecast-table">
        <div className="table-header">
          <div className="header-cell">日期</div>
          <div className="header-cell">星期</div>
          <div className="header-cell">天气</div>
          <div className="header-cell">温度</div>
          <div className="header-cell">风向</div>
          <div className="header-cell">湿度</div>
        </div>
        
        <div className="table-body">
          {getCurrentPageData().map((day, index) => (
            <div key={index} className="table-row">
              <div className="table-cell date-cell">{day.date}</div>
              <div className="table-cell week-cell">{day.week}</div>
              <div className="table-cell weather-cell">
                <span className="weather-icon">{getWeatherIcon(day.weatherImg)}</span>
                <span className="weather-text">{day.weather}</span>
              </div>
              <div className="table-cell temp-cell">
                <span className="high-temp">{day.highTemp}°</span>
                <span className="low-temp">{day.lowTemp}°</span>
              </div>
              <div className="table-cell wind-cell">
                <div>{day.wind}</div>
                <div className="wind-speed">{day.windSpeed}</div>
              </div>
              <div className="table-cell humidity-cell">{day.humidity}</div>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            上一页
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-number ${i === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <button 
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            下一页
          </button>
        </div>
      )}

      <div className="forecast-stats">
        <div className="stat-item">
          <span className="stat-label">总天数:</span>
          <span className="stat-value">{monthlyForecast.length}天</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">当前页:</span>
          <span className="stat-value">{currentPage + 1}/{totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyForecast;

