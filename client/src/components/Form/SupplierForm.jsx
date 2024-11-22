const SupplierForm = ({ showSupplierForm, onClose, onSubmit, supplier, setSupplier, type }) => {
  if (!showSupplierForm) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4 dark:text-white'>Add New Supplier</h2>
        <form onSubmit={onSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300 dark:text-gray-300'>
              Name
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              value={supplier.name}
              name='name'
              onChange={(e) => setSupplier((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>Address</label>
            <input
              type='email'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              value={supplier.email}
              name='email'
              onChange={(e) => setSupplier((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>Phone</label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              value={supplier.phoneNumber}
              name='phone'
              onChange={(e) => setSupplier((prev) => ({ ...prev, phoneNumber: e.target.value }))}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300'>Home Adress</label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300'
              value={supplier.homeAddress}
              name='home_address'
              onChange={(e) => setSupplier((prev) => ({ ...prev, homeAddress: e.target.value }))}
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
              {type === 'Add' ? 'Add' : 'Edit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
