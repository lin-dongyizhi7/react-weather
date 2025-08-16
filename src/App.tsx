import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherApp from './components/WeatherApp';
import { testYiketianqiAPI } from './services/weatherApi';

function App() {
  const [testResult, setTestResult] = useState<string>('');

  const handleTestAPI = async () => {
    try {
      setTestResult('测试中...');
      const result = await testYiketianqiAPI();
      setTestResult(`测试成功！30天预报: ${result.monthlyData.length}条，7天预报: ${result.weeklyData.length}条`);
    } catch (error) {
      setTestResult(`测试失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React 天气应用</h1>
        <button 
          onClick={handleTestAPI}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          测试易客天气API
        </button>
        {testResult && (
          <div style={{
            margin: '10px',
            padding: '10px',
            backgroundColor: testResult.includes('成功') ? '#d4edda' : '#f8d7da',
            color: testResult.includes('成功') ? '#155724' : '#721c24',
            borderRadius: '5px',
            maxWidth: '600px'
          }}>
            {testResult}
          </div>
        )}
      </header>
      <WeatherApp />
    </div>
  );
}

export default App;
