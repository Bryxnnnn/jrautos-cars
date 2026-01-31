import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, LogIn, AlertCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/admin/login`, { password });
      login(response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Contraseña incorrecta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-2">J.R Autos - Acceso Administrativo</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="password" className="text-gray-300 mb-2 block">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="admin-password-input"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30"
                placeholder="Ingresa la contraseña"
                required
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              data-testid="admin-login-btn"
              className="w-full rounded-full bg-white text-black hover:bg-gray-200 py-6 font-semibold"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          {/* Back link */}
          <div className="mt-6 text-center">
            <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
              ← Volver al sitio
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
