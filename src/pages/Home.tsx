import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  Zap, 
  Star, 
  ArrowRight, 
  CheckCircle2,
  Users,
  Award,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const stats = [
    { label: 'Sepatu Selesai', value: '12.5k+', icon: CheckCircle2 },
    { label: 'Rating Puas', value: '4.9/5', icon: Star },
    { label: 'Fast Response', value: '24 Jam', icon: Zap },
  ];

  return (
    <div className="overflow-hidden bg-slate-50 min-h-screen flex flex-col">
      {/* Main Hero Split Section */}
      <section className="flex-grow flex flex-col lg:flex-row pt-20">
        {/* Left Section: Hero & Stats */}
        <div className="w-full lg:w-3/5 p-8 lg:p-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-8 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
              PREMIUM SHOE CARE SERVICE
            </div>
            <h1 className="text-hero mb-8">
              SOLUSI <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">LAUNDRY</span><br/>
              SEPATU PROFESIONAL.
            </h1>
            <p className="text-xl text-slate-500 max-w-lg mb-12 leading-relaxed">
              Kembalikan kilau sepatu kesayangan Anda dengan teknologi deep cleaning modern dan treatment khusus oleh ahlinya.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 border-t border-slate-200 pt-10">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Section: Interactive Components */}
        <div className="w-full lg:w-2/5 p-8 lg:p-12 bg-slate-100 flex flex-col gap-8 justify-center">
          {/* Tracking Widget Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2rem] shadow-xl p-8 border border-slate-200"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-lg">Tracking Status</h3>
              <span className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg text-slate-500 font-bold">INV/KC-8802</span>
            </div>
            
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute left-[7px] top-[10px] bottom-[-10px] w-0.5 bg-slate-100"></div>
                <div className="flex gap-4 relative">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-emerald-100 shrink-0"></div>
                  <div className="flex-1 -mt-1">
                    <p className="text-sm font-bold text-slate-900">Sepatu Dijemput</p>
                    <p className="text-xs text-slate-400">14:20 PM - Kurir OTW</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="w-4 h-4 rounded-full bg-indigo-600 border-4 border-indigo-100 shrink-0 shadow-lg shadow-indigo-200"></div>
                <div className="flex-1 -mt-1">
                  <p className="text-sm font-bold text-indigo-600">Sedang Dicuci (Processing)</p>
                  <p className="text-xs text-slate-400">Deep Cleaning Treatment</p>
                  <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-indigo-600"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Order Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group"
          >
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest mb-2">New Client Special</p>
              <h4 className="text-2xl font-black mb-6 leading-tight">Dapatkan Diskon 20% Untuk Pencucian Pertama</h4>
              <Link to="/booking">
                <Button className="w-full py-6 bg-white text-indigo-600 hover:bg-slate-50 rounded-2xl font-bold text-sm shadow-sm transition-all">
                  Ambil Promo Membership
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Admin Insights Mini */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/50 backdrop-blur-sm border border-white/50 rounded-2xl p-5 flex gap-4 items-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="text-emerald-600" size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Admin Dashboard Live</p>
              <p className="text-sm font-black text-slate-900">42 Pesanan Selesai Hari Ini</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Bottom Service Stripe Footer-style */}
      <section className="bg-white border-t border-slate-200 py-10">
        <div className="container mx-auto px-8 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full">
              {[
                { no: '01', title: 'Deep Clean', sub: 'Pembersihan Menyeluruh' },
                { no: '02', title: 'Unyellowing', sub: 'Atasi Sol Menguning' },
                { no: '03', title: 'Repaint & Repair', sub: 'Restorasi Warna Asli' },
                { no: '04', title: 'Whitening', sub: 'Putih Bersih Sempurna' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-indigo-600 border border-slate-100">
                    {item.no}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 mb-0.5">{item.title}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center lg:text-right w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-12">
               <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-widest leading-none">Customer Support</p>
               <p className="text-lg font-black text-slate-900">+62 812-3456-7890</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Existing Sections can be kept or adapted - I'll adapt them briefly to match the "Bold" theme */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8 lg:px-20">
          <div className="max-w-4xl">
            <h2 className="text-6xl font-black tracking-tighter mb-12">DETAIL TREATMENT.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-black mb-4">PEMBERSIHAN EKSPRES</h3>
                <p className="text-slate-500 leading-relaxed mb-8">Solusi cepat untuk sepatu yang baru sedikit terkena kotor. Selesai dalam waktu kurang dari 24 jam.</p>
                <Link to="/booking">
                  <Button variant="link" className="p-0 text-indigo-600 font-black flex items-center gap-2 group">
                    Pesan Sekarang <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4">RESTORASI PENUH</h3>
                <p className="text-slate-500 leading-relaxed mb-8">Kembalikan warna asli sepatu Anda dengan teknik pengecatan ulang profesional dan material berkualitas.</p>
                <Link to="/booking">
                  <Button variant="link" className="p-0 text-indigo-600 font-black flex items-center gap-2 group">
                    Order Restorasi <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
