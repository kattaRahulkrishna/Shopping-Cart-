import { useState } from 'react';
import api from '../api';
import { ShoppingBag, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isRegistering ? '/users' : '/users/login';
            const res = await api.post(endpoint, { username, password });
            if (isRegistering) {
                alert('Registration successful! Please login.');
                setIsRegistering(false);
            } else {
                localStorage.setItem('token', res.data.token);
                setToken(res.data.token);
            }
        } catch (err) {
            if (err.response && err.response.status === 403) {
                alert('You cannot login on another device.');
            } else {
                alert(err.response?.data || 'An error occurred');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex min-h-[600px]">
                {/* Left Side - Hero Image */}
                <div className="hidden md:block w-1/2 relative">
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80"
                        alt="Fashion"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-12 text-white">
                        <h2 className="text-4xl font-bold mb-3">New Arrivals</h2>
                        <p className="text-white/90 text-lg">Discover the latest trends in urban fashion.</p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-10">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-[#FF6B6B] mb-6">
                                <ShoppingBag size={24} />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {isRegistering ? 'Create Account' : 'Welcome Back'}
                            </h1>
                            <p className="text-gray-500">
                                {isRegistering ? 'Join our community today' : 'Enter your details to access your account'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6B6B] focus:ring-1 focus:ring-[#FF6B6B] transition-all bg-gray-50 focus:bg-white outline-none"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6B6B] focus:ring-1 focus:ring-[#FF6B6B] transition-all bg-gray-50 focus:bg-white outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {!isRegistering && (
                                <div className="flex justify-end">
                                    <button type="button" className="text-sm font-medium text-[#FF6B6B] hover:text-[#fa5252]">
                                        Forgot Password?
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-3.5 px-4 bg-[#FF6B6B] hover:bg-[#fa5252] text-white font-semibold rounded-xl transition-all transform hover:scale-[1.01] shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 mt-2"
                            >
                                {isRegistering ? 'Sign Up' : 'Login'}
                                <ArrowRight size={20} />
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-500">
                            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                            <button
                                onClick={() => setIsRegistering(!isRegistering)}
                                className="ml-2 font-medium text-[#FF6B6B] hover:text-[#fa5252] hover:underline"
                            >
                                {isRegistering ? 'Sign In' : 'Sign Up'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
