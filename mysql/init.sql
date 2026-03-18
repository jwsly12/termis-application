-- Configurações do Banco de dados
-- roles: Dev, Admin , User

-- Funcionando sem problemas
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('User','Admin','Dev') NOT NULL DEFAULT 'User',
  last_login DATETIME NULL
  )