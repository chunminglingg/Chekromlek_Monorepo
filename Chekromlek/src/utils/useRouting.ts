// utils/useRouting.ts
import { useRouter } from 'next/router';

export const useRouting = () => {
  const router = useRouter();
  if (!router) {
    throw new Error('NextRouter was not mounted');
  }
  return router;
};
