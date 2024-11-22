import { useTranslation } from 'react-i18next';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import TransactionForm from '../../components/Form/TransactionForm';
import axiosInstance from '../../utils/axiosInstance';

import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { MdOutlineReport } from 'react-icons/md';
import { toast } from 'react-toastify';
import TransactionDetailView from '../../components/Form/TransactionDetailView';

export const Transactions = () => {
  const { t, i18n } = useTranslation();
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [type, setType] = useState('Add');
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [customer, setCustomer] = useState('');
  const [supplier, setSupplier] = useState('');
  const [keyword, setKeyword] = useState('');
  const [transactionData, setTransactionData] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [attachments, setAttachments] = useState([]);

  const [transaction, setTransaction] = useState({
    date: '',
    customer: '',
    supplier: '',
    transaction: '',
    amount: '',
    balance: '',
    note: '',
  });

  const [showTransactionDetail, setShowTransactionDetail] = useState(false);

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchSuppliersData = async () => {
      const response = await axiosInstance('/supplier/get_suppliers', 'get');
      setSuppliers(response.data.data);
    };
    const fetchCustomersData = async () => {
      const response = await axiosInstance('/customer/get_customers', 'get');
      setCustomers(response.data.data);
    };

    fetchCustomersData();
    fetchSuppliersData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const filterDate = date.endDate ? formatDate(date.endDate) : '';

      const response = await axiosInstance('/transaction/get_transactions', 'get', {
        customer: customer,
        supplier: supplier,
        keyword: keyword,
        date: filterDate,
        pageNum: currentPage,
        pageSize: transactionsPerPage,
      });

      setTotalPages(response.data.totalPage);
      console.log(response.data.transactions);
      setTransactionData(response.data.transactions);
    };
    fetchData();
  }, [isChanged, currentPage, transactionsPerPage]);

  const deleteTransaction = async (id) => {
    const response = await axiosInstance('/transaction/delete_transaction', 'delete', {
      transaction_id: id,
    });

    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.warning(response.data.message);
    }

    setIsChanged(!isChanged);
  };

  const resetFilter = () => {
    setCustomer('');
    setSupplier('');
    setKeyword('');
    setDate({
      startDate: '',
      endDate: '',
    });

    setIsChanged(!isChanged);
  };

  return (
    <div className='h-screen px-[100px] py-[50px] bg-gray-100 dark:bg-gray-900'>
      <div className='mx-auto bg-white shadow-md rounded-lg p-6 space-y-6 dark:bg-gray-800'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          <div>
            <label className='block text-gray-700 dark:text-gray-300'>
              {t('Records per Page')}
            </label>
            <select
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              onChange={(e) => setTransactionsPerPage(Number(e.target.value))}
            >
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
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
          <div>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Supplier')}</label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              placeholder='Filter by supplier'
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          </div>
          <div>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Keyword')}</label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              placeholder='Filter by keyword'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Date')}</label>
            <Datepicker
              name='transactionDate'
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
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none'
            onClick={() => {
              setIsChanged(!isChanged);
              setCurrentPage(1);
            }}
          >
            {t('Search')}
          </button>
          <button
            className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none'
            onClick={resetFilter}
          >
            {t('Reset')}
          </button>
          <button
            className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none'
            onClick={() => {
              setShowTransactionForm(true);
              setType('Add');
            }}
          >
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
                <th className='p-3'>{t('Amount')}</th>
                <th className='p-3'>{t('Balance')}</th>
                <th className='p-3'>{t('Note')}</th>
                <th className='p-3'>{t('Attachments')}</th>
                <th className='p-3'>{t('Action')}</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((item, index) => (
                <tr
                  key={item._id || `transaction-${index}`}
                  className='border-b dark:border-gray-600 dark:text-gray-300'
                >
                  <td className='p-3'>{index + 1 + transactionsPerPage * (currentPage - 1)}</td>
                  <td className='p-3'>
                    {(() => {
                      const date = new Date(item.transaction_date);
                      const formattedDate = date.toISOString().split('T')[0];
                      return formattedDate;
                    })()}
                  </td>
                  <td className='p-3'>
                    {item.customer.firstName} {item.customer.lastName}
                  </td>
                  <td className='p-3'>{item.supplier.name}</td>
                  <td className='p-3'>{item.transaction_type}</td>
                  <td className='p-3'>{item.amount}</td>
                  <td className='p-3'>{item.balance}</td>
                  <td className='p-3'>{item.notes}</td>
                  <td className='p-3 flex flex-col'>
                    {item.attachments.length > 0
                      ? item.attachments.map((attachment, index) => {
                          // Extract file name from the attachment path
                          const fileName = attachment.split('/').pop(); // Gets the file name from the path
                          const fileType = fileName.split('.').pop(); // Extracts the file extension

                          return (
                            <div key={index} className='text-blue-500'>
                              {`Attachment-${index}(${fileType.toUpperCase()})`}{' '}
                            </div>
                          );
                        })
                      : 'No attachments'}
                  </td>
                  <td className='py-2 px-4'>
                    <button
                      className='text-gray-800 py-1 rounded mr-1 dark:text-white'
                      onClick={() => {
                        setShowTransactionForm(true);
                        setType('Edit');
                        setTransaction({
                          date: item.transaction_date,
                          customer: item.customer._id,
                          supplier: item.supplier._id,
                          transaction: item.transaction_type,
                          amount: item.amount,
                          balance: item.balance,
                          note: item.notes,
                        });
                        setTransactionId(item._id);
                      }}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className='text-gray-800 py-1 rounded mr-1 dark:text-white'
                      onClick={() => {
                        deleteTransaction(item._id);
                      }}
                    >
                      <MdDelete />
                    </button>
                    <button
                      className='text-gray-800 py-1 rounded dark:text-white'
                      onClick={() => {
                        setTransaction({
                          date: item.transaction_date,
                          customer: item.customer.firstName + ' ' + item.customer.lastName,
                          supplier: item.supplier.name,
                          transaction: item.transaction_type,
                          amount: item.amount,
                          balance: item.balance,
                          note: item.notes,
                        });
                        setShowTransactionDetail(true);
                        setAttachments(item.attachments);
                      }}
                    >
                      <MdOutlineReport />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='mt-4 flex justify-between'>
          <button
            className={`bg-gray-300 text-gray-700 px-4 py-2 rounded ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t('Previous')}
          </button>
          <button
            className={`bg-gray-300 text-gray-700 px-4 py-2 rounded ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t('Next')}
          </button>
        </div>
      </div>

      <TransactionForm
        customers={customers}
        suppliers={suppliers}
        showTransactionForm={showTransactionForm}
        setShowTransactionForm={setShowTransactionForm}
        transaction={transaction}
        type={type}
        onClose={() => setShowTransactionForm(false)}
        setIsChanged={setIsChanged}
        isChanged={isChanged}
        transactionId={transactionId}
      />

      <TransactionDetailView
        showTransactionDetail={showTransactionDetail}
        onClose={() => {
          setShowTransactionDetail(false);
        }}
        transaction={transaction}
        attachments={attachments}
      />
    </div>
  );
};
