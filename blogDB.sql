CREATE DATABASE blogDB
DEFAULT CHARACTER SET utf8;

USE blogDB;

CREATE TABLE admins (
	admin_id INT AUTO_INCREMENT,
	name	VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(10) NOT NULL,
	PRIMARY KEY (admin_id),
	UNIQUE (email)
);

CREATE TABLE posts (
	post_id INT AUTO_INCREMENT,
	post_title VARCHAR(255),
	post_content LONGTEXT,
	owner_id INT,
	post_date VARCHAR(255),
	post_time VARCHAR(255),
	PRIMARY KEY (post_id),
	FOREIGN KEY (owner_id) REFERENCES admins(admin_id) 
);

INSERT INTO admins(name, email, password) VALUES("admin1", "admin1@mail.com", "admin1");