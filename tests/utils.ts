export const expectWithFailNow = (expect, done) => {
  try {
    expect();
  } catch (error) {
    done.fail(error);
  }
};

export const runTestsRejectedError = (
  expect,
  done
) => (
  service,
  methods,
  request,
  response,
  beforeEach = null
) => {
  expect.assertions(methods.length);

  methods.forEach((method, index) => {
    if (beforeEach) {
      beforeEach();
    }

    service[method](request)
      .then(() => done.fail(new Error('Resolved without an error')))
      .catch((error) => {
        expectWithFailNow(() => expect(error).toEqual(response), done);

        if (index === methods.length - 1) {
          done();
        }
      });

  });
}
