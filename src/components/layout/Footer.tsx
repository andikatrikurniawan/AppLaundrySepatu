import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white">
                <ShoppingBag size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ShoeWash<span className="text-brand-primary">Premium</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Solusi perawatan sepatu premium dengan teknologi pembersihan modern. Kami mengembalikan kilau sepatu Anda seperti baru.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Layanan Kami</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services" className="hover:text-brand-primary transition-colors">Deep Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-brand-primary transition-colors">Unyellowing</Link></li>
              <li><Link to="/services" className="hover:text-brand-primary transition-colors">Repaint & Restoration</Link></li>
              <li><Link to="/services" className="hover:text-brand-primary transition-colors">Waterproof Coating</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Navigasi</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-brand-primary transition-colors">Tentang Kami</Link></li>
              <li><Link to="/tracking" className="hover:text-brand-primary transition-colors">Track Pesanan</Link></li>
              <li><Link to="/booking" className="hover:text-brand-primary transition-colors">Pesan Sekarang</Link></li>
              <li><Link to="/faq" className="hover:text-brand-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="text-brand-primary shrink-0" />
                <span>Jl. Modern Startup No. 42, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-brand-primary shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-brand-primary shrink-0" />
                <span>hello@shoewash.premium</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} ShoeWash Premium. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
