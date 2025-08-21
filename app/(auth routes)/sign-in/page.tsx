'use client';

import { useState } from 'react';
import css from './SignIn.module.css';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { login } from '@/lib/api/clientApi';
import { ApiError } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';

const SignIn = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const values = Object.fromEntries(formData) as User;
      const res = await login(values);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError)?.response?.data?.response?.validation?.body?.message ??
          (error as ApiError)?.response?.data?.response?.message ??
          'Oops... some error'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignIn;
