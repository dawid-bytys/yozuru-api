import { assert } from 'chai';
import { clearDatabase } from '../../../helpers';
import { SESSIONS_ENDPOINT, USERS_ENDPOINT } from '@/constants';
import { bootstrapDependencies } from '@/dependencies';
import { createServer } from '@/server';
import type { FastifyInstance } from 'fastify';

describe('PATCH /users/me/email', () => {
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

  it('should return 204 - email changed successfully', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: `${USERS_ENDPOINT}/me/email`,
      cookies: {
        accessToken,
      },
      payload: {
        newEmail: 'newmail@gmail.com',
      },
    });

    assert.equal(response.statusCode, 204);
    assert.deepEqual(response.json(), {
      success: true,
      message: 'Your e-mail has been successfully changed.',
    });
  });

  it('should return 401 - unauthorized', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: `${USERS_ENDPOINT}/me/email`,
      payload: {
        newEmail: 'newmail@gmail.com',
      },
    });

    assert.equal(response.statusCode, 401);
    assert.deepEqual(response.json(), {
      success: false,
      message: 'You are not authorized to access this resource.',
    });
  });

  it('should return 409 - e-mails are the same', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: `${USERS_ENDPOINT}/me/email`,
      cookies: {
        accessToken,
      },
      payload: {
        newEmail: 'newmail@gmail.com',
      },
    });

    assert.equal(response.statusCode, 409);
    assert.deepEqual(response.json(), {
      success: false,
      message: 'New e-mail cannot be the same as the old one.',
    });
  });
});
