import React, { useState, useEffect, useMemo } from 'react';
import { Search, TrendingUp, Building2, Rocket, Crown, Star, Trophy, Award, Target, Zap } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import unicornsData from '../../../assets/data/unicorns.csv?raw';
import soonicornsData from '../../../assets/data/soonicorns.csv?raw';
import './Leaderboard.css';

const Leaderboard = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [capturedFilter, setCapturedFilter] = useState('all');
  const [entriesToShow, setEntriesToShow] = useState(25);

  // Categories based on valuation ranges (similar to the gaming tiers in reference)
  const categories = [
    { id: 'all', name: 'ALL TIERS', icon: Crown, color: 'bg-gradient-to-r from-purple-500 to-blue-500' },
    { id: 'mega', name: 'MEGA CAPS', icon: Crown, color: 'bg-gradient-to-r from-yellow-400 to-orange-500', min: 100 },
    { id: 'super', name: 'SUPER UNICORNS', icon: Trophy, color: 'bg-gradient-to-r from-blue-500 to-purple-500', min: 50, max: 99.9 },
    { id: 'unicorns', name: 'UNICORNS', icon: Star, color: 'bg-gradient-to-r from-green-500 to-blue-500', min: 10, max: 49.9 },
    { id: 'rising', name: 'RISING STARS', icon: Rocket, color: 'bg-gradient-to-r from-orange-500 to-red-500', min: 5, max: 9.9 },
    { id: 'emerging', name: 'EMERGING', icon: Zap, color: 'bg-gradient-to-r from-teal-500 to-green-500', min: 1, max: 4.9 }
  ];

  // Parse CSV data
  const parseCSV = (csvText, type) => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map((line, index) => {
      const values = line.split(',');
      const company = {};
      
      headers.forEach((header, i) => {
        company[header.trim()] = values[i]?.trim() || '';
      });
      
      // Add additional fields
      company.type = type;
      company.rank = index + 1;
      company.logo = company.Company.charAt(0).toUpperCase();
      
      // Parse valuation for sorting and categorization
      const valuationStr = company['Post Money Value'] || '';
      const valuationMatch = valuationStr.match(/\$(\d+(?:\.\d+)?)(B|M)/);
      if (valuationMatch) {
        const value = parseFloat(valuationMatch[1]);
        const unit = valuationMatch[2];
        company.valuationNumeric = unit === 'B' ? value : value / 1000;
      } else {
        company.valuationNumeric = 0;
      }
      
      // Assign category based on valuation
      company.category = getCategoryForValuation(company.valuationNumeric);
      
      return company;
    });
  };

  const getCategoryForValuation = (valuation) => {
    if (valuation >= 100) return 'mega';
    if (valuation >= 50) return 'super';
    if (valuation >= 10) return 'unicorns';
    if (valuation >= 5) return 'rising';
    if (valuation >= 1) return 'emerging';
    return 'emerging';
  };

  useEffect(() => {
    const unicorns = parseCSV(unicornsData, 'unicorn');
    const soonicorns = parseCSV(soonicornsData, 'soonicorn');
    
    // Combine and sort by valuation
    const allCompanies = [...unicorns, ...soonicorns].sort((a, b) => {
      return b.valuationNumeric - a.valuationNumeric;
    });
    
    // Update ranks
    allCompanies.forEach((company, index) => {
      company.rank = index + 1;
    });
    
    setCompanies(allCompanies);
    setFilteredCompanies(allCompanies.slice(0, 25)); // Show top 25 initially
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = companies;
    
    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(company => company.category === activeCategory);
    }
    
    // Apply type filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(company => company.type === activeFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.Company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.Country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCompanies(filtered.slice(0, entriesToShow)); // Use EntriesToShow
  }, [companies, activeCategory, activeFilter, searchTerm, entriesToShow]);

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'rank-badge gold';
    if (rank === 2) return 'rank-badge silver';
    if (rank === 3) return 'rank-badge bronze';
    return 'rank-badge';
  };

  const formatValuation = (valuation) => {
    return valuation || 'N/A';
  };

  const getCountryFlag = (country) => {
    const flagMap = {
      'United States': '🇺🇸',
      'China': '🇨🇳',
      'India': '🇮🇳',
      'United Kingdom': '🇬🇧',
      'Germany': '🇩🇪',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Singapore': '🇸🇬',
      'Sweden': '🇸🇪',
      'South Korea': '🇰🇷',
      'Japan': '🇯🇵',
      'Turkey': '🇹🇷',
      'Indonesia': '🇮🇩',
      'Hong Kong': '🇭🇰',
      'Israel': '🇮🇱',
      'Finland': '🇫🇮',
      'The Netherlands': '🇳🇱',
      'Spain': '🇪🇸',
      'Vietnam': '🇻🇳',
      'Chile': '🇨🇱',
      'Seychelles': '🇸🇨'
    };
    return flagMap[country] || '🌍';
  };

  const stats = useMemo(() => {
    const unicornCount = companies.filter(c => c.type === 'unicorn').length;
    const soonicornCount = companies.filter(c => c.type === 'soonicorn').length;
    const totalValuation = companies.reduce((sum, c) => sum + c.valuationNumeric, 0);
    
    return {
      unicornCount,
      soonicornCount,
      totalCount: unicornCount + soonicornCount,
      totalValuation: `$${(totalValuation).toFixed(1)}T`
    };
  }, [companies]);

  const getCategoryStats = (categoryId) => {
    if (categoryId === 'all') return companies.length;
    return companies.filter(c => c.category === categoryId).length;
  };

  const date = new Date();

  return (
    <div className="gaming-leaderboard">
      {/* Header */}
      <div className="leaderboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="leaderboard-title">Leaderboards</h1>
          </div>
          <div className="header-right">
            <div className="update-info">
              <div className="last-update">Last Updated on: {date.toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="leaderboard-content">
        {/* Left Sidebar - Categories */}
        {/* <div className="categories-sidebar">
          {categories.map((category) => {
            const Icon = category.icon;
            const count = getCategoryStats(category.id);
            const isActive = activeCategory === category.id;
            
            return (
              <div
                key={category.id}
                className={`category-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className={`category-icon ${category.color}`}>
                  <Icon size={24} />
                </div>
                <div className="category-info">
                  <div className="category-name">{category.name}</div>
                  <div className="category-count">{count}</div>
                </div>
              </div>
            );
          })}
        </div> */}

        {/* Main Content */}
        <div className="leaderboard-main-content">
          {/* Search */}
          <div className="search-section">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <Input
                placeholder="Search anything here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Leaderboard Entries */}
          <div className="leaderboard-entries">
            {/* Labels Row */}
            <div className="grid-labels">
              <div className="grid-label">Rank</div>
              <div className="grid-label">Company</div>
              <div className="grid-label">Country</div>
              <div className="grid-label">Post Money Value</div>
              <div className="grid-label">Total Equity Funding</div>
              <div className="grid-label">Lead Investors</div>
            </div>
            
            {/* Grid Entries */}
            <div className="leaderboard-grid">
              {filteredCompanies.map((company, index) => (
                <div
                  key={`${company.Company}-${index}`}
                  className="grid-entry"
                >
                  <div className="grid-cell rank-cell">
                    <div className={getRankBadgeClass(company.rank)}>
                      {company.rank}
                    </div>
                  </div>
                  
                  <div className="grid-cell company-cell">
                    <div className="company-info">
                      <div className="company-name">{company.Company}</div>
                    </div>
                  </div>
                  
                  <div className="grid-cell country-cell">
                    <div className="country-info">
                      <span className="country-name">{company.Country}</span>
                    </div>
                  </div>
                  
                  <div className="grid-cell valuation-cell">
                    <div className="metric-value">
                      {company["Post Money Value"] || "N/A"}
                    </div>
                  </div>
                  
                  <div className="grid-cell funding-cell">
                    <div className="metric-value">
                      {company['Total Equity Funding'] || 'N/A'}
                    </div>
                  </div>
                  
                  <div className="grid-cell investors-cell">
                    <div className="investors-list">
                      {company['Lead Investors Include'] || 'N/A'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            {filteredCompanies.length < companies.filter(company => {
              // Apply the same filters as above
              if (activeCategory !== 'all' && company.category !== activeCategory) return false;
              if (activeFilter !== 'all' && company.type !== activeFilter) return false;
              if (searchTerm && !(
                company.Company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.Country.toLowerCase().includes(searchTerm.toLowerCase())
              )) return false;
              return true;
            }).length && (
              <div className="load-more-container">
                <Button onClick={() => setEntriesToShow(entriesToShow + 36)}>
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Filters */}
        {/* <div className="filters-sidebar">
          <h3 className="filters-title">CHOOSE YOUR FILTERS</h3>
          
          <div className="filter-group">
            <div className="filter-label">by Period</div>
            <div className="filter-buttons">
              <Button 
                variant={periodFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setPeriodFilter('all')}
                className="filter-btn"
              >
                ALL
              </Button>
              <Button 
                variant={periodFilter === 'day' ? 'default' : 'outline'}
                onClick={() => setPeriodFilter('day')}
                className="filter-btn"
              >
                DAY
              </Button>
              <Button 
                variant={periodFilter === 'week' ? 'default' : 'outline'}
                onClick={() => setPeriodFilter('week')}
                className="filter-btn"
              >
                WEEK
              </Button>
              <Button 
                variant={periodFilter === 'month' ? 'default' : 'outline'}
                onClick={() => setPeriodFilter('month')}
                className="filter-btn"
              >
                MONTH
              </Button>
              <Button 
                variant={periodFilter === 'year' ? 'default' : 'outline'}
                onClick={() => setPeriodFilter('year')}
                className="filter-btn"
              >
                YEAR
              </Button>
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-label">by Level</div>
            <div className="filter-buttons">
              <Button 
                variant={levelFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setLevelFilter('all')}
                className="filter-btn"
              >
                ALL
              </Button>
              <Button 
                variant={activeFilter === 'unicorn' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('unicorn')}
                className="filter-btn unicorn-btn"
              >
                UNICORNS
              </Button>
              <Button 
                variant={activeFilter === 'soonicorn' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('soonicorn')}
                className="filter-btn soonicorn-btn"
              >
                SOONICORNS
              </Button>
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-label">Captured</div>
            <div className="filter-buttons">
              <Button 
                variant={capturedFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setCapturedFilter('all')}
                className="filter-btn"
              >
                ALL
              </Button>
              <Button 
                variant={capturedFilter === 'wild' ? 'default' : 'outline'}
                onClick={() => setCapturedFilter('wild')}
                className="filter-btn wild-btn"
              >
                WILD
              </Button>
            </div>
            <div className="filter-subtext">
              <div>Hydras</div>
              <div>DEFEATED</div>
              <div>HEADS</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Leaderboard;

