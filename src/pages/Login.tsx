import React, { useState } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Selamat datang kembali!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Gagal masuk dengan Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-10 md:p-12 text-center border border-slate-100">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
              <ShoppingBag size={36} />
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">ShoeWash Premium</h1>
          <p className="text-slate-500 mb-10">Layanan cuci sepatu modern & terpercaya. Masuk untuk mulai memesan.</p>
          
          <div className="space-y-4">
            <Button 
              onClick={handleGoogleLogin} 
              disabled={loading}
              className="w-full h-14 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center gap-3 font-bold shadow-sm transition-all"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              {loading ? 'Menghubungkan...' : 'Masuk dengan Google'}
            </Button>
            
            <p className="text-[10px] text-slate-400 mt-6 px-4">
              Dengan masuk, Anda menyetujui Syarat & Ketentuan serta Kebijakan Privasi ShoeWash Premium.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-center gap-2">
            <Link to="/" className="text-sm font-bold text-brand-primary flex items-center group">
              Kembali ke Beranda <ChevronRight className="ml-1 group-hover:translate-x-1 transition-all" size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
