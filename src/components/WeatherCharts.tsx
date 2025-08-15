import React from 'react';
import ReactECharts from 'echarts-for-react';
import { WeatherData, HourlyForecast, DailyForecast } from '../services/weatherApi';

interface WeatherChartsProps {
  weatherData: WeatherData;
}

const WeatherCharts: React.FC<WeatherChartsProps> = ({ weatherData }) => {
  // 24小时温度变化图表配置
  const getHourlyChartOption = () => {
    const hours = weatherData.hourlyForecast.map(item => item.time);
    const temperatures = weatherData.hourlyForecast.map(item => item.temperature);
    const humidity = weatherData.hourlyForecast.map(item => item.humidity);

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
        data: ['温度 (°C)', '湿度 (%)'],
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
          name: '湿度 (%)',
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
          name: '湿度 (%)',
          type: 'line',
          yAxisIndex: 1,
          data: humidity,
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

  // 7天天气预报图表配置
  const getDailyChartOption = () => {
    const dates = weatherData.dailyForecast.map(item => item.date);
    const highTemps = weatherData.dailyForecast.map(item => item.highTemp);
    const lowTemps = weatherData.dailyForecast.map(item => item.lowTemp);

    return {
      title: {
        text: '7天天气预报',
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
          type: 'shadow'
        }
      },
      legend: {
        data: ['最高温度', '最低温度'],
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
        data: dates,
        axisLabel: {
          color: '#666'
        }
      },
      yAxis: {
        type: 'value',
        name: '温度 (°C)',
        axisLabel: {
          color: '#666'
        }
      },
      series: [
        {
          name: '最高温度',
          type: 'bar',
          data: highTemps,
          itemStyle: {
            color: '#ff6b6b'
          },
          barWidth: '40%'
        },
        {
          name: '最低温度',
          type: 'bar',
          data: lowTemps,
          itemStyle: {
            color: '#4ecdc4'
          },
          barWidth: '40%'
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
        text: '天气状况分布',
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
          option={getDailyChartOption()} 
          style={{ height: '400px', width: '100%' }}
        />
      </div>
      
      <div className="chart-container">
        <ReactECharts 
          option={getWeatherPieChartOption()} 
          style={{ height: '400px', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default WeatherCharts;
