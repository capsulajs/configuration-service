import * as utils from '../src/utils';

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
};

export const mockFetchFile = (data: { type: 'resolve' | 'reject', content: any }) => {
  (utils as any).fetchFile = jest.fn(() => {
    if (data.type === 'resolve') {
      return Promise.resolve(data.content);
    } else {
      return Promise.reject(new Error(data.content));
    }
  })
};
