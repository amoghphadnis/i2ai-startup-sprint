import { api } from './api';

export const unicornService = {
  async getUnicorns() {
    return api.get('/unicorns');
  },
  
  async getLeaderboard() {
    return api.get('/leaderboard');
  },
  
  async submitUnicorn(data) {
    return api.post('/unicorns', data);
  },
};