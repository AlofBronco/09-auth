'use client';

import Modal from '@/components/Modal/Modal';
import { useEffect, useState } from 'react';

const Loader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Modal onClose={() => {}}>
      <p>Loading, please wait...</p>
    </Modal>
  );
};

export default Loader;
