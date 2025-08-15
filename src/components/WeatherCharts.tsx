import React from 'react';
import ReactECharts from 'echarts-for-react';
import { WeatherData, HourlyForecast, DailyForecast } from '../services/weatherApi';

interface WeatherChartsProps {
  weatherData: WeatherData;
}

const WeatherCharts: React.FC<WeatherChartsProps> = ({ weatherData }) => {
  // 24小时温度变化图表配置
  const getHourlyChartOption = () => {
    const hours = weatherData.hourlyForecast.map(item => item.hours);
    const temperatures = weatherData.hourlyForecast.map(item => item.temperature);
    const visibility = weatherData.hourlyForecast.map(item => parseFloat(item.visibility) || 0);

    return {
      title: {
        text: '24小时天气预报',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['温度 (°C)', '能见度 (km)'],
        top: 30
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: hours,
        axisLabel: {
          rotate: 45,
          color: '#666'
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '温度 (°C)',
          position: 'left',
          axisLabel: {
            color: '#ff6b6b'
          }
        },
        {
          type: 'value',
          name: '能见度 (km)',
          position: 'right',
          axisLabel: {
            color: '#4ecdc4'
          }
        }
      ],
      series: [
        {
          name: '温度 (°C)',
          type: 'line',
          data: temperatures,
          smooth: true,
          lineStyle: {
            color: '#ff6b6b',
            width: 3
          },
          itemStyle: {
            color: '#ff6b6b'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(255, 107, 107, 0.3)' },
                { offset: 1, color: 'rgba(255, 107, 107, 0.1)' }
              ]
            }
          }
        },
        {
          name: '能见度 (km)',
          type: 'line',
          yAxisIndex: 1,
          data: visibility,
          smooth: true,
          lineStyle: {
            color: '#4ecdc4',
            width: 3
          },
          itemStyle: {
            color: '#4ecdc4'
          }
        }
      ]
    };
  };

  // 天气状况饼图配置
  const getWeatherPieChartOption = () => {
    const weatherCounts: { [key: string]: number } = {};
    weatherData.hourlyForecast.forEach(item => {
      weatherCounts[item.weather] = (weatherCounts[item.weather] || 0) + 1;
    });

    const data = Object.entries(weatherCounts).map(([weather, count]) => ({
      name: weather,
      value: count
    }));

    return {
      title: {
        text: '24小时天气状况分布',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'middle'
      },
      series: [
        {
          name: '天气状况',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          }
        }
      ]
    };
  };

  // 空气质量雷达图配置
  const getAirQualityRadarOption = () => {
    if (!weatherData.aqi || weatherData.aqi.pm25 === '') {
      return null;
    }

    const indicators = [
      { name: 'PM2.5', max: 100 },
      { name: 'PM10', max: 100 },
      { name: 'O₃', max: 100 },
      { name: 'NO₂', max: 100 },
      { name: 'SO₂', max: 100 }
    ];

    const values = [
      parseFloat(weatherData.aqi.pm25) || 0,
      parseFloat(weatherData.aqi.pm10) || 0,
      parseFloat(weatherData.aqi.o3) || 0,
      parseFloat(weatherData.aqi.no2) || 0,
      parseFloat(weatherData.aqi.so2) || 0
    ];

    return {
      title: {
        text: '空气质量六因子',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      radar: {
        indicator: indicators,
        radius: '60%'
      },
      series: [
        {
          name: 'AQI指数',
          type: 'radar',
          data: [
            {
              value: values,
              name: '当前值',
              areaStyle: {
                color: 'rgba(102, 126, 234, 0.3)'
              },
              lineStyle: {
                color: '#667eea',
                width: 2
              },
              itemStyle: {
                color: '#667eea'
              }
            }
          ]
        }
      ]
    };
  };

  return (
    <div className="weather-charts">
      <div className="chart-container">
        <ReactECharts 
          option={getHourlyChartOption()} 
          style={{ height: '400px', width: '100%' }}
        />
      </div>
      
      <div className="chart-container">
        <ReactECharts 
          option={getWeatherPieChartOption()} 
          style={{ height: '400px', width: '100%' }}
        />
      </div>
      
      {getAirQualityRadarOption() && (
        <div className="chart-container">
          <ReactECharts 
            option={getAirQualityRadarOption()} 
            style={{ height: '400px', width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherCharts;
