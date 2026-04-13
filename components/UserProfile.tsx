import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { ArrowLeft, User, Lock, LogOut, X, CheckCircle2 } from 'lucide-react';
import { Screen } from '../App';

interface UserProfileProps {
  navigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function UserProfile({ navigate, onLogout }: UserProfileProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPasswordModal(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 2000);
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      onLogout();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 pt-6 pb-12">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('dashboard')}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-white flex-1">Perfil de Usuario</h1>
        </div>

        {/* User Avatar and Info */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border-4 border-white/20">
            <User size={48} className="text-white" />
          </div>
          <h2 className="text-white mb-1">Juan Pérez</h2>
          <p className="text-gray-300 text-sm mb-2">Administrador</p>
          <div className="px-4 py-1 bg-white/10 backdrop-blur-md rounded-lg">
            <p className="text-white text-sm">juan.perez@parkingapp.com</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6 pb-6 overflow-y-auto -mt-8">
        <div className="space-y-4">
          {/* User Info Card */}
          <Card>
            <h3 className="text-gray-900 mb-4">Información del Usuario</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Nombre completo</span>
                <span className="text-gray-900">Juan Pérez</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Email</span>
                <span className="text-gray-900 text-sm">juan.perez@parkingapp.com</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Rol</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                  Administrador
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Miembro desde</span>
                <span className="text-gray-900">Enero 2024</span>
              </div>
            </div>
          </Card>

          {/* Activity Stats */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
            <h3 className="text-blue-900 mb-4">Estadísticas de Actividad</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-blue-700 text-sm mb-1">Entradas Registradas</p>
                <p className="text-blue-900 text-2xl">1,234</p>
              </div>
              <div>
                <p className="text-blue-700 text-sm mb-1">Salidas Registradas</p>
                <p className="text-blue-900 text-2xl">1,189</p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              fullWidth
              size="lg"
              variant="secondary"
              onClick={() => setShowPasswordModal(true)}
            >
              <Lock size={20} />
              Cambiar Contraseña
            </Button>

            <Button
              fullWidth
              size="lg"
              variant="danger"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full max-w-[360px] p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Cambiar Contraseña</h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                label="Contraseña Actual"
                type="password"
                placeholder="Ingresa tu contraseña actual"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                required
              />

              <Input
                label="Nueva Contraseña"
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
              />

              <Input
                label="Confirmar Nueva Contraseña"
                type="password"
                placeholder="Confirma tu nueva contraseña"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
              />

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="secondary" fullWidth onClick={() => setShowPasswordModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit" fullWidth>
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-8 max-w-xs w-full text-center animate-scale-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">¡Contraseña Actualizada!</h3>
            <p className="text-gray-600">
              Tu contraseña ha sido cambiada exitosamente.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
