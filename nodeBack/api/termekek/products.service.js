const {query} = require("../../config/db");

async function shirtDb(termekek){
    try {
        return await query("SELECT * FROM polok",[termekek])
    } catch (error) {
        return false
    }
}

async function shirtIdDb(id){   
    try{
        return await query("SELECT * FROM polok WHERE id=?",[id])
    } catch (error) {
        return false
    }
}

async function hoodieDb(termekek){   
    try {
        return await query("SELECT * FROM puloverek",[termekek])
    } catch (error) {
        return false
    }
}

async function hoodieIdDb(id){
    try {
        return await query("SELECT * FROM puloverek WHERE id=?",[id])
    } catch (error) {
        return false
    }
}

async function jeanDb(termekek){
    try {
        return await query("SELECT * FROM nadragok")
    } catch (error) {
        return false
    }
}

async function jeanIdDb(id){
    try {     
          return await query("SELECT * FROM nadragok WHERE id=?",[id])
    } catch (error) {
        return false
    }
}



module.exports = {shirtDb,hoodieDb,jeanDb,shirtIdDb,hoodieIdDb,jeanIdDb}