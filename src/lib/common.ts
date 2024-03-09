import { IApiResponse } from '@/interfaces/common';
import { Prisma } from '@/lib/prisma';

/**
 * Catch prisma ORM error
 * @param defaultMsg
 * @param err
 * @returns {IApiResponse}
 */
export const catchORMError = (
  defaultMsg: string,
  err?: unknown
): IApiResponse => {
  // type narrowing
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      statusCode: 'ERROR',
      message: err.message,
    };
  }
  return {
    statusCode: 'ERROR',
    message: defaultMsg,
  };
};

export const ApiResponse = (
  defaultMsg: string,
  data: unknown
): IApiResponse => {
  return {
    statusCode: 'OK',
    message: defaultMsg,
    data: data,
  };
};