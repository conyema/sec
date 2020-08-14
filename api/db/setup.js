const { pool } = require('./config');

const createEmployeeTable = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `CREATE TABLE IF NOT EXISTS employee (
        employeeID SERIAL PRIMARY KEY,
        firstName VARCHAR(64) NOT NULL,
        lastName VARCHAR(64) NOT NULL,
        email VARCHAR (100) NOT NULL,
        password VARCHAR NOT NULL,
        gender VARCHAR (20) NOT NULL,
        role VARCHAR(64) DEFAULT 'staff',
        address VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN DEFAULT false,
        UNIQUE(email)
      )`
    );
    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

const insertAdmin = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      INSERT INTO employee
        (firstName, lastName, email, password, gender, role, address, isadmin)
      VALUES
        ('Chinedum', 'Onyema', 'onyemachinedum@gmail.com', '$2b$10$TImj.7e.zhDgBdoYZItwXek6iPsyfRy867I3monPu2nSAmjUM72v2', 'male', 'admin', 'Abuja', true)
      RETURNING employeeId
      `);
    console.log('Insertion successful', result);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

const createClientTable = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `CREATE TABLE IF NOT EXISTS client (
        clientID SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        address VARCHAR(255),
        details TEXT,
        UNIQUE(email)
      )`
    );
    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

const createLocationTable = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `CREATE TABLE IF NOT EXISTS location (
        locationID SERIAL PRIMARY KEY,
        city VARCHAR(100) NOT NULL
      )`
    );
    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

const createEstateStatusTable = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `CREATE TABLE IF NOT EXISTS estateStatus (
        estateStatusID SERIAL PRIMARY KEY,
        name VARCHAR(64) NOT NULL,
        UNIQUE(name)
      )`
    );
    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

const createEstateTypeTable = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `CREATE TABLE IF NOT EXISTS estateType (
        estateTypeID SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        UNIQUE(name)
      )`
    );
    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

const createInChargeTable = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `CREATE TABLE IF NOT EXISTS inCharge (
        inChargeID SERIAL PRIMARY KEY,
        estateID INTEGER NOT NULL REFERENCES estate ON DELETE CASCADE,
        employeeID INTEGER REFERENCES employee ON DELETE SET NULL,
        startDate TIMESTAMPTZ NOT NULL,
        stopDate TIMESTAMPTZ
      )`
    );
    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

const createEstateTable = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `CREATE TABLE IF NOT EXISTS estate (
        estateID SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        locationID INTEGER NOT NULL REFERENCES location,
        estateTypeID INTEGER NOT NULL REFERENCES estateType,
        floorSpace NUMERIC(8,2),
        balcony INTEGER,
        balconySpace NUMERIC(8,2),
        bedroom INTEGER,
        bathroom INTEGER,
        garage INTEGER,
        parkingSpace INTEGER,
        petsAllowed BOOLEAN DEFAULT false,
        desciption TEXT NOT NULL,
        estateStatusID INTEGER NOT NULL REFERENCES estateStatus
      )`
    );
    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

try {
  // createEmployeeTable();
  // createLocationTable();
  // createClientTable();
  // createEstateStatusTable();
  // createInChargeTable();
  // createEstateTable()
  // createEstateTypeTable();
  insertAdmin();
} catch (error) {
  console.log(error);
} finally {
  // insertAdmin();
  console.log("Database Transactions")
}
