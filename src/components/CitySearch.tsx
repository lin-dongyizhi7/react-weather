import React, { useState } from 'react';
import './CitySearch.css';

interface CitySearchProps {
  onCitySearch: (city: string) => void;
  currentCity: string;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySearch, currentCity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 常用城市列表
  const popularCities = [
    '北京', '上海', '广州', '深圳', '杭州', '南京', '武汉', '成都',
    '西安', '重庆', '天津', '苏州', '长沙', '青岛', '宁波', '无锡'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onCitySearch(searchTerm.trim());
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  const handleCityClick = (city: string) => {
    onCitySearch(city);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const filteredCities = popularCities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="city-search">
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="搜索城市..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </div>
        </form>

        {showSuggestions && (
          <div className="suggestions">
            {filteredCities.length > 0 ? (
              filteredCities.map((city, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleCityClick(city)}
                >
                  {city}
                </div>
              ))
            ) : (
              <div className="no-results">未找到相关城市</div>
            )}
          </div>
        )}
      </div>

      <div className="current-city">
        <span className="current-label">当前城市:</span>
        <span className="current-city-name">{currentCity}</span>
      </div>

      <div className="popular-cities">
        <h3>热门城市</h3>
        <div className="city-grid">
          {popularCities.map((city, index) => (
            <button
              key={index}
              className={`city-button ${city === currentCity ? 'active' : ''}`}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySearch;
