import { getEnv, isProd } from '@/config';
import { bootstrapDependencies } from '@/dependencies';
import { createServer } from '@/server';

async function main() {
  const deps = bootstrapDependencies();

  try {
    const server = await createServer(deps)({
      logger: isProd || {
        transport: {
          target: 'pino-pretty',
          options: {
            ignore: 'pid,hostname',
          },
        },
      },
    });
    await server.listen({ port: getEnv('PORT') });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
