import { Icon } from '@iconify/react/dist/iconify.js';
import Swal, { SweetAlertOptions } from 'sweetalert2';

export type SwalFireOption = {
  text?: string;
  title?: string;
  titleText?: string;
  timer?: number;
  timerProgressBar?: boolean;
  icon?: string;
  [key: string]: any;
};

export function swalFire() {
  const success = (text: string, messages?: SweetAlertOptions) => {
    return Swal.fire({
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      text,
      theme: 'dark',
      confirmButtonColor: '#00b8db',
      ...messages,
    });
  };
  const error = (text: string, messages?: SweetAlertOptions) => {
    return Swal.fire({
      icon: 'error',
      timer: 2000,
      timerProgressBar: true,
      text,
      theme: 'dark',
      confirmButtonColor: '#00b8db',
      ...messages,
    });
  };
  const warn = (text: string, messages?: SweetAlertOptions) => {
    return Swal.fire({
      icon: 'warning',
      timer: 2000,
      timerProgressBar: true,
      text,
      theme: 'dark',
      confirmButtonColor: '#00b8db',
      ...messages,
    });
  };

  const question = (text: string, messages?: SweetAlertOptions) => {
    return Swal.fire({
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#00b8db',
      cancelButtonColor: '#dc3545',
      theme: 'dark',
      text,
      ...messages,
    });
  };

  const loading = (text: string, messages?: SweetAlertOptions) => {
    return Swal.fire({
      text,
      theme: 'dark',
      confirmButtonColor: '#00b8db',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      ...messages,
    });
  };

  // const info = (text: string, messages?: SweetAlertOptions) => {
  //   return Swal.fire({
  //     text,
  //     ...messages,
  //   });
  // };

  return {
    success,
    error,
    warn,
    question,
    loading,
    // info,
  };
}
