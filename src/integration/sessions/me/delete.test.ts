import { assert } from 'chai';
import { clearDatabase } from '../../helpers';
import { SESSIONS_ENDPOINT, USERS_ENDPOINT } from '@/constants';
import { bootstrapDependencies } from '@/dependencies';
import { createServer } from '@/server';
import type { FastifyInstance } from 'fastify';

describe('DELETE /sessions/me', () => {
  let app: FastifyInstance;
  let accessToken: string;

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
        password: 'Testpassword123!',
        firstName: 'testfirstname',
        lastName: 'testlastname',
      },
    });

    const loginResponse = await app.inject({
      method: 'POST',
      url: SESSIONS_ENDPOINT,
      payload: {
        username: 'testusername',
        password: 'Testpassword123!',
      },
    });

    accessToken = loginResponse.cookies[0]!.value;
  });

  it('should return 205 - user logged out', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `${SESSIONS_ENDPOINT}/me`,
      cookies: {
        accessToken,
      },
    });

    assert.equal(response.statusCode, 205);
    assert.equal(response.cookies[0]!.value, '');
    assert.deepEqual(response.json(), {
      success: true,
      message: 'You have successfully logged out.',
    });
  });

  it('should return 401 - not authorized', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `${SESSIONS_ENDPOINT}/me`,
    });

    assert.equal(response.statusCode, 401);
    assert.deepEqual(response.json(), {
      success: false,
      message: 'You are not authorized to access this resource.',
    });
  });
});
