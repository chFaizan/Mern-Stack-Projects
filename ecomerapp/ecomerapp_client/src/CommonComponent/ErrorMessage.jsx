import React, { useEffect } from 'react';
import { toast, Bounce } from 'react-toastify';

const ErrorMessage = ({ showToast, msg, type }) => {
  useEffect(() => {
    if (showToast) {
      if (type === 'success') {
        toast.success(msg, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      } else if (type === 'error') {
        toast.error(msg, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      } else {
        toast(msg, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
    }
  }, [showToast, msg, type]);

  return null;
};

export default ErrorMessage;
