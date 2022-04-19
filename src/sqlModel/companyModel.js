const db = require('../config/db')


const insertCompany = async function(companyName, code) {
    try {
        const rows  = await db.query(
        `INSERT INTO companies ( company_code, company_name) 
         VALUES ($1, $2)`, [code, companyName]
        );
        return rows.rowCount; 
    } catch (error) {
        throw error;
    }
};

module.exports ={
    insertCompany
}