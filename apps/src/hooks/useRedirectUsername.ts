// hooks/useRedirectToUsername.ts
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { decodeToken } from '@/utils/decodeTokenUsername';

const useRedirectToUsername = () => {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      const username = decodeToken(token);

      if (username) {
        router.push(`/${username}`);
      }
    }
  }, [router]);
};

export default useRedirectToUsername;
