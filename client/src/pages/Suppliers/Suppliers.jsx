import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineReport } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import SupplierForm from "../../components/Form/SupplierForm";

export const Suppliers = () => {
    const { t } = useTranslation();
    const [type, setType] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const [supplier, setSupplier] = useState({
        id: 0,
        name: "",
        email: "",
        phone: "",
        home_address: "",
        total_purchases: 0,
        total_payments: 0,
        balance: 0
    });
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [suppliersPerPage, setSuppliersPerPage] = useState(15);
    const [showSupplierForm, setShowSupplierForm] = useState(false);
    const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);

    useEffect(() => {
        const fetchData = async () =>{
            const response = await axiosInstance('/get_suppliers', 'get');
            setSuppliers(response.data);
            setFilteredSuppliers(response.data)
        }

        fetchData();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let updatedSuppliers;
        if(type === "Add"){
            const response = await axiosInstance('/add_supplier', 'post', supplier);
            toast.success("Customer added successfully!");
            updatedSuppliers = [...suppliers, response.data];
            setSuppliers(updatedSuppliers);
        }else{
            const response = await axiosInstance('/update_supplier', 'post', supplier);
            toast.success("Customer updated successfully!")
            updatedSuppliers = suppliers.map (c => c.id === response.data.id ? response.data : c)
            setSuppliers(updatedSuppliers);
        }
        setFilteredSuppliers(updatedSuppliers);
        resetForm();
        setShowSupplierForm(false);
    };

    const resetForm = () => {
        setSupplier({
            id: 0,
            name: "",
            email: "",
            phone: "",
            home_address: "",
            total_purchases: 0,
            total_payments: 0,
            balance: 0
        });
    };

    const deleteSupplier = async (deleteSupplierID) => {
        const response = await axiosInstance(`/delete_supplier/${deleteSupplierID}`, 'delete');
        if(response.status === 200){
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message);
        }

        const updatedSuppliers = suppliers.filter(supplier => supplier.id !== deleteSupplierID);
        setSuppliers(updatedSuppliers);
        setFilteredSuppliers(updatedSuppliers);
    };

    const filterSuppliers = (e) => {
        setKeyword(e.target.value);
        const keywordLower = e.target.value.toLowerCase();
        const filtered = suppliers.filter(supplier =>
            supplier.name.toLowerCase().includes(keywordLower)
        );
        setFilteredSuppliers(filtered);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredSuppliers.length / suppliersPerPage) || 1;
    const indexOfLastSupplier = currentPage * suppliersPerPage;
    const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
    const currentSuppliers = filteredSuppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);

    return (
        <div className="h-screen p-6 bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6 dark:bg-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">{t('Suppliers per Page')}</label>
                        <select
                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                            value={suppliersPerPage}
                            onChange={(e) => setSuppliersPerPage(Number(e.target.value))}
                        >
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-gray-700 dark:text-gray-300">{t('Keyword')}</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                            placeholder={t('Filter by keyword')}
                            value={keyword}
                            onChange={filterSuppliers}
                        />
                    </div>
                    <div className="hidden lg:block"></div>
                    <div className="hidden lg:block"></div>
                    <div className="flex items-end justify-end">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                            onClick={() => {
                                setShowSupplierForm(true);
                                setType("Add")
                            }}
                        >
                            {t('Add New Supplier')}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left bg-white rounded-lg dark:bg-gray-800">
                        <thead>
                            <tr className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
                                <th className="py-2 px-4 text-left">{t('Name')}</th>
                                <th className="py-2 px-4 text-left">{t('Total Purchases')}</th>
                                <th className="py-2 px-4 text-left">{t('Total Payments')}</th>
                                <th className="py-2 px-4 text-left">{t('Balance')}</th>
                                <th className="py-2 px-4 text-left">{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSuppliers.map((supplier) => (
                                <tr key={supplier.id} className="border-b dark:border-gray-600 dark:text-gray-300">
                                    <td className="py-2 px-4">{supplier.name}</td>
                                    <td className="py-2 px-4">{supplier.total_purchases}</td>
                                    <td className="py-2 px-4">{supplier.total_payments}</td>
                                    <td className="py-2 px-4">{supplier.balance}</td>
                                    <td className="py-2 px-4">
                                        <button 
                                            className="text-gray-800 py-1 rounded mr-1 dark:text-white" 
                                            onClick={() => {
                                                setType("Edit");
                                                setShowSupplierForm(true)
                                                setSupplier(supplier);
                                            }}
                                        >
                                            <FaRegEdit />
                                        </button>
                                        <button 
                                            className="text-gray-800 py-1 rounded mr-1 dark:text-white" 
                                            onClick={() => deleteSupplier(supplier.id)}
                                        >
                                            <MdDelete />
                                        </button>
                                        <button 
                                            className="text-gray-800 py-1 rounded dark:text-white"
                                        >
                                            <MdOutlineReport />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-between">
                    <button
                        className={`bg-gray-300 text-gray-700 px-4 py-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {t('Previous')}
                    </button>
                    <button
                        className={`bg-gray-300 text-gray-700 px-4 py-2 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {t('Next')}
                    </button>
                </div>
            </div>
            <SupplierForm 
                showSupplierForm={showSupplierForm} 
                onClose={() => {
                    setShowSupplierForm(false);
                    resetForm()
                }} 
                onSubmit={handleSubmit} 
                supplier={supplier} 
                setSupplier={setSupplier}
                type={type}
            />
        </div>
    );
};
