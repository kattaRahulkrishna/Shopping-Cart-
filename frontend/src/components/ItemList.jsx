import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from './Navbar';
import { Plus, Check } from 'lucide-react';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [addingId, setAddingId] = useState(null);

    useEffect(() => {
        fetchItems();
        updateCartCount();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await api.get('/items');
            setItems(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const updateCartCount = async () => {
        try {
            const res = await api.get('/carts/mine');
            setCartCount(res.data.items ? res.data.items.length : 0);
        } catch (err) {
            console.error(err);
        }
    };

    const addToCart = async (itemId) => {
        setAddingId(itemId);
        try {
            await api.post('/carts', { item_id: itemId });
            await updateCartCount();
            setTimeout(() => setAddingId(null), 1000); // Show checkmark for 1s
        } catch (err) {
            console.error(err);
            alert('Error adding to cart');
            setAddingId(null);
        }
    };

    const handleCheckout = async () => {
        try {
            await api.post('/orders');
            alert('Order successful! Thank you for your purchase.');
            updateCartCount();
        } catch (err) {
            console.error(err);
            alert(err.response?.data || 'Error checking out');
        }
    };

    const showCart = async () => {
        try {
            const res = await api.get('/carts/mine');
            const cartItems = res.data.items || [];
            if (cartItems.length === 0) {
                alert(`Cart ID: ${res.data._id}\n\nYour cart is empty.`);
            } else {
                const itemsList = cartItems.map(i => `- ${i.name} ($${i.price})`).join('\n');
                alert(`Cart ID: ${res.data._id}\n\nItems:\n${itemsList}\n\n[Click OK to Checkout in "Checkout"]`);
            }
        } catch (err) {
            alert('Error fetching cart');
        }
    };

    const showOrderHistory = async () => {
        try {
            const res = await api.get('/orders/mine');
            if (res.data.length === 0) {
                alert('No past orders found.');
                return;
            }
            const orders = res.data.map(o => `Order #${o._id.slice(-6)}: ${o.items.length} items`).join('\n');
            alert(`Order History:\n${orders}`);
        } catch (err) {
            alert('Error fetching orders');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            <Navbar
                cartCount={cartCount}
                onShowCart={showCart}
                onShowHistory={showOrderHistory}
                onLogout={handleLogout}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Promo Banner */}
                <div className="bg-white rounded-2xl p-8 mb-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Summer Collection</h2>
                        <p className="text-gray-500 max-w-lg">
                            Upgrade your wardrobe with our premium selection of urban wear. Limited time offer on new arrivals.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <button onClick={handleCheckout} className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-colors shadow-lg shadow-gray-900/20">
                            Checkout Now
                        </button>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-6">Trending Now</h3>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B6B]"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <div key={item._id} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                <div className="h-64 overflow-hidden relative bg-gray-100">
                                    {/* Image with fallback */}
                                    <img
                                        src={item.image || "https://via.placeholder.com/500?text=Product"}
                                        alt={item.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Quick add button overlay */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">

                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.status}</p>
                                        </div>
                                        <span className="text-lg font-bold text-[#FF6B6B]">${item.price}</span>
                                    </div>

                                    <button
                                        onClick={() => addToCart(item._id)}
                                        disabled={addingId === item._id}
                                        className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${addingId === item._id
                                                ? 'bg-green-500 text-white'
                                                : 'bg-white border-2 border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white'
                                            }`}
                                    >
                                        {addingId === item._id ? (
                                            <>
                                                <Check size={20} />
                                                <span>Added</span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={20} />
                                                <span>Add to Cart</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ItemList;
