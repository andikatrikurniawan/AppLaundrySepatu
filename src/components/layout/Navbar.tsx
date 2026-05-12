import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, ShoppingBag, Search, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { auth } from '../../lib/firebase';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang', path: '/about' },
    { name: 'Layanan', path: '/services' },
    { name: 'Tracking', path: '/tracking' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 h-20 shadow-sm' : 'bg-transparent h-24'
      }`}
    >
      <div className="h-full container mx-auto px-6 lg:px-12">
        <div className="h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg ring-4 ring-indigo-50 group-hover:rotate-12 transition-transform">
              K
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
              KICKSCLEAN<span className="text-brand-primary">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-brand-primary active:scale-95 ${
                  location.pathname === link.path ? 'text-brand-primary' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="font-bold text-brand-primary bg-indigo-50 hover:bg-indigo-100 rounded-full px-5">
                  Dashboard
                </Button>
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => auth.signOut()} className="font-bold hover:bg-slate-50 border-slate-200 rounded-full px-5">
                  Keluar
                </Button>
                <Link to="/booking">
                  <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 font-bold shadow-lg shadow-slate-200 active:scale-95 transition-all">
                    Pesan Sekarang
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="font-bold border-slate-200 rounded-full px-6 hover:bg-slate-50">
                    Masuk
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 font-bold shadow-lg shadow-slate-200 active:scale-95 transition-all">
                    Pesan Sekarang
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center gap-2">
             <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l-0 shadow-2xl">
                <div className="flex flex-col gap-8 mt-16 px-4">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-black text-xl">K</div>
                    <span className="text-xl font-bold tracking-tighter">KICKSCLEAN.</span>
                  </div>
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path} 
                      to={link.path}
                      className="text-2xl font-black tracking-tighter hover:text-brand-primary transition-colors uppercase"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-8 border-t border-slate-100 flex flex-col gap-4">
                    {user ? (
                      <>
                        <Link to="/booking">
                          <Button className="w-full bg-slate-900 text-white rounded-xl py-6 font-bold">Pesan Sekarang</Button>
                        </Link>
                        <Button variant="outline" className="w-full rounded-xl py-6 font-bold border-slate-200" onClick={() => auth.signOut()}>Keluar</Button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <Link to="/login">
                          <Button className="w-full bg-slate-900 text-white rounded-xl py-6 font-bold">Masuk / Daftar</Button>
                        </Link>
                        <Link to="/booking">
                          <Button variant="outline" className="w-full rounded-xl py-6 font-bold border-slate-200">Pesan Sekarang</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
