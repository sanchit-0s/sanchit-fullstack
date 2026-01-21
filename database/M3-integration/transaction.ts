import pool from './db';
async function createProject(){
    try{
        await pool.query(`CREATE TABLE IF NOT EXISTS projects(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )`)

        await pool.query(`
        CREATE TABLE IF NOT EXISTS projecttasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
            completed BOOLEAN DEFAULT FALSE
          );`)
    }catch(err){
        console.log(err)
    }
}

export async function Transaction(fn: (client: any) => Promise<void>) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN'); 
    await fn(client); 
    await client.query('COMMIT');  
  } catch (error) {
    await client.query('ROLLBACK'); 
    throw error;  
  } finally {
    client.release();  
  }
}

  interface Task {
    title: string;
    projectId: number; 
  }
  
  export async function createProjectWithTasks(client: any, projectName: string, projecttasks: Task[]) {
    const project = await client.query(
      'INSERT INTO projects(name) VALUES($1) RETURNING id',
      [projectName]
    );
    const projectId = project.rows[0].id; 
    
    for (const task of projecttasks) {
      await client.query(
        'INSERT INTO projecttasks(title, project_id) VALUES($1, $2)',
        [task.title, projectId]
      );
    }
  }


  async function run() {
    await createProject();
    const projectName = 'New Project';
    const tasks = [
      { title: 'Task 1', projectId: 0 }, 
      { title: 'Task 2', projectId: 0 },
    ];
  
    try {
      await Transaction(async (client) => {
        await createProjectWithTasks(client, projectName, tasks);  
      });
      console.log('Project and tasks created successfully!');
    } catch (err) {
      console.error('Error creating project and tasks:', err);
    }
  }
  
  run();
  