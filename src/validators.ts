export const isObject = (val: any) => !!val && typeof val === 'object' && typeof val.map !== 'function';

export const isNonEmptyString = (val: any) => typeof val === 'string' && !!val.trim();
