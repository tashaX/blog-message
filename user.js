var assert = require('assert');
var mysql = require('mysql');


module.exports = {
	pool: mysql.createPool({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'blogdb'
	}),

	signup: function(name, email, password, callback) {
		this.pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				throw err;
			}
		
			connection.query('INSERT INTO admins (name, email, password) VALUES(?, ?, ?)', [name, email, password],
				function(err, rows) {
				connection.release();
				assert.equal(err, null);
				console.log("Saved the user sign up details.");
				if(err == null){
          callback(true)
        }
        else{
          callback(false)
        }
			});
		
		});	
	},
	
	validateSignIn: function(username, password, callback) {
		this.pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				throw err;
			}
			
		connection.query("SELECT * FROM admins WHERE email = ? AND password = ?", [username, password], 
				function(err, rows) {
					connection.release();
					if (rows.length == 0) {
						console.log('return false');
						callback(false);
					}
					else {
						console.log('return true');
						callback(true, rows[0].admin_id);
					}
				});
		});
	}
	
	
}



