import React, { useState, useEffect, useRef } from 'react';
import CitySearch from './CitySearch';
import WeatherCard from './WeatherCard';
import WeatherCharts from './WeatherCharts';
import WeeklyForecast from './WeeklyForecast';
import MonthlyForecast from './MonthlyForecast';
import { getWeatherData, getMockWeatherData, WeatherData } from '../services/weatherApi';
import './WeatherApp.css';

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentCity, setCurrentCity] = useState('北京');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [nextUpdateTime, setNextUpdateTime] = useState<Date>(new Date(Date.now() + 30 * 60 * 1000));
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchWeatherData(currentCity);
    
    // 设置30分钟自动更新定时器
    intervalRef.current = setInterval(() => {
      console.log('30分钟定时更新触发');
      fetchWeatherData(currentCity);
    }, 30 * 60 * 1000); // 30分钟 = 30 * 60 * 1000毫秒

    // 设置1秒倒计时定时器
    countdownRef.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 清理定时器
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [currentCity]);

  // 当城市改变时，重置定时器
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      console.log('30分钟定时更新触发');
      fetchWeatherData(currentCity);
    }, 30 * 60 * 1000);
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
      setLastUpdateTime(new Date());
      setNextUpdateTime(new Date(Date.now() + 30 * 60 * 1000));
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

  // 格式化时间显示
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 计算距离下次更新的时间
  const getTimeUntilNextUpdate = () => {
    const diff = nextUpdateTime.getTime() - currentTime.getTime();
    
    if (diff <= 0) return '即将更新';
    
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${minutes}分${seconds}秒`;
  };

  // 检查是否需要立即更新
  const shouldUpdateNow = () => {
    const diff = nextUpdateTime.getTime() - currentTime.getTime();
    return diff <= 0;
  };

  // 如果时间到了，自动触发更新
  useEffect(() => {
    if (shouldUpdateNow() && !loading) {
      console.log('时间到，自动更新数据');
      fetchWeatherData(currentCity);
    }
  }, [currentTime, nextUpdateTime, loading, currentCity]);

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
        
        {/* 自动更新状态显示 */}
        <div className="auto-update-status">
          <div className="update-info">
            <span className="update-label">最后更新:</span>
            <span className="update-time">{formatTime(lastUpdateTime)}</span>
          </div>
          <div className="update-info">
            <span className="update-label">下次更新:</span>
            <span className="update-time">{formatTime(nextUpdateTime)}</span>
            <span className={`countdown ${shouldUpdateNow() ? 'update-now' : ''}`}>
              ({getTimeUntilNextUpdate()})
            </span>
          </div>
          <div className="auto-update-note">
            ⏰ 每30分钟自动更新一次
          </div>
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
            <WeeklyForecast weeklyForecast={weatherData.weeklyForecast} />
            <MonthlyForecast monthlyForecast={weatherData.monthlyForecast} />
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
        <p>使用天气API | 数据仅供参考 | 30分钟自动更新</p>
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
