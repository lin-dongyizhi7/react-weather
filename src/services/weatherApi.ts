import axios from 'axios';

// 天气API配置 - 使用官方免费接口
const API_BASE_URL = 'http://gfeljm.tianqiapi.com/free/v2030';
const APP_ID = '76172745'; // 请替换为您的实际APP_ID
const APP_SECRET = 'zg7QrDod'; // 请替换为您的实际APP_SECRET

// 根据API文档定义的数据接口
export interface WeatherData {
  city: string;
  cityEn: string;
  country: string;
  countryEn: string;
  date: string;
  week: string;
  update_time: string;
  temperature: number;
  weather: string;
  weatherImg: string;
  highTemp: number;
  lowTemp: number;
  wind: string;
  windSpeed: string;
  windMeter: string;
  humidity: string;
  visibility: string;
  pressure: string;
  rainPcpn: string;
  air: string;
  airLevel: string;
  airTips: string;
  sunrise: string;
  sunset: string;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
  alarm: WeatherAlarm[];
  aqi: AirQuality;
}

export interface HourlyForecast {
  hours: string;
  weather: string;
  weatherImg: string;
  temperature: number;
  wind: string;
  windSpeed: string;
  visibility: string;
  aqi: string;
  aqiNum: string;
}

export interface DailyForecast {
  date: string;
  weather: string;
  weatherImg: string;
  highTemp: number;
  lowTemp: number;
  wind: string;
  windSpeed: string;
  visibility: string;
  aqi: string;
  aqiNum: string;
}

export interface WeatherAlarm {
  alarmType: string;
  alarmLevel: string;
  alarmTitle: string;
  alarmContent: string;
}

export interface AirQuality {
  updateTime: string;
  air: string;
  airLevel: string;
  airTips: string;
  pm25: string;
  pm25Desc: string;
  pm10: string;
  pm10Desc: string;
  o3: string;
  o3Desc: string;
  no2: string;
  no2Desc: string;
  so2: string;
  so2Desc: string;
  co: string;
  coDesc: string;
  kouzhao: string;
  yundong: string;
  waichu: string;
  kaichuang: string;
  jinghuaqi: string;
}

// 获取天气数据的主函数
export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        appid: APP_ID,
        appsecret: APP_SECRET,
        city: city,
        hours: 1, // 显示24小时天气
        aqi: 1,   // 显示AQI六因子
        vue: 1    // 跨域参数
      }
    });

    const data = response.data;
    
    // 转换API响应数据到我们的接口格式
    const weatherData: WeatherData = {
      city: data.city || city,
      cityEn: data.cityEn || '',
      country: data.country || '中国',
      countryEn: data.countryEn || 'China',
      date: data.date || '',
      week: data.week || '',
      update_time: data.update_time || '',
      temperature: parseInt(data.tem) || 0,
      weather: data.wea || '未知',
      weatherImg: data.wea_img || '',
      highTemp: parseInt(data.tem1) || 0,
      lowTemp: parseInt(data.tem2) || 0,
      wind: data.win || '',
      windSpeed: data.win_speed || '',
      windMeter: data.win_meter || '',
      humidity: data.humidity || '0%',
      visibility: data.visibility || '0km',
      pressure: data.pressure || '0',
      rainPcpn: data.rain_pcpn || '0',
      air: data.air || '0',
      airLevel: data.air_level || '',
      airTips: data.air_tips || '',
      sunrise: data.sunrise || '06:00',
      sunset: data.sunset || '18:00',
      hourlyForecast: data.hours ? data.hours.map((hour: any) => ({
        hours: hour.hours || '',
        weather: hour.wea || '',
        weatherImg: hour.wea_img || '',
        temperature: parseInt(hour.tem) || 0,
        wind: hour.win || '',
        windSpeed: hour.win_speed || '',
        visibility: hour.vis || '',
        aqi: hour.aqi || '',
        aqiNum: hour.aqinum || ''
      })) : [],
      dailyForecast: [], // 这个API主要提供24小时预报，7天预报需要其他接口
      alarm: data.alarm ? data.alarm.map((alarm: any) => ({
        alarmType: alarm.alarm_type || '',
        alarmLevel: alarm.alarm_level || '',
        alarmTitle: alarm.alarm_title || '',
        alarmContent: alarm.alarm_content || ''
      })) : [],
      aqi: data.aqi ? {
        updateTime: data.aqi.update_time || '',
        air: data.aqi.air || '',
        airLevel: data.aqi.air_level || '',
        airTips: data.aqi.air_tips || '',
        pm25: data.aqi.pm25 || '',
        pm25Desc: data.aqi.pm25_desc || '',
        pm10: data.aqi.pm10 || '',
        pm10Desc: data.aqi.pm10_desc || '',
        o3: data.aqi.o3 || '',
        o3Desc: data.aqi.o3_desc || '',
        no2: data.aqi.no2 || '',
        no2Desc: data.aqi.no2_desc || '',
        so2: data.aqi.so2 || '',
        so2Desc: data.aqi.so2_desc || '',
        co: data.aqi.co || '',
        coDesc: data.aqi.co_desc || '',
        kouzhao: data.aqi.kouzhao || '',
        yundong: data.aqi.yundong || '',
        waichu: data.aqi.waichu || '',
        kaichuang: data.aqi.kaichuang || '',
        jinghuaqi: data.aqi.jinghuaqi || ''
      } : {
        updateTime: '',
        air: '',
        airLevel: '',
        airTips: '',
        pm25: '',
        pm25Desc: '',
        pm10: '',
        pm10Desc: '',
        o3: '',
        o3Desc: '',
        no2: '',
        no2Desc: '',
        so2: '',
        so2Desc: '',
        co: '',
        coDesc: '',
        kouzhao: '',
        yundong: '',
        waichu: '',
        kaichuang: '',
        jinghuaqi: ''
      }
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
      hours: time.getHours().toString().padStart(2, '0') + ':00',
      weather: ['晴天', '多云', '小雨', '阴天'][Math.floor(Math.random() * 4)],
      weatherImg: ['qing', 'yun', 'yu', 'yin'][Math.floor(Math.random() * 4)],
      temperature: Math.floor(Math.random() * 20) + 10,
      wind: '东北风',
      windSpeed: '2级',
      visibility: '16',
      aqi: '优',
      aqiNum: ''
    });
  }

  // 生成7天模拟数据
  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    dailyData.push({
      date: date.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }),
      weather: ['晴天', '多云', '小雨', '阴天'][Math.floor(Math.random() * 4)],
      weatherImg: ['qing', 'yun', 'yu', 'yin'][Math.floor(Math.random() * 4)],
      highTemp: Math.floor(Math.random() * 15) + 20,
      lowTemp: Math.floor(Math.random() * 10) + 10,
      wind: '东北风',
      windSpeed: '2级',
      visibility: '16',
      aqi: '优',
      aqiNum: ''
    });
  }

  return {
    city,
    cityEn: city.toLowerCase(),
    country: '中国',
    countryEn: 'China',
    date: now.toLocaleDateString('zh-CN'),
    week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()],
    update_time: now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    temperature: Math.floor(Math.random() * 20) + 15,
    weather: '晴天',
    weatherImg: 'qing',
    highTemp: Math.floor(Math.random() * 15) + 25,
    lowTemp: Math.floor(Math.random() * 10) + 15,
    wind: '东北风',
    windSpeed: '2级',
    windMeter: '7km/h',
    humidity: '74%',
    visibility: '30km',
    pressure: '1006',
    rainPcpn: '0',
    air: '42',
    airLevel: '优',
    airTips: '空气很好，可以外出活动，呼吸新鲜空气，拥抱大自然！',
    sunrise: '05:17',
    sunset: '18:42',
    hourlyForecast: hourlyData,
    dailyForecast: dailyData,
    alarm: [],
    aqi: {
      updateTime: now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      air: '42',
      airLevel: '优',
      airTips: '空气很好，可以外出活动，呼吸新鲜空气，拥抱大自然！',
      pm25: '14',
      pm25Desc: '优',
      pm10: '42',
      pm10Desc: '优',
      o3: '23',
      o3Desc: '优',
      no2: '45',
      no2Desc: '优',
      so2: '2',
      so2Desc: '优',
      co: '-',
      coDesc: '-',
      kouzhao: '不用佩戴口罩',
      yundong: '非常适宜运动',
      waichu: '适宜外出',
      kaichuang: '适宜开窗',
      jinghuaqi: '关闭净化器'
    }
  };
};
