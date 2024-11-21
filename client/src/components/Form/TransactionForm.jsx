import Datepicker from 'react-tailwindcss-datepicker';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const TransactionForm = ({ customers, suppliers, showTransactionForm, onClose }) => {
  const { i18n } = useTranslation();
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [transactionDate] = e.target;
    const { customerId, supplierId, transactionType, amount, notes, attachments } = e.target;

    const rawDate = transactionDate.value;
    const [day, month, year] = rawDate.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    const transactionData = {
      amount: amount.value,
      attachments: attachments.files,
      customer_id: customerId.value,
      notes: notes.value,
      supplier_id: supplierId.value,
      transaction_date: formattedDate,
      transaction_type: transactionType.value,
    };
    console.log(transactionData);
    const resposne = await axiosInstance('/create_transaction', 'post', transactionData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(resposne.data);
  };

  if (!showTransactionForm) return;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg h-[80%] overflow-y-auto scrollbar-transparent'>
        <h2 className='text-2xl font-bold mb-4 dark:text-white'>Add New Customer</h2>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300 dark:text-gray-300'>
              Date
            </label>
            <Datepicker
              name='transactionDate'
              i18n={i18n.language}
              value={date}
              onChange={handleDateChange}
              asSingle={true}
              useRange={false}
              placeholder='Select Date'
              displayFormat={'DD/MM/YYYY'}
              inputClassName='relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border dark:bg-gray-700 dark:border dark:border-white dark:text-white/80 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>Customer</label>
            <div className='relative'>
              <select
                name='customerId'
                className='block appearance-none w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-white rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
              >
                <option value='' disabled>
                  Select a customer
                </option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M5.5 8.5L10 13l4.5-4.5H5.5z' />
                </svg>
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300 mb-2'>Supplier</label>
            <div className='relative'>
              <select
                name='supplierId'
                className='block appearance-none w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-white rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
              >
                <option value='' disabled>
                  Select a supplier
                </option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M5.5 8.5L10 13l4.5-4.5H5.5z' />
                </svg>
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>Transaction</label>
            <select
              name='transactionType'
              className='block appearance-none w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-white rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
            >
              <option value='' disabled>
                Select a Transaction Type
              </option>
              <option value='invoice'>INVOICE</option>
              <option value='payment'>PAYMENTS</option>
              <option value='return'>RETURN</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>Amount</label>
            <input
              type='number'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              name='amount'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>Notes</label>
            <textarea
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              name='notes'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>Attachments</label>
            <input
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              type='file'
              multiple='multiple'
              accept='image/*, application/pdf'
              name='attachments'
              required
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              className='bg-gray-500 text-white px-4 py-2 rounded mr-2'
              onClick={onClose}
            >
              Cancel
            </button>
            <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded'>
              {/* {type === "Add" ? "Add" : "Edit"} */}
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
