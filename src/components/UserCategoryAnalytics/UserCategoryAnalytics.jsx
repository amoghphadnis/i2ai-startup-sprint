import React, { useState, useEffect } from 'react';
import UserCategoryService from '../../services/userCategoryService';
import './UserCategoryAnalytics.css';

const UserCategoryAnalytics = () => {
  const [categoryStats, setCategoryStats] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryRegistrations, setCategoryRegistrations] = useState([]);

  useEffect(() => {
    loadCategoryData();
  }, []);

  const loadCategoryData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [stats, distribution] = await Promise.all([
        UserCategoryService.getRegistrationStatsByCategory(),
        UserCategoryService.getCategoryDistribution()
      ]);

      setCategoryStats(stats);
      setCategoryDistribution(distribution);
    } catch (err) {
      console.error('Failed to load category data:', err);
      setError('Failed to load category analytics data');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category) => {
    if (!category) {
      setCategoryRegistrations([]);
      setSelectedCategory('');
      return;
    }

    try {
      setSelectedCategory(category);
      const registrations = await UserCategoryService.getRegistrationsByCategory(category);
      setCategoryRegistrations(registrations);
    } catch (err) {
      console.error('Failed to load category registrations:', err);
      setError('Failed to load registrations for selected category');
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'startup-founder': '🚀',
      'professional': '👔',
      'mentor': '🎓',
      'investor': '💰',
      'influencer': '📱',
      'enabler': '🔧',
      'facilitator': '🤝'
    };
    return icons[category] || '👤';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'startup-founder': '#ff6b35',
      'professional': '#4285f4',
      'mentor': '#34a853',
      'investor': '#fbbc04',
      'influencer': '#ea4335',
      'enabler': '#9c27b0',
      'facilitator': '#00bcd4'
    };
    return colors[category] || '#666';
  };

  const getCategoryDisplayName = (category) => {
    // Map backend values to user-friendly display names
    const displayNames = {
      'startup-founder': 'Startup Leader',
      'professional': 'Professional',
      'mentor': 'Mentor',
      'investor': 'Investor',
      'influencer': 'Influencer',
      'enabler': 'Enabler',
      'facilitator': 'Facilitator'
    };
    return displayNames[category] || category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="category-analytics-container">
        <div className="loading-spinner">Loading category analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-analytics-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadCategoryData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-analytics-container">
      <div className="analytics-header">
        <h2>📊 User Category Analytics</h2>
        <p>Track registrations and engagement by user category</p>
      </div>

      {/* Category Distribution Overview */}
      <div className="category-overview">
        <h3>Category Distribution</h3>
        <div className="category-cards">
          {categoryDistribution?.distribution.map((item) => (
            <div
              key={item.category}
              className="category-card"
              style={{ borderLeftColor: getCategoryColor(item.category) }}
              onClick={() => handleCategorySelect(item.category)}
            >
              <div className="category-icon">
                {getCategoryIcon(item.category)}
              </div>
              <div className="category-info">
                <h4>{getCategoryDisplayName(item.category)}</h4>
                <p className="category-count">{item.count} registrations</p>
                <p className="category-percentage">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Statistics Table */}
      <div className="category-stats">
        <h3>Detailed Statistics by Category</h3>
        <div className="stats-table-container">
          <table className="stats-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Total</th>
                <th>Verified</th>
                <th>Pending</th>
                <th>Rejected</th>
                <th>Verification Rate</th>
              </tr>
            </thead>
            <tbody>
              {categoryStats.map((stat) => (
                <tr key={stat.user_category}>
                  <td>
                    <span className="category-label">
                      {getCategoryIcon(stat.user_category)} {stat.user_category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td>{stat.total_registrations}</td>
                  <td>{stat.verified_registrations}</td>
                  <td>{stat.pending_registrations}</td>
                  <td>{stat.rejected_registrations}</td>
                  <td>
                    <span className="verification-rate">
                      {stat.verification_rate_percent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Filter and Registrations */}
      <div className="category-filter">
        <h3>Filter Registrations by Category</h3>
        <div className="filter-controls">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategorySelect(e.target.value)}
            className="category-select"
          >
            <option value="">Select a category to view registrations</option>
            {categoryDistribution?.distribution.map((item) => (
              <option key={item.category} value={item.category}>
                {getCategoryDisplayName(item.category)} ({item.count})
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="category-registrations">
            <h4>
              {getCategoryIcon(selectedCategory)} {getCategoryDisplayName(selectedCategory)} Registrations
            </h4>
            {categoryRegistrations.length === 0 ? (
              <p>No registrations found for this category.</p>
            ) : (
              <div className="registrations-list">
                {categoryRegistrations.map((registration) => (
                  <div key={registration.id} className="registration-item">
                    <div className="registration-header">
                      <h5>{registration.full_name}</h5>
                      <span className={`status-badge status-${registration.registration_status}`}>
                        {registration.registration_status}
                      </span>
                    </div>
                    <div className="registration-details">
                      <p><strong>Email:</strong> {registration.email}</p>
                      <p><strong>Phone:</strong> {registration.phone_number}</p>
                      <p><strong>Category:</strong> {registration.user_category}</p>
                      <p><strong>Registered:</strong> {new Date(registration.created_at).toLocaleDateString()}</p>
                      {registration.payment_transactions && registration.payment_transactions.length > 0 && (
                        <p><strong>Transaction ID:</strong> {registration.payment_transactions[0].transaction_id}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Export and Actions */}
      <div className="analytics-actions">
        <button onClick={loadCategoryData} className="refresh-button">
          🔄 Refresh Data
        </button>
        <button 
          onClick={() => UserCategoryService.exportCategoryData().then(console.log)} 
          className="export-button"
        >
          📊 Export Data
        </button>
      </div>
    </div>
  );
};

export default UserCategoryAnalytics;
