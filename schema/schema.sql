CREATE TABLE locations (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE
) ENGINE=INNODB;

INSERT INTO locations (name) VALUES
('Warehouse'),
('Office'),
('Construction Site'),
('Retail Store');

CREATE TABLE tasks (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100) NOT NULL,
  status ENUM('completed', 'incomplete') DEFAULT 'incomplete',

  location_id INT(11) NOT NULL,

  FOREIGN KEY(location_id) REFERENCES locations(id) ON DELETE CASCADE
) ENGINE=INNODB;

INSERT INTO tasks (description, location_id, status) VALUES
('Inventory management', 1, 'completed'),
('Document filing', 2, 'completed'),
('Equipment setup', 3, 'incomplete'),
('Customer assistance', 4, 'incomplete');

CREATE TABLE workers (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  hourly_wage DECIMAL(5, 2) NOT NULL
) ENGINE=INNODB;

INSERT INTO workers (username, hourly_wage) VALUES
('john_doe', 20.50),
('jane_smith', 18.75),
('bob_jones', 22.00),
('alice_walker', 19.60);

CREATE TABLE logged_time (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  time_seconds INT(11) NOT NULL,

  task_id INT(11) NOT NULL,
  worker_id INT(11) NOT NULL,

  FOREIGN KEY(task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY(worker_id) REFERENCES workers(id) ON DELETE CASCADE
) ENGINE=INNODB;

INSERT INTO logged_time (time_seconds, task_id, worker_id) VALUES
(3600, 1, 1),
(5400, 2, 2), 
(7200, 3, 3),
(1800, 4, 4),
(4500, 1, 3),
(6000, 2, 1);
