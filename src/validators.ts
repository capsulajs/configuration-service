import { messages } from './utils';

export const isObject = (val: any) => !!val && typeof val === 'object' && typeof val.map !== 'function';

export const isNonEmptyString = (val: any) => typeof val === 'string' && !!val.trim();

export const validateSaveEntryRequest = (request: any) => {
  if (!isObject(request)) {
    throw new Error(messages.invalidRequest);
  }
  if (!isNonEmptyString(request.key)) {
    throw new Error(messages.invalidKey);
  }
  if (!isNonEmptyString(request.repository)) {
    throw new Error(messages.invalidRepository);
  }
};
