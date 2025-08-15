import React, { useState, useEffect } from 'react';
import CitySearch from './CitySearch';
import WeatherCard from './WeatherCard';
import WeatherCharts from './WeatherCharts';
import { getWeatherData, getMockWeatherData, WeatherData } from '../services/weatherApi';
import './WeatherApp.css';

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentCity, setCurrentCity] = useState('北京');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    fetchWeatherData(currentCity);
  }, [currentCity]);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      let data: WeatherData;
      
      if (useMockData) {
        // 使用模拟数据
        data = getMockWeatherData(city);
        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        // 尝试使用真实API
        try {
          data = await getWeatherData(city);
        } catch (apiError) {
          console.warn('API调用失败，使用模拟数据:', apiError);
          data = getMockWeatherData(city);
          setUseMockData(true);
        }
      }
      
      setWeatherData(data);
    } catch (error) {
      setError('获取天气数据失败，请稍后重试');
      console.error('获取天气数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = (city: string) => {
    setCurrentCity(city);
  };

  const handleRefresh = () => {
    fetchWeatherData(currentCity);
  };

  const toggleDataMode = () => {
    setUseMockData(!useMockData);
  };

  if (loading && !weatherData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>正在获取天气数据...</p>
      </div>
    );
  }

  return (
    <div className="weather-app">
      <header className="app-header">
        <h1>🌤️ 天气应用</h1>
        <div className="header-controls">
          <button 
            className={`mode-toggle ${useMockData ? 'mock' : 'real'}`}
            onClick={toggleDataMode}
            title={useMockData ? '当前使用模拟数据' : '当前使用真实API'}
          >
            {useMockData ? '📱 模拟模式' : '🌐 真实模式'}
          </button>
          <button className="refresh-button" onClick={handleRefresh}>
            🔄 刷新
          </button>
        </div>
      </header>

      <main className="app-main">
        <CitySearch 
          onCitySearch={handleCitySearch} 
          currentCity={currentCity} 
        />

        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
            <button onClick={() => fetchWeatherData(currentCity)}>
              重试
            </button>
          </div>
        )}

        {weatherData && (
          <>
            <WeatherCard weatherData={weatherData} />
            <WeatherCharts weatherData={weatherData} />
          </>
        )}

        {loading && weatherData && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>正在更新数据...</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>使用一刻天气API | 数据仅供参考</p>
        {useMockData && (
          <p className="mock-notice">
            ⚠️ 当前使用模拟数据，请配置API密钥以获取真实数据
          </p>
        )}
      </footer>
    </div>
  );
};

export default WeatherApp;
