'use client';

import Image from 'next/image';
import css from './EditProfile.module.css';
import { useEffect, useState } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

const EditProfile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const router = useRouter();

  useEffect(() => {
    getMe().then(user => {
      setUserEmail(user.email);
      setUserName(user.username);
      setUserImage(user.avatar);
    });
  }, []);

  const handleSubmit = async () => {
    try {
      await updateMe({ username: userName, email: userEmail });
      router.push('/profile');
    } catch (error) {
      console.error('Oops, some error:', error);
    }
  };

  const handleReturn = () => {
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {userImage && <Image src={userImage} alt="User Avatar" width={120} height={120} className={css.avatar} />}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" className={css.input} value={userName} onChange={e => setUserName(e.target.value)} />
          </div>

          <p>Email: {userEmail}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleReturn}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
