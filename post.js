var assert = require('assert');
var mysql = require('mysql');
var pool = require('./user').pool;


module.exports = {
	addPost: function(title, subject, id, date, time, callback) {
		pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				throw err;
			}
			
			
			connection.query('INSERT INTO posts (post_title, post_content, owner_id, post_date, post_time) VALUES(?, ?, ?, ?, ?)', [title, subject, id, date, time],
			function(err, rows) {
				connection.release();
				assert.equal(err, null);
				console.log("Saved blog post details.");
				if(err == null){
          callback(true)
        }
        else{
          callback(false)
        }
			});
		});
	},
	
	updatePost: function(id, title, subject, date, time, callback) {
		pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				throw err;
			}
		
			connection.query('UPDATE posts SET post_title = ?, post_content = ?, post_date = ?, post_time = ? WHERE post_id = ?', [title, subject, date, time, id],
			function(err, rows) {
				connection.release();
				assert.equal(err, null);
		    console.log("Updated the blog post details.");
				if(err == null){
					callback(true)
				}
				else{
					callback(false)
				}
			});
		});
	},
	
	getPost: function(id, callback) {
		pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				throw err;
			}
			
			connection.query('SELECT * FROM posts WHERE owner_id = ?', id, function(err, rows) {
				connection.release();
				callback(rows);
			});
		});
	},
	
	getPostWithId: function(id, callback) {
		pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				throw err;
			}
			
			connection.query('SELECT * FROM posts WHERE post_id = ?', id, function(err, rows) {
				connection.release();
				assert.equal(err, null);
				if(err == null) {
					callback(rows);
				}
				else {
					callback(false);
				}
			});
		});
	},
	
	deletePost: function(id, callback) {
		pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				throw err;
			}
			
			connection.query('DELETE FROM posts WHERE post_id = ?', id, function(err, rows) {
				connection.release();
				assert.equal(err, null)
				if(err == null) {
					callback(rows);
				}
				else {
					callback(false);
				}
			});
		});
	}
}