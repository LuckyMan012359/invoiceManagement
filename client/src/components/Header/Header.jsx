import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setIsDarkMode } from "../../reducers/darkSlice";
import DropdownUser from "./DropdownUser";

function Header() {
    const { t, i18n } = useTranslation();
    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)
    const dispatch = useDispatch()
    const rootElementRef = useRef(document.documentElement);

    const toggleDarkMode = () => {
        dispatch(setIsDarkMode());
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        if (isDarkMode) {
            rootElementRef.current.classList.add("dark");
        } else {
            rootElementRef.current.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md py-4 transition-colors duration-300 border-b-0 dark:border-b-2">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800 dark:text-white">Invoice Management System</div>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <select
                        onChange={(e) => changeLanguage(e.target.value)}
                        className="bg-transparent text-gray-600 px-3 py-2 dark:text-gray-300 focus:outline-none border-b-2 border-transparent dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 dark:bg-gray-800"
                        defaultValue={i18n.language}
                    >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>

                    <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300 focus:outline-none">
                        {isDarkMode ? "☀️" : "🌙"}
                    </button>

                    <DropdownUser />
                </div>
            </div>
            <nav className="container mx-auto px-4 mt-5 flex space-x-4">
                <Link to="/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-gray-500">
                    {t('Dashboard')}
                </Link>
                <Link to="/transactions" className="text-gray-800 dark:text-gray-200 hover:text-gray-500">
                    {t('Transactions')}
                </Link>
                <Link to="/customers" className="text-gray-800 dark:text-gray-200 hover:text-gray-500">
                    {t('Customers')}
                </Link>
                <Link to="/suppliers" className="text-gray-800 dark:text-gray-200 hover:text-gray-500">
                    {t('Suppliers')}
                </Link>
            </nav>
        </header>
    );
}

export default Header;