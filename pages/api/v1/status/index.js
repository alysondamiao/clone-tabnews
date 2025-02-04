import { createRouter } from "next-connect";
import database from "infra/database.js";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();

  const dataBaseVersionResult = await database.query(`SHOW server_version;`);
  const dataBaseVersionValue = dataBaseVersionResult.rows[0].server_version;

  const dataBaseMaxConnectionResult = await database.query(
    `SHOW max_connections;`,
  );
  const maxConnectionsValue =
    dataBaseMaxConnectionResult.rows[0].max_connections;

  const dataBaseName = process.env.POSTGRES_DB;
  const dataBaseOpenConnectionsResult = await database.query({
    text: "SELECT COUNT(*)::int AS open_connections FROM pg_stat_activity WHERE datname = $1",
    values: [dataBaseName],
  });
  const openConnectionsValue =
    dataBaseOpenConnectionsResult.rows[0].open_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dataBaseVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        open_connections: openConnectionsValue,
      },
    },
  });
}
