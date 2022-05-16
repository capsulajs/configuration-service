import * as utils from '../src/utils';

export const expectWithFailNow = (expect: any, done: any) => {
  try {
    expect();
  } catch (error) {
    done.fail(error);
  }
};

export const runTestsRejectedError = (
  expect: any,
  done: any
) => (
  service: any,
  methods: any,
  request: any,
  response: any,
  beforeEach: any = null
) => {
  expect.assertions(methods.length);

  methods.forEach((method: any, index: number) => {
    if (beforeEach) {
      beforeEach();
    }

    service[method](request)
      .then(() => done.fail(new Error('Resolved without an error')))
      .catch((error: any) => {
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

export const invalidValues = [' ', '', [], ['test'], null, true, false, 0, -1, undefined];

export const invalidValuesForString = [...invalidValues, {}, { test: 'test' }];


