import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Building2, Rocket, Crown, Star, Trophy, Award, Target, Zap, DollarSign, Users, Globe, Calendar } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import vcsData from '../../assets/data/vcs.json';
import './VCLeaderboard.css';

const VCLeaderboard = () => {
  const [vcs, setVcs] = useState([]);
  const [filteredVCs, setFilteredVCs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStage, setActiveStage] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [entriesToShow, setEntriesToShow] = useState(25);

  // Funding stages
  const fundingStages = [
    { id: 'all', name: 'ALL STAGES', icon: Crown, color: 'bg-gradient-to-r from-purple-500 to-blue-500' },
    { id: 'preseed', name: 'PRE-SEED', icon: Rocket, color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'seed', name: 'SEED', icon: Star, color: 'bg-gradient-to-r from-green-500 to-blue-500' },
    { id: 'series-a', name: 'SERIES A', icon: Trophy, color: 'bg-gradient-to-r from-blue-500 to-purple-500' },
    { id: 'series-b', name: 'SERIES B', icon: Award, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'series-c', name: 'SERIES C', icon: Target, color: 'bg-gradient-to-r from-indigo-500 to-purple-500' },
    { id: 'series-d', name: 'SERIES D', icon: Zap, color: 'bg-gradient-to-r from-teal-500 to-green-500' },
    { id: 'series-e-plus', name: 'SERIES E+', icon: Crown, color: 'bg-gradient-to-r from-yellow-400 to-orange-500' }
  ];

  // VC data from JSON file
  const vcData = vcsData.vcs;

  useEffect(() => {
    setVcs(vcData);
    setFilteredVCs(vcData.slice(0, entriesToShow));
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = vcs;
    
    // Apply stage filter
    if (activeStage !== 'all') {
      filtered = filtered.filter(vc => vc.stage === activeStage);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(vc => 
        vc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vc.focus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vc.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortBy === 'elo') {
      filtered = filtered.filter(vc => vc.eloRating).sort((a, b) => b.eloRating - a.eloRating);
    } else if (sortBy === 'founder-rating') {
      filtered = filtered.filter(vc => vc.founderRating).sort((a, b) => b.founderRating - a.founderRating);
    } else if (sortBy === 'founder-votes') {
      filtered = filtered.filter(vc => vc.founderComparisons).sort((a, b) => b.founderComparisons - a.founderComparisons);
    }
    
    setFilteredVCs(filtered.slice(0, entriesToShow));
  }, [vcs, activeStage, searchTerm, sortBy, entriesToShow]);

  const getRankBadgeClass = (rank) => {
    if (rank <= 3) return 'rank-gold';
    if (rank <= 10) return 'rank-silver';
    if (rank <= 25) return 'rank-bronze';
    return 'rank-normal';
  };

  const getStageStats = (stageId) => {
    const stageVCs = vcs.filter(vc => stageId === 'all' || vc.stage === stageId);
    return {
      total: stageVCs.length,
      totalFunds: stageVCs.reduce((sum, vc) => {
        const funds = parseFloat(vc.totalFunds.replace(/[^0-9.]/g, ''));
        return sum + funds;
      }, 0),
      avgUnicorns: stageVCs.reduce((sum, vc) => sum + vc.unicorns, 0) / stageVCs.length || 0
    };
  };

  const loadMore = () => {
    setEntriesToShow(prev => prev + 10);
  };

  return (
    <div className="vc-leaderboard">
      <div className="vc-leaderboard-header">
        <h1>VC Leaderboard</h1>
        <p>Discover top venture capital firms across different funding stages</p>
      </div>

      {/* Stage Filter Tabs */}
      <div className="stage-filters">
        {fundingStages.map((stage) => {
          const stats = getStageStats(stage.id);
          const IconComponent = stage.icon;
          
          return (
            <button
              key={stage.id}
              className={`stage-filter ${activeStage === stage.id ? 'active' : ''} ${stage.color}`}
              onClick={() => setActiveStage(stage.id)}
            >
              <IconComponent size={20} />
              <span className="stage-name">{stage.name}</span>
              <span className="stage-count">{stats.total}</span>
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="search-filters">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <Input
            type="text"
            placeholder="Search VCs by name, focus, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="sort-options">
          <Button
            variant={sortBy === 'default' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('default')}
          >
            Default
          </Button>
          <Button
            variant={sortBy === 'elo' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('elo')}
          >
            Elo Rating
          </Button>
          <Button
            variant={sortBy === 'founder-rating' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('founder-rating')}
          >
            Founder Rating
          </Button>
          <Button
            variant={sortBy === 'founder-votes' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('founder-votes')}
          >
            Founder Votes
          </Button>
        </div>
      </div>

      {/* VC List */}
      <div className="vc-list">
        {filteredVCs.map((vc, index) => (
          <div key={vc.id} className="vc-card">
            <div className="vc-rank">
              <Badge className={getRankBadgeClass(index + 1)}>
                #{index + 1}
              </Badge>
            </div>
            
            <div className="vc-info">
              <div className="vc-logo">
                <span>{vc.logo}</span>
              </div>
              
              <div className="vc-details">
                <h3 className="vc-name">{vc.name}</h3>
                <p className="vc-description">{vc.description}</p>
                <div className="vc-tags">
                  <Badge variant="outline" className="stage-badge">
                    {fundingStages.find(s => s.id === vc.stage)?.name}
                  </Badge>
                  <Badge variant="outline" className="location-badge">
                    <Globe size={12} />
                    {vc.location}
                  </Badge>
                  <Badge variant="outline" className="founded-badge">
                    <Calendar size={12} />
                    {vc.founded}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="vc-stats">
              <div className="stat-item">
                <DollarSign size={16} />
                <span className="stat-label">Total Funds</span>
                <span className="stat-value">{vc.totalFunds}</span>
              </div>
              
              <div className="stat-item">
                <Users size={16} />
                <span className="stat-label">Portfolio</span>
                <span className="stat-value">{vc.portfolioCompanies.toLocaleString()}</span>
              </div>
              
              <div className="stat-item">
                <Crown size={16} />
                <span className="stat-label">Unicorns</span>
                <span className="stat-value">{vc.unicorns}</span>
              </div>
              
              <div className="stat-item">
                <Target size={16} />
                <span className="stat-label">Success Rate</span>
                <span className="stat-value">{vc.successRate}%</span>
              </div>
              
              {vc.eloRating && (
                <div className="stat-item founder-metric">
                  <Star size={16} />
                  <span className="stat-label">Elo Rating</span>
                  <span className="stat-value">{vc.eloRating}</span>
                </div>
              )}
              
              {vc.founderComparisons && (
                <div className="stat-item founder-metric">
                  <Users size={16} />
                  <span className="stat-label">Founder Votes</span>
                  <span className="stat-value">{vc.founderComparisons}</span>
                </div>
              )}
              
              {vc.founderRating && (
                <div className="stat-item founder-metric">
                  <Award size={16} />
                  <span className="stat-label">Founder Rating</span>
                  <span className="stat-value">{vc.founderRating}/5</span>
                </div>
              )}
            </div>

            <div className="vc-actions">
              <Button variant="outline" size="sm" asChild>
                <a href={vc.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {filteredVCs.length >= entriesToShow && (
        <div className="load-more-container">
          <Button onClick={loadMore} variant="outline">
            Load More VCs
          </Button>
        </div>
      )}

      {/* No Results */}
      {filteredVCs.length === 0 && (
        <div className="no-results">
          <Search size={48} />
          <h3>No VCs found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default VCLeaderboard;
