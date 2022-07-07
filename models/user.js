class User {
  static async create (newUser) {
    const { firstName, lastName, email, tel } = newUser;

    const insertQuery = `
      INSERT INTO users (first_name, last_name, email, tel)
      VALUES ('${firstName}', '${lastName}', '${email}', '${tel}')
      RETURNING *;
    `;

    try {
      const {
        rows: [user],
      } = await User.pool.query(insertQuery);

      return user;
    } catch (err) {
      throw new Error(err.detail);
    }
  }
  static async get (id) {
    const getUserQuery = `
      SELECT * 
      FROM users
      WHERE id=${id}
    `;
    try {
      const {
        rows: [user],
      } = await User.pool.query(getUserQuery);

      return user;
    } catch (err) {
      throw new Error(err.detail);
    }
  }
  static async update (id, { firstName, lastName, email, tel }) {
    const getUser = await this.get(id);
    // есть ли возможность сделать тоже самое но с неограниченым колличеством параметров? без прямого присваивания каждого значения
    if (firstName === undefined) {
      firstName = getUser.first_name;
    }
    if (lastName === undefined) {
      lastName = getUser.last_name;
    }
    if (email === undefined) {
      email = getUser.email;
    }
    if (tel === undefined) {
      tel = getUser.tel;
    }
    const updateUserQuery = `
      UPDATE users
      SET first_name = '${firstName}',
          last_name = '${lastName}',
          email = '${email}',
          tel = '${tel}'
      WHERE id = ${+id}
      RETURNING *;
    `;
    try {
      const {
        rows: [updatedUser],
      } = await User.pool.query(updateUserQuery);

      return updatedUser;
    } catch (error) {
      throw new Error(error.detail);
    }
  }
  static async delete (id) {
    const deleteQuery = `
      DELETE FROM users
      WHERE id=${id} 
      RETURNING id;
    `;

    try {
      const {
        rows: [deletedUser],
      } = await User.pool.query(deleteQuery);
      return deletedUser;
    } catch (err) {
      throw new Error(err.detail);
    }
  }
  static async getUsersPhones (id) {
    const userPhonesQuery = `
      SELECT CONCAT(first_name, ' ', last_name) AS "user", brand, model
      FROM users AS u INNER JOIN orders AS o ON u.id = o.user_id
                        INNER JOIN phones_to_orders AS p_to_o ON o.id =  p_to_o.order_id
                        INNER JOIN phones AS p ON p_to_o.phone_id = p.id
      WHERE u.id = ${+id}; 
    `;

    try {
      const { rows } = await User.pool.query(userPhonesQuery);
      return rows;
    } catch (err) {
      throw new Error(err.detail);
    }
  }
}

module.exports = User;
