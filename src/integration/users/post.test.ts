import { assert } from 'chai';
import { clearDatabase } from '../helpers';
import { USERS_ENDPOINT } from '@/constants';
import { bootstrapDependencies } from '@/dependencies';
import { createServer } from '@/server';
import type { FastifyInstance } from 'fastify';

describe('POST /users', () => {
  let app: FastifyInstance;

  before(async () => {
    const deps = bootstrapDependencies();
    await clearDatabase(deps.prisma);
    app = await createServer(deps)();
  });

  it('should return 200 - user registered', async () => {
    const response = await app.inject({
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

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), {
      success: true,
      message: 'You have successfully registered.',
    });
  });

  it('should return 409 - user already exists (username)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: USERS_ENDPOINT,
      payload: {
        username: 'testusername',
        email: 'test1@gmail.com',
        password: 'testpassword',
        firstName: 'testfirstname',
        lastName: 'testlastname',
      },
    });

    assert.equal(response.statusCode, 409);
    assert.deepEqual(response.json(), {
      success: false,
      message: 'User with this username already exists.',
    });
  });

  it('should return 409 - user already exists (email)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: USERS_ENDPOINT,
      payload: {
        username: 'testusername1',
        email: 'test@gmail.com',
        password: 'testpassword',
        firstName: 'testfirstname',
        lastName: 'testlastname',
      },
    });

    assert.equal(response.statusCode, 409);
    assert.deepEqual(response.json(), {
      success: false,
      message: 'User with this email already exists.',
    });
  });

  it('should return 403 - validation error (username)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: USERS_ENDPOINT,
      payload: {
        username: 'test',
        email: 'test2@gmail.com',
        password: 'testpassword',
        firstName: 'testfirstname',
        lastName: 'testlastname',
      },
    });

    assert.equal(response.statusCode, 403);
  });

  it('should return 403 - validation error (email)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: USERS_ENDPOINT,
      payload: {
        username: 'test',
        email: 'test2gmail.com',
        password: 'testpassword',
        firstName: 'testfirstname',
        lastName: 'testlastname',
      },
    });

    assert.equal(response.statusCode, 403);
  });

  it('should return 403 - validation error (firstName)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: USERS_ENDPOINT,
      payload: {
        username: 'test',
        email: 'test2@gmail.com',
        password: 'testpassword',
        firstName: 't',
        lastName: 'testlastname',
      },
    });

    assert.equal(response.statusCode, 403);
  });

  it('should return 403 - validation error (lastName)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: USERS_ENDPOINT,
      payload: {
        username: 'test',
        email: 'test2@gmail.com',
        password: 'testpassword',
        firstName: 'testfirstname',
        lastName: 't',
      },
    });

    assert.equal(response.statusCode, 403);
  });
});
