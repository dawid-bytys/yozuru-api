import { assert } from 'chai';
import { clearDatabase } from '../helpers';
import { SESSIONS_ENDPOINT, USERS_ENDPOINT } from '@/constants';
import { bootstrapDependencies } from '@/dependencies';
import { createServer } from '@/server';
import type { FastifyInstance } from 'fastify';

describe('POST /sessions', () => {
  let app: FastifyInstance;

  before(async () => {
    const deps = bootstrapDependencies();
    await clearDatabase(deps.prisma);
    app = await createServer(deps)();

    await app.inject({
      method: 'POST',
      url: USERS_ENDPOINT,
      payload: {
        username: 'testusername',
        email: 'test@gmail.com',
        password: 'testpassword',
        firstName: 'testfirstname',
        lastName: 'testlastname',
      },
    });
  });

  it('should return 200 - user logged in', async () => {
    const response = await app.inject({
      method: 'POST',
      url: SESSIONS_ENDPOINT,
      payload: {
        username: 'testusername',
        password: 'testpassword',
      },
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.cookies[0]!.name, 'accessToken');
    assert.deepEqual(response.json(), {
      success: true,
      message: 'You have successfully logged in.',
    });
  });

  it('should return 401 - invalid credentials (username)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: SESSIONS_ENDPOINT,
      payload: {
        username: 'invalidusername',
        password: 'testpassword',
      },
    });

    assert.equal(response.statusCode, 401);
    assert.deepEqual(response.json(), {
      success: false,
      message: 'Invalid username or password.',
    });
  });

  it('should return 401 - invalid credentials (password)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: SESSIONS_ENDPOINT,
      payload: {
        username: 'testusername',
        password: 'invalidpassword',
      },
    });

    assert.equal(response.statusCode, 401);
    assert.deepEqual(response.json(), {
      success: false,
      message: 'Invalid username or password.',
    });
  });
});
