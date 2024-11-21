import { useTranslation } from 'react-i18next';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { MdOutlineReport } from 'react-icons/md';

export const Transactions = () => {
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const transactionData = [
    {
      id: 1,
      date: '4/12/2020',
      customer: 'John Doe',
      supplier: 'ABC Supplies',
      transaction: 'Invoice',
      grandTotal: '4,000,000',
      balance: '4,000,000',
      note: '',
      attachments: '',
    },
    {
      id: 2,
      date: '4/12/2020',
      customer: 'John Doe',
      supplier: 'ABC Supplies',
      transaction: 'Pay',
      grandTotal: '1,130,500',
      balance: '2,869,500',
      note: '',
      attachments: '',
    },
    {
      id: 3,
      date: '4/12/2020',
      customer: 'John Doe',
      supplier: 'ABC Supplies',
      transaction: 'Return',
      grandTotal: '2,257,900',
      balance: '611,500',
      note: '',
      attachments: '',
    },
  ];

  return (
    <div className='h-screen px-[100px] py-[50px] bg-gray-100 dark:bg-gray-900'>
      <div className='mx-auto bg-white shadow-md rounded-lg p-6 space-y-6 dark:bg-gray-800'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          <div>
            <label className='block text-gray-700 dark:text-gray-300'>
              {t('Records per Page')}
            </label>
            <select className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'>
              <option value='15'>15</option>
              <option value='30'>30</option>
              <option value='50'>50</option>
            </select>
          </div>
          <div>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Customer')}</label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              placeholder='Filter by customer'
            />
          </div>
          <div>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Supplier')}</label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              placeholder='Filter by supplier'
            />
          </div>
          <div>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Keyword')}</label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              placeholder='Filter by keyword'
            />
          </div>
          <div>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Date')}</label>
            <Datepicker
              i18n={i18n.language}
              value={date}
              onChange={handleDateChange}
              asSingle={true}
              useRange={false}
              placeholder='Select Date'
              displayFormat={'DD/MM/YYYY'}
              showFooter={true}
              containerClassName='relative'
              popoverDirection='down'
              inputClassName='transition-all duration-300 py-2.5 pl-4 pr-14 w-full border dark:bg-gray-700 dark:border dark:border-white dark:text-white/80 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20'
            />
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none'>
            {t('Search')}
          </button>
          <button className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none'>
            {t('Reset')}
          </button>
          <button className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none'>
            {t('Add New Record')}
          </button>
          <button className='px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none'>
            {t('Export to Excel')}
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-left bg-white rounded-lg dark:bg-gray-800'>
            <thead>
              <tr className='text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700'>
                <th className='p-3'>#</th>
                <th className='p-3'>{t('Date')}</th>
                <th className='p-3'>{t('Customer')}</th>
                <th className='p-3'>{t('Supplier')}</th>
                <th className='p-3'>{t('Transaction')}</th>
                <th className='p-3'>{t('Grand Total')}</th>
                <th className='p-3'>{t('Balance')}</th>
                <th className='p-3'>{t('Note')}</th>
                <th className='p-3'>{t('Attachments')}</th>
                <th className='p-3'>{t('Action')}</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((item) => (
                <tr key={item.id} className='border-b dark:border-gray-600 dark:text-gray-300'>
                  <td className='p-3'>{item.id}</td>
                  <td className='p-3'>{item.date}</td>
                  <td className='p-3'>{item.customer}</td>
                  <td className='p-3'>{item.supplier}</td>
                  <td className='p-3'>{item.transaction}</td>
                  <td className='p-3'>{item.grandTotal}</td>
                  <td className='p-3'>{item.balance}</td>
                  <td className='p-3'>{item.note}</td>
                  <td className='p-3'>{item.attachments}</td>
                  <td className='py-2 px-4'>
                    <button className='text-gray-800 py-1 rounded mr-1 dark:text-white'>
                      <FaRegEdit />
                    </button>
                    <button className='text-gray-800 py-1 rounded mr-1 dark:text-white'>
                      <MdDelete />
                    </button>
                    <button className='text-gray-800 py-1 rounded dark:text-white'>
                      <MdOutlineReport />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
