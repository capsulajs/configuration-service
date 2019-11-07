export const isObject = (val: any) => !!val && typeof val === 'object';

export const isNonEmptyString = (val: any) => typeof val === 'string' && !!val.trim();
