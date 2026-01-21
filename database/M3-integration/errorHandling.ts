import pool from './db';
export function postgresError(error: any) {
    switch (error.code) {
      case '23505':  
        return new Error('Duplicate entry');
      case '23503':  
        return new Error('This record cannot be deleted because it has associated records.');
      case '42P01':  
        return new Error('Database table not found.');
      default:
        return new Error('An unexpected error occurred'+error.message);
    }
  }
  

async function logSlowQuery(queryText: string, params: any[]) {
  const start = Date.now();

  const result = await pool.query(queryText, params);

  const duration = Date.now() - start;
  if (duration > 100) {
    console.log(`Slow Query duration: ${duration}ms`);
  }
  return result;
}

async function executeQueries() {

  try{
    await pool.query(`
    CREATE TABLE newusers(
      name VARCHAR(255),
      email VARCHAR(255) NOT NULL
    )`)
  }catch(err){
    console.log(err);
  }
  try {
    const insertResult = await pool.query(
      'INSERT INTO newusers(name, email) VALUES($1, $2)', 
      ['efg', 'efg@gmail.com']
    );
   

  } catch (error) {
    const mappedError = postgresError(error);  
    console.error(mappedError.message);  
  }

  try {
    const queryResult = await logSlowQuery(
      'SELECT * FROM newusers WHERE email = $1', 
      ['efg@gmail.com']
    );
    console.log('Query result:', queryResult.rows);

  } catch (error) {
    console.error( error);
  }
}
executeQueries();

