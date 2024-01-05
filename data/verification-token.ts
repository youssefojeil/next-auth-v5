import { db } from '@/lib/db';

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  console.log({ token });
  try {
    const verification = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    console.log({ verification });

    return verification;
  } catch (error) {
    console.log(error);
    return null;
  }
};
