# 易客天气API集成说明

## 概述

本项目已成功集成易客天气API，用于获取7天和30天天气预报数据。易客天气API是一个免费的天气数据服务，提供准确的天气预报信息。

## API接口信息

### 7天预报接口
- **接口地址**: `http://v1.yiketianqi.com/free/week`
- **请求方式**: GET
- **免费额度**: 每日300次左右（个人免费使用3个月）

### 30天预报接口
- **接口地址**: `http://v1.yiketianqi.com/free/month`
- **请求方式**: GET
- **免费额度**: 每日300次左右（个人免费使用3个月）

## 请求参数

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| appid | 是 | string | 用户appid |
| appsecret | 是 | string | 用户appsecret |
| city | 否 | string | 城市名称（不要带市和区，如：青岛、铁西） |
| vue | 否 | string | 跨域参数，React/Vue/Angular请填写值: 1 |
| unescape | 否 | Int | 是否转义中文，传值1直接输出中文 |

## 响应数据结构

### 7天预报响应示例
```json
{
  "cityid": "101120101",
  "city": "济南",
  "update_time": "2020-04-21 17:24:11",
  "data": [
    {
      "date": "2020-04-21",
      "wea": "晴",
      "wea_img": "qing",
      "tem_day": "17",
      "tem_night": "4",
      "win": "北风",
      "win_speed": "3-4级"
    },
    {
      "date": "2020-04-22",
      "wea": "晴",
      "wea_img": "qing",
      "tem_day": "15",
      "tem_night": "4",
      "win": "北风",
      "win_speed": "3-4级"
    }
  ]
}
```

### 30天预报响应示例
```json
{
  "nums": 30,
  "cityid": "101120101",
  "city": "济南",
  "update_time": "2023-09-06 11:52:52",
  "data": [
    {
      "date": "2023-09-06",
      "wea": "晴",
      "wea_img": "qing",
      "wea_day": "晴",
      "wea_day_img": "qing",
      "wea_night": "晴",
      "wea_night_img": "qing",
      "tem_day": "32",
      "tem_night": "21",
      "win": "东北风<3级"
    }
  ]
}
```

## 数据字段映射

### 7天预报字段映射
| 易客天气API字段 | 项目内部字段 | 说明 |
|----------------|--------------|------|
| date | date | 日期 |
| wea | weather | 天气状况 |
| wea_img | weatherImg | 天气图标标识 |
| tem_day | highTemp | 白天最高温度 |
| tem_night | lowTemp | 夜间最低温度 |
| win | wind | 风向 |
| win_speed | windSpeed | 风速等级 |

### 30天预报字段映射
| 易客天气API字段 | 项目内部字段 | 说明 |
|----------------|--------------|------|
| date | date | 日期 |
| wea | weather | 天气状况 |
| wea_img | weatherImg | 天气图标标识 |
| tem_day | highTemp | 白天最高温度 |
| tem_night | lowTemp | 夜间最低温度 |
| win | wind | 风向风力 |

## 使用方法

### 1. 配置API密钥
在 `src/services/weatherApi.ts` 文件中配置您的API密钥：
```typescript
const APP_ID = 'your_app_id_here';
const APP_SECRET = 'your_app_secret_here';
```

### 2. 调用API
```typescript
import { getMonthlyForecast, getWeeklyForecast } from './services/weatherApi';

// 获取30天预报
const monthlyData = await getMonthlyForecast('北京');

// 获取7天预报
const weeklyData = await getWeeklyForecast('北京');
```

### 3. 测试API
在应用首页点击"测试易客天气API"按钮，可以测试API是否正常工作。

## 注意事项

1. **免费额度限制**: 每日请求次数有限制，建议在生产环境中使用付费版本
2. **城市名称**: 城市名称不要包含"市"、"区"等后缀
3. **错误处理**: API调用失败时会自动使用模拟数据，确保应用正常运行
4. **跨域支持**: 已配置vue=1参数支持跨域请求

## 注册获取API密钥

1. 访问 [易客天气官网](http://yiketianqi.com/)
2. 注册开发者账号
3. 获取APP_ID和APP_SECRET
4. 在代码中配置密钥

## 故障排除

### 常见问题
1. **API调用失败**: 检查网络连接和API密钥是否正确
2. **数据为空**: 检查城市名称是否正确，不要包含"市"、"区"等后缀
3. **跨域错误**: 确保vue=1参数已正确设置

### 日志查看
在浏览器控制台中查看详细的API调用日志和错误信息。

## 更新日志

- **v1.0.0**: 集成易客天气API，支持7天和30天预报
- 添加了完整的类型定义
- 实现了错误处理和模拟数据回退
- 支持中文城市名称查询
