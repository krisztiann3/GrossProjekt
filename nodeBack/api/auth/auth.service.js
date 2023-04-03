const {query} = require("../../config/db");

async function userName(username){
    try {
        return await query("SELECT * FROM bejelentkezes WHERE felhasznalo = ?",[username])
    } catch (error) {
        return false
    }
}

async function UserEmailGet(emailcim, felhasznalonev){
    try {
        return await query("SELECT email, felhasznalo FROM bejelentkezes WHERE email = ? OR felhasznalo = ?", [emailcim, felhasznalonev])
    } catch (error) {
        return false
    }
}

async function regist(felhasznalonev, emailcim, hash){
    try {
        return await query('INSERT INTO bejelentkezes (felhasznalo, email, jelszo) VALUES (?,?,?)', [felhasznalonev, emailcim, hash])
    } catch (error) {
        
    }
}

async function ki(token){
    try {
        return await query('INSERT INTO blacklist (token) VALUE (?)', [token])
    } catch (error) {
        return false
    }
}


module.exports = {userName,UserEmailGet,regist,ki};