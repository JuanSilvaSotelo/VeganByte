import { pool } from '../config/database.js';

const DatabaseService = {
  healthCheck: async () => {
    try {
      const [result] = await pool.query('SELECT 1 + 1 AS solution');
      return result[0].solution === 2;
    } catch (error) {
      return false;
    }
  }
};

export default DatabaseService;