'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { generateVerificationToken } from '@/lib/tokens';
import * as z from 'zod';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: 'Invalid Credentials',
    };
  }

  if (!existingUser.emailVerified) {
    const verifcationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(verifcationToken.email, verifcationToken.token);

    return {
      success: 'Confirmation Email Sent!',
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Invalid credentials!',
          };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
};
