const auth = require('../auth');

/* eslint-env jest */
describe('Test auth', () => {
  let token;
  it('Should create a valid token', async () => {
    const params = {
      _id: '5ce0d1ecfa345329903dce1f',
      active: true,
      name: 'Le Sistemas',
      api_token: 'le',
    };
    token = await auth.create(params);
    expect(token).toEqual(expect.any(String));
  });

  it('Should valid token', async () => {
    const result = await auth.validate(token);
    expect(result.alias).toEqual('le');
  });
});
