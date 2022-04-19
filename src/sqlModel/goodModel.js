const db = require('../config/db')


const getAllGoods = async function() {
    try {
        const rows  = await db.query(
        `select g.id, g.price, g.stock, c.company_name, c.company_code from goods g 
        join companies c on c.id = g.company_id ;`
        );
        return rows; 
    } catch (error) {
        throw error;
    }
};

const getOneGoods = async function(goodID) {
    try {
        const rows  = await db.query(
        `select g.id, g.price, g.stock from goods g
        where id = $1`, [goodID]);
        return rows.rows; 
    } catch (error) {
        throw error;
    }
};

module.exports ={
    getAllGoods, getOneGoods
}