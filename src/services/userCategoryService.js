// User Category Service for handling user category analytics and statistics
import { supabase } from '../lib/supabase';

export class UserCategoryService {
  /**
   * Get registration statistics by user category
   * @returns {Promise<Array>} Array of category statistics
   */
  static async getRegistrationStatsByCategory() {
    try {
      const { data, error } = await supabase
        .from('registration_category_stats')
        .select('*')
        .order('total_registrations', { ascending: false });

      if (error) {
        console.error('Error fetching category stats:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to get registration stats by category:', error);
      throw error;
    }
  }

  /**
   * Get registrations filtered by user category
   * @param {string} category - User category to filter by
   * @returns {Promise<Array>} Array of registrations for the specified category
   */
  static async getRegistrationsByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          payment_transactions (
            transaction_id,
            upi_id,
            payment_status
          )
        `)
        .eq('user_category', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations by category:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to get registrations by category:', error);
      throw error;
    }
  }

  /**
   * Get total registration count by category
   * @returns {Promise<Object>} Object with category counts
   */
  static async getCategoryCounts() {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('user_category')
        .not('user_category', 'is', null);

      if (error) {
        console.error('Error fetching category counts:', error);
        throw error;
      }

      // Count registrations by category
      const categoryCounts = {};
      data.forEach(registration => {
        const category = registration.user_category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });

      return categoryCounts;
    } catch (error) {
      console.error('Failed to get category counts:', error);
      throw error;
    }
  }

  /**
   * Get registration trend by category over time
   * @param {number} days - Number of days to look back
   * @returns {Promise<Object>} Object with daily category counts
   */
  static async getCategoryTrend(days = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('registrations')
        .select('user_category, created_at')
        .gte('created_at', startDate.toISOString())
        .not('user_category', 'is', null)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching category trend:', error);
        throw error;
      }

      // Group by date and category
      const trend = {};
      data.forEach(registration => {
        const date = new Date(registration.created_at).toISOString().split('T')[0];
        const category = registration.user_category;
        
        if (!trend[date]) {
          trend[date] = {};
        }
        
        if (!trend[date][category]) {
          trend[date][category] = 0;
        }
        
        trend[date][category]++;
      });

      return trend;
    } catch (error) {
      console.error('Failed to get category trend:', error);
      throw error;
    }
  }

  /**
   * Get user category distribution for dashboard
   * @returns {Promise<Object>} Object with category distribution data
   */
  static async getCategoryDistribution() {
    try {
      const categoryCounts = await this.getCategoryCounts();
      const total = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
      
      const distribution = Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }));

      return {
        total,
        distribution: distribution.sort((a, b) => b.count - a.count)
      };
    } catch (error) {
      console.error('Failed to get category distribution:', error);
      throw error;
    }
  }

  /**
   * Export category data for analytics
   * @returns {Promise<Object>} Object with exportable data
   */
  static async exportCategoryData() {
    try {
      const [stats, counts, trend] = await Promise.all([
        this.getRegistrationStatsByCategory(),
        this.getCategoryCounts(),
        this.getCategoryTrend(90)
      ]);

      return {
        timestamp: new Date().toISOString(),
        stats,
        counts,
        trend,
        summary: {
          totalCategories: Object.keys(counts).length,
          totalRegistrations: Object.values(counts).reduce((sum, count) => sum + count, 0),
          dateRange: '90 days'
        }
      };
    } catch (error) {
      console.error('Failed to export category data:', error);
      throw error;
    }
  }
}

export default UserCategoryService;
