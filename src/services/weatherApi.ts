import axios from 'axios';

// 一刻天气免费API配置
const API_BASE_URL = 'https://api.yikeapi.com';
const API_KEY = 'your_api_key_here'; // 请替换为您的实际API密钥

export interface WeatherData {
  city: string;
  temperature: number;
  weather: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  sunrise: string;
  sunset: string;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  weather: string;
  humidity: number;
}

export interface DailyForecast {
  date: string;
  highTemp: number;
  lowTemp: number;
  weather: string;
  humidity: number;
}

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    // 获取实时天气数据
    const realtimeResponse = await axios.get(`${API_BASE_URL}/weather/realtime`, {
      params: {
        city,
        key: API_KEY,
      },
    });

    // 获取24小时预报
    const hourlyResponse = await axios.get(`${API_BASE_URL}/weather/hourly`, {
      params: {
        city,
        key: API_KEY,
      },
    });

    // 获取7天预报
    const dailyResponse = await axios.get(`${API_BASE_URL}/weather/daily`, {
      params: {
        city,
        key: API_KEY,
      },
    });

    // 处理数据（根据实际API响应结构调整）
    const weatherData: WeatherData = {
      city: realtimeResponse.data.city || city,
      temperature: realtimeResponse.data.temperature || 0,
      weather: realtimeResponse.data.weather || '未知',
      humidity: realtimeResponse.data.humidity || 0,
      windSpeed: realtimeResponse.data.wind_speed || 0,
      pressure: realtimeResponse.data.pressure || 0,
      visibility: realtimeResponse.data.visibility || 0,
      sunrise: realtimeResponse.data.sunrise || '06:00',
      sunset: realtimeResponse.data.sunset || '18:00',
      hourlyForecast: hourlyResponse.data.data?.slice(0, 24).map((item: any) => ({
        time: item.time || '',
        temperature: item.temperature || 0,
        weather: item.weather || '',
        humidity: item.humidity || 0,
      })) || [],
      dailyForecast: dailyResponse.data.data?.slice(0, 7).map((item: any) => ({
        date: item.date || '',
        highTemp: item.high_temp || 0,
        lowTemp: item.low_temp || 0,
        weather: item.weather || '',
        humidity: item.humidity || 0,
      })) || [],
    };

    return weatherData;
  } catch (error) {
    console.error('获取天气数据失败:', error);
    throw new Error('获取天气数据失败');
  }
};

// 模拟数据（当API不可用时使用）
export const getMockWeatherData = (city: string): WeatherData => {
  const now = new Date();
  const hourlyData: HourlyForecast[] = [];
  const dailyData: DailyForecast[] = [];

  // 生成24小时模拟数据
  for (let i = 0; i < 24; i++) {
    const time = new Date(now.getTime() + i * 60 * 60 * 1000);
    hourlyData.push({
      time: time.getHours().toString().padStart(2, '0') + ':00',
      temperature: Math.floor(Math.random() * 20) + 10,
      weather: ['晴天', '多云', '小雨', '阴天'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40,
    });
  }

  // 生成7天模拟数据
  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    dailyData.push({
      date: date.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }),
      highTemp: Math.floor(Math.random() * 15) + 20,
      lowTemp: Math.floor(Math.random() * 10) + 10,
      weather: ['晴天', '多云', '小雨', '阴天'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40,
    });
  }

  return {
    city,
    temperature: Math.floor(Math.random() * 20) + 15,
    weather: '晴天',
    humidity: Math.floor(Math.random() * 40) + 40,
    windSpeed: Math.floor(Math.random() * 20) + 5,
    pressure: Math.floor(Math.random() * 50) + 1000,
    visibility: Math.floor(Math.random() * 20) + 10,
    sunrise: '06:00',
    sunset: '18:00',
    hourlyForecast: hourlyData,
    dailyForecast: dailyData,
  };
};
