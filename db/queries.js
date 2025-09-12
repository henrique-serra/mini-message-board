import pool from './pool.js';

export default class Database {
    async getAllMessages(sort='DESC') {
        // Validate input for safety reasons
        const validSorts = ['ASC', 'DESC'];
        const sortDirection = validSorts.includes(sort.toUpperCase()) ? sort.toUpperCase() : 'DESC';

        const { rows } = await pool.query(`SELECT * FROM messages ORDER BY added ${sortDirection};`);
        return rows;
    }

    async insertMessage({ text, username }) {
        try {
            const result = await pool.query(
                'INSERT INTO messages (text, username) VALUES ($1, $2) RETURNING *;',
                [text, username]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error inserting message: ', error);
            throw error;
        }
    }

    async getMessage(id) {
        try {
            const { rows } = await pool.query(
                'SELECT * FROM messages WHERE id = $1;',
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error('Error getting message: ', error);
            throw error;
        }
    }

    async deleteMessage(id) {
        try {
            const { rows } = await pool.query(
                'DELETE FROM messages WHERE id = $1 RETURNING *;',
                [id]
            );
            return rows;
        } catch (error) {
            console.error('Error deleting message: ', error);
            throw error;
        }
    }
}