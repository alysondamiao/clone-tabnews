import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const query = `
  SELECT version(),
         setting AS max_connections
  FROM pg_settings
  WHERE name = 'max_connections';
 
  SELECT COUNT(*) AS open_connections
  FROM pg_stat_activity
  WHERE state = 'active';

`;

  const queryResult = await database.query(query);
  console.log(queryResult);
  const dataBaseVersion = queryResult[0].rows[0].version;
  const maxConnections = queryResult[0].rows[0].max_connections;
  const openConnections = queryResult[1].rows[0].open_connections;
  response.status(200).json({
    updated_at: updatedAt,
    data_base_version: dataBaseVersion,
    max_connections: maxConnections,
    open_connections: openConnections,
  });
}

export default status;
