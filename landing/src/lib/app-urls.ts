/** Full URL to the app sign-in page. Set NEXT_PUBLIC_SIGNIN_URL on Vercel if it changes. */
export const SIGNIN_URL =
  process.env.NEXT_PUBLIC_SIGNIN_URL?.trim() ||
  "https://spardha-ddmy.vercel.app/signin";
