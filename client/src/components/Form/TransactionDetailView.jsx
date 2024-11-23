import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { Input } from 'antd';
const { TextArea } = Input;

const TransactionDetailView = ({ showTransactionDetail, onClose, transaction, attachments }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    customerId: '',
    supplierId: '',
    transactionType: '',
    amount: '',
    notes: '',
    date: '',
    attachments: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);

  useEffect(() => {
    setFormData({
      customerId: transaction.customer || '',
      supplierId: transaction.supplier || '',
      transactionType: transaction.transaction || '',
      amount: transaction.amount || 0,
      balance: transaction.balance || 0,
      notes: transaction.note || '',
      date: transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : '',
      attachments: attachments || [],
    });
  }, [transaction, attachments]);

  const showModal = (attachment) => {
    setSelectedAttachment(attachment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAttachment(null);
  };

  if (!showTransactionDetail) return null;

  return (
    <>
      <div className='fixed h-screen inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 '>
        <div className='bg-white h-[95%] dark:bg-gray-800 shadow-lg p-6 w-full max-w-lg overflow-y-auto'>
          <h2 className='text-2xl font-bold mb-4 dark:text-white'>{t('Transaction Detail')}</h2>

          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Date')}</label>
            <input
              type='text'
              value={formData.date}
              readOnly
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 mt-[10px]'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Customer')}</label>
            <input
              type='text'
              value={formData.customerId}
              readOnly
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 mt-[10px]'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Supplier')}</label>
            <input
              type='text'
              value={formData.supplierId}
              readOnly
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 mt-[10px]'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Transaction')}</label>
            <input
              type='text'
              value={formData.transactionType}
              readOnly
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 mt-[10px]'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Amount')}</label>
            <input
              type='number'
              value={formData.amount}
              readOnly
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 mt-[10px]'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Balance')}</label>
            <input
              type='number'
              value={formData.balance}
              readOnly
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 mt-[10px]'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Notes')}</label>
            <TextArea
              autoSize={{ minRows: 6 }}
              value={formData.notes}
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 mt-[10px]'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>{t('Attachments')}</label>
            <div className='flex flex-col gap-4 mt-[10px]'>
              {formData.attachments.length > 0 ? (
                formData.attachments.map((attachment, index) => {
                  const fileType = attachment.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image';
                  return (
                    <div
                      key={index}
                      className='border rounded-md p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-300'
                      onClick={() => showModal(attachment)} // Open modal with clicked attachment
                    >
                      {fileType === 'image' ? (
                        <img
                          src={`http://localhost:5000/${attachment}`}
                          alt={`Attachment ${index}`}
                          className='w-full h-[160px] object-cover rounded-md'
                        />
                      ) : (
                        <div>{`Attachment ${index}`}(PDF)</div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className='text-gray-500 dark:text-gray-400'>{t('No attachments available.')}</p>
              )}
            </div>
          </div>

          <div className='flex justify-end'>
            <button className='bg-gray-500 text-white px-4 py-2 rounded' onClick={onClose}>
              {t('Close')}
            </button>
          </div>
        </div>
      </div>

      <Modal
        title={t('Attachment Preview')}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={900}
        className='top-[40px]'
      >
        {selectedAttachment ? (
          selectedAttachment.toLowerCase().endsWith('.pdf') ? (
            <iframe
              src={`http://localhost:5000/${selectedAttachment}`}
              className='w-full h-[800px] rounded-md'
              title={`title-${selectedAttachment}`}
            />
          ) : (
            <img
              src={`http://localhost:5000/${selectedAttachment}`}
              alt='Attachment Preview'
              className='w-full h-auto rounded-md'
            />
          )
        ) : (
          <p>{t('No attachment selected.')}</p>
        )}
      </Modal>
    </>
  );
};

export default TransactionDetailView;
