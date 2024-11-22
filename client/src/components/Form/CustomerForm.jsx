import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Switch } from 'antd';

const CustomerForm = ({
  showCustomerForm,
  onClose,
  onSubmit,
  customer,
  setCustomer,
  type,
  isChangePassword,
  setIsChangePassword,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  if (!showCustomerForm) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4 dark:text-white'>Add New Customer</h2>
        <form onSubmit={onSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300 dark:text-gray-300'>
              First Name
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              value={customer.firstName}
              name='name'
              onChange={(e) =>
                setCustomer((prev) => ({ ...prev, firstName: e.target.value || '' }))
              }
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300 dark:text-gray-300'>
              Last Name
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              value={customer.lastName}
              name='name'
              onChange={(e) => setCustomer((prev) => ({ ...prev, lastName: e.target.value }))}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>Address</label>
            <input
              type='email'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              value={customer.email}
              name='email'
              onChange={(e) => setCustomer((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>Phone</label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              value={customer.phoneNumber}
              name='phone'
              onChange={(e) => setCustomer((prev) => ({ ...prev, phoneNumber: e.target.value }))}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>Home Adress</label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              value={customer.homeAddress}
              name='home_address'
              onChange={(e) => setCustomer((prev) => ({ ...prev, homeAddress: e.target.value }))}
              required
            />
          </div>
          {type === 'Edit' && (
            <div className='mb-4 flex justify-between'>
              <label className='block text-gray-700 dark:text-gray-300'>Change Password</label>
              <Switch size='small' value={isChangePassword} onChange={setIsChangePassword} />
            </div>
          )}
          {isChangePassword === true && type === 'Edit' ? (
            <div className='mb-4'>
              <label className='block text-gray-700 dark:text-gray-300'>Password</label>
              <div className='flex items-center justify-end'>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 pr-10'
                  name='password'
                  onChange={(e) => setCustomer((prev) => ({ ...prev, password: e.target.value }))}
                  required={type !== 'Edit'}
                />
                <button
                  type='button'
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  className='absolute mr-3'
                >
                  {isPasswordVisible ? (
                    <FaEyeSlash className='dark:text-gray-400' />
                  ) : (
                    <FaEye className='dark:text-gray-400' />
                  )}
                </button>
              </div>
            </div>
          ) : type === 'Add' ? (
            <div className='mb-4'>
              <label className='block text-gray-700 dark:text-gray-300'>Password</label>
              <div className='flex items-center justify-end'>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 pr-10'
                  name='password'
                  onChange={(e) => setCustomer((prev) => ({ ...prev, password: e.target.value }))}
                  required={type !== 'Edit'}
                />
                <button
                  type='button'
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  className='absolute mr-3'
                >
                  {isPasswordVisible ? (
                    <FaEyeSlash className='dark:text-gray-400' />
                  ) : (
                    <FaEye className='dark:text-gray-400' />
                  )}
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className='flex justify-end'>
            <button
              type='button'
              className='bg-gray-500 text-white px-4 py-2 rounded mr-2'
              onClick={onClose}
            >
              Cancel
            </button>
            <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded'>
              {type === 'Add' ? 'Add' : 'Edit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
