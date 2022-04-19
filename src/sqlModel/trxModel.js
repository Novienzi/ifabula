const db = require('../config/db')



const insertTrx = async function(goodId, qty,grandTotal ) {
    const now = new Date()
    try {
        await db.query('BEGIN')
        const queryInsert = 'INSERT INTO transactions (good_id, qty, grand_total) VALUES ($1, $2, $3) RETURNING qty'
        const res = await db.query(queryInsert ,[goodId, qty, grandTotal])
        const queryUpdate = 'UPDATE goods SET stock = stock - $1, updated_at = $2 where id = $3'
        const queryUpdateValue = [res.rows[0].qty, now, goodId ]
        const result =  await db.query(queryUpdate, queryUpdateValue)
        await db.query('COMMIT')
        return result
      } catch (e) {
        await db.query('ROLLBACK')
        throw e
      }
}

const getAllTransactions = async function() {
  try {
      const rows  = await db.query(
      `select t.created_at::date as trx_date,c.company_name, g."name", g.price, t.qty, t.grand_total, g.stock from transactions t 
      join goods g ON t.good_id = g.id 
      join companies c on c.id = g.company_id`
      );
      return rows.rows; 
  } catch (error) {
      throw error;
  }
};


module.exports ={
    insertTrx, getAllTransactions
}