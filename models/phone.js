class Phone {
  static async getPhones ({ pagination: { limit, offset } }) {
    const selectQuery = `
      SELECT *
      FROM PHONES
      LIMIT ${limit} OFFSET ${offset};
    `;

    try {
      const { rows } = await Phone.pool.query(selectQuery);

      return rows;
    } catch (err) {
      throw new Error(err.detail);
    }
  }
}

module.exports = Phone;
