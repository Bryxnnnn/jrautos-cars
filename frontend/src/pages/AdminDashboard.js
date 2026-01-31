import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, LogOut, Car, Eye, EyeOff, MessageSquare, X, Save } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const { token, logout, isAuthenticated, loading: authLoading } = useAdmin();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('vehicles');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    brand: '',
    bodyType: '',
    engine: '',
    fuel: '',
    transmission: '',
    description_es: '',
    description_en: '',
    images: '',
    cover_image: '',
  });

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  );

  const fetchData = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const [vehiclesRes, contactsRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/admin/vehicles`, { headers }),
        axios.get(`${BACKEND_URL}/api/admin/contacts`, { headers }),
      ]);
      setVehicles(vehiclesRes.data);
      setContacts(contactsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [token, headers]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (token) fetchData();
  }, [token, fetchData]);


  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      year: '',
      brand: '',
      bodyType: '',
      engine: '',
      fuel: '',
      transmission: '',
      description_es: '',
      description_en: '',
      images: '',
      cover_image: '',
    });
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      const imagesArray = formData.images.split('\n').filter(url => url.trim());
      const payload = {
        ...formData,
        images: imagesArray,
        cover_image: formData.cover_image || imagesArray[0] || '',
      };
      await axios.post(`${BACKEND_URL}/api/admin/vehicles`, payload, { headers });
      setShowAddModal(false);
      resetForm();
      fetchData();
    } catch (err) {
      console.error('Error adding vehicle:', err);
      alert('Error al agregar vehículo');
    }
  };

  const handleEditClick = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      year: vehicle.year,
      brand: vehicle.brand,
      bodyType: vehicle.bodyType,
      engine: vehicle.engine,
      fuel: vehicle.fuel,
      transmission: vehicle.transmission,
      description_es: vehicle.description_es,
      description_en: vehicle.description_en,
      images: vehicle.images.join('\n'),
      cover_image: vehicle.cover_image,
    });
    setShowEditModal(true);
  };

  const handleUpdateVehicle = async (e) => {
    e.preventDefault();
    try {
      const imagesArray = formData.images.split('\n').filter(url => url.trim());
      const payload = {
        ...formData,
        images: imagesArray,
        cover_image: formData.cover_image || imagesArray[0] || '',
      };
      await axios.put(`${BACKEND_URL}/api/admin/vehicles/${editingVehicle.id}`, payload, { headers });
      setShowEditModal(false);
      setEditingVehicle(null);
      resetForm();
      fetchData();
    } catch (err) {
      console.error('Error updating vehicle:', err);
      alert('Error al actualizar vehículo');
    }
  };

  const handleToggleAvailability = async (vehicle) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/admin/vehicles/${vehicle.id}`,
        { available: !vehicle.available },
        { headers }
      );
      fetchData();
    } catch (err) {
      console.error('Error toggling availability:', err);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (!window.confirm('¿Estás seguro de eliminar este vehículo? Esta acción no se puede deshacer.')) {
      return;
    }
    try {
      await axios.delete(`${BACKEND_URL}/api/admin/vehicles/${vehicleId}`, { headers });
      fetchData();
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      alert('Error al eliminar vehículo');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <header className="bg-black/50 border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="font-heading text-xl font-bold text-white">Admin Panel</h1>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400 text-sm">J.R Autos</span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="/" 
              target="_blank"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Ver sitio →
            </a>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'vehicles'
                  ? 'border-white text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Car className="w-4 h-4 inline mr-2" />
              Vehículos ({vehicles.length})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'contacts'
                  ? 'border-white text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Mensajes ({contacts.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'vehicles' && (
          <>
            {/* Add Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Inventario de Vehículos</h2>
              <Button
                onClick={() => setShowAddModal(true)}
                className="rounded-full bg-white text-black hover:bg-gray-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Vehículo
              </Button>
            </div>

            {/* Vehicles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`bg-white/5 border rounded-xl overflow-hidden ${
                    vehicle.available ? 'border-white/10' : 'border-red-500/30 opacity-60'
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-video">
                    <img
                      src={vehicle.cover_image || vehicle.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                    {!vehicle.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          VENDIDO
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">{vehicle.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {vehicle.year} • {vehicle.brand} • {vehicle.bodyType}
                    </p>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleToggleAvailability(vehicle)}
                        variant="outline"
                        size="sm"
                        className={`flex-1 rounded-lg border-white/20 bg-transparent hover:bg-white/10 ${
                          vehicle.available ? 'text-green-400' : 'text-gray-400'
                        }`}
                      >
                        {vehicle.available ? (
                          <><Eye className="w-4 h-4 mr-1" /> Visible</>
                        ) : (
                          <><EyeOff className="w-4 h-4 mr-1" /> Oculto</>
                        )}
                      </Button>
                      <Button
                        onClick={() => handleEditClick(vehicle)}
                        variant="outline"
                        size="sm"
                        className="rounded-lg border-white/20 bg-transparent text-white hover:bg-white/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        variant="outline"
                        size="sm"
                        className="rounded-lg border-red-500/30 bg-transparent text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {vehicles.length === 0 && (
              <div className="text-center py-16">
                <Car className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No hay vehículos todavía</p>
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="mt-4 rounded-full bg-white text-black hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar el primero
                </Button>
              </div>
            )}
          </>
        )}

        {activeTab === 'contacts' && (
          <>
            <h2 className="text-xl font-semibold text-white mb-6">Mensajes de Contacto</h2>
            
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-white">{contact.name}</h3>
                      <p className="text-gray-400 text-sm">{contact.email}</p>
                      {contact.phone && (
                        <p className="text-gray-400 text-sm">{contact.phone}</p>
                      )}
                    </div>
                    <span className="text-gray-500 text-xs">
                      {new Date(contact.created_at).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-gray-300 bg-white/5 p-4 rounded-lg">{contact.message}</p>
                </div>
              ))}

              {contacts.length === 0 && (
                <div className="text-center py-16">
                  <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No hay mensajes todavía</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 p-6 flex justify-between items-center">
              <h2 className="font-heading text-xl font-semibold text-white">
                {showAddModal ? 'Agregar Vehículo' : 'Editar Vehículo'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setEditingVehicle(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={showAddModal ? handleAddVehicle : handleUpdateVehicle} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Nombre *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="Nissan Frontier Pro-4X"
                    required
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Año *</Label>
                  <Input
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="2015"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Marca *</Label>
                  <Input
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="Nissan"
                    required
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Carrocería *</Label>
                  <Input
                    value={formData.bodyType}
                    onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="Pick-up, SUV, Sedán, Hatchback"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Motor *</Label>
                  <Input
                    value={formData.engine}
                    onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="4 Cilindros"
                    required
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Combustible *</Label>
                  <Input
                    value={formData.fuel}
                    onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="Gasolina"
                    required
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Transmisión *</Label>
                  <Input
                    value={formData.transmission}
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="Automático"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">Descripción (Español) *</Label>
                <Textarea
                  value={formData.description_es}
                  onChange={(e) => setFormData({ ...formData, description_es: e.target.value })}
                  className="bg-white/5 border-white/10 text-white resize-none"
                  rows={3}
                  placeholder="Descripción del vehículo en español..."
                  required
                />
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">Descripción (Inglés) *</Label>
                <Textarea
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  className="bg-white/5 border-white/10 text-white resize-none"
                  rows={3}
                  placeholder="Vehicle description in English..."
                  required
                />
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">
                  URLs de Imágenes * (una por línea)
                </Label>
                <Textarea
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="bg-white/5 border-white/10 text-white resize-none font-mono text-sm"
                  rows={5}
                  placeholder="https://ejemplo.com/imagen1.jpg&#10;https://ejemplo.com/imagen2.jpg&#10;https://ejemplo.com/imagen3.jpg"
                  required
                />
                <p className="text-gray-500 text-xs mt-1">La primera imagen será la portada</p>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setEditingVehicle(null);
                    resetForm();
                  }}
                  className="flex-1 rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-full bg-white text-black hover:bg-gray-200"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {showAddModal ? 'Agregar' : 'Guardar'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
