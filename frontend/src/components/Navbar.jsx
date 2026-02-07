import { useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut, ShoppingCart, Clock, Search } from 'lucide-react';

const Navbar = ({ cartCount, onShowCart, onShowHistory, onLogout }) => {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 rounded-lg bg-[#FF6B6B] text-white flex items-center justify-center">
                            <ShoppingBag size={18} fill="currentColor" />
                        </div>
                        {/* Branding Removed as per request */}
                    </div>

                    {/* Search Bar (Hidden on mobile) */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#FF6B6B] focus:ring-1 focus:ring-[#FF6B6B] sm:text-sm transition-colors"
                            placeholder="Search products, brands and categories..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onShowHistory}
                            className="p-2 text-gray-500 hover:text-[#FF6B6B] hover:bg-orange-50 rounded-full transition-colors relative group cursor-pointer"
                            title="Order History"
                        >
                            <Clock size={22} />
                        </button>

                        <button
                            onClick={onShowCart}
                            className="p-2 text-gray-500 hover:text-[#FF6B6B] hover:bg-orange-50 rounded-full transition-colors relative cursor-pointer"
                        >
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[#FF6B6B] rounded-full border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <div className="h-6 w-px bg-gray-200 mx-1"></div>

                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
