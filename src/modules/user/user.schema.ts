import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export const userBase = z.object({
  id: z.string().uuid().describe('user id'),
  name: z.string().describe('user name'),
  email: z.string().email().optional().describe("user's email address"),
  age: z.number().min(0).max(120).step(1).optional().describe('the age of user'),
  createdAt: z.date().describe('signup date'),
  updatedAt: z.date().describe('last modified date'),
});

export const userInputSchema = userBase.pick({ name: true, email: true, age: true });
export type UserInputType = z.infer<typeof userInputSchema>;

export const userSchema = userBase;
export type UserType = z.infer<typeof userSchema>;

export const userListSchema = z.array(userBase);
export type userListType = z.infer<typeof userListSchema>;

export const getUsersQuerySchema = z.object({
  limit: z.number().min(1).step(1).default(100).describe('limit').optional(),
  offset: z.number().min(0).step(1).describe('offset').optional(),
});
export type GetUsersQuerySchema = z.infer<typeof getUsersQuerySchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    userInputSchema,
    userSchema,
    userListSchema,
    getUsersQuerySchema,
  },
  {
    $id: 'userSchemas',
  },
);
