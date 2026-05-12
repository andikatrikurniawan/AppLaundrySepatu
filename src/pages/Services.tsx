import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Clock, Check, Sparkles, Zap, Shield, Droplets } from 'lucide-react';

export const services = [
  {
    id: 'deep-cleaning',
    name: 'Deep Cleaning',
    description: 'Pembersihan menyeluruh mencakup bagian luar (upper), dalam (insole), tali sepatu, dan telapak (outsole). Cocok untuk sepatu yang sangat kotor.',
    price: 50000,
    time: '2-3 Hari',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    icon: Sparkles,
    tag: 'Populer'
  },
  {
    id: 'fast-cleaning',
    name: 'Fast Cleaning',
    description: 'Pembersihan instan pada bagian luar (upper) dan midsole saja. Solusi cepat untuk sepatu yang baru sedikit terkena kotor.',
    price: 35000,
    time: '24 Jam',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600',
    icon: Zap,
    tag: 'Ekspres'
  },
  {
    id: 'unyellowing',
    name: 'Unyellowing',
    description: 'Menghilangkan noda kuning (oksidasi) pada bagian midsole yang biasanya terbuat dari karet atau busa. Mengembalikan warna asli sol.',
    price: 85000,
    time: '3-5 Hari',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    icon: Droplets,
    tag: 'Best Result'
  },
  {
    id: 'repaint',
    name: 'Repaint Shoes',
    description: 'Pengecatan ulang secara menyeluruh atau pada bagian tertentu untuk mengembalikan warna sepatu yang sudah pudar atau ganti warna.',
    price: 150000,
    time: '7-10 Hari',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=600',
    icon: Sparkles,
    tag: 'Restorasi'
  },
  {
    id: 'waterproof',
    name: 'Waterproof Treatment',
    description: 'Pemberian lapisan pelindung anti air (nano spray) berkualitas tinggi agar sepatu tidak mudah basah dan kotor saat hujan.',
    price: 25000,
    time: '1 Hari',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
    icon: Shield,
    tag: 'Proteksi'
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black mb-6 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
              ALL PREMIUM TREATMENTS
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-6 uppercase leading-none">
              PILIH <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">TREATMENT</span><br/>
              YANG SESUAI.
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              Setiap pasang sepatu membutuhkan perlakuan berbeda. Pilih layanan yang sesuai dengan kebutuhan koleksi kesayangan Anda.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden rounded-[2.5rem] border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 group bg-white">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-white text-indigo-600 border-none font-black px-4 py-2 text-xs uppercase tracking-widest shadow-lg">
                      {service.tag}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{service.name}</CardTitle>
                </CardHeader>
                
                <CardContent className="px-8 flex-grow">
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 py-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <Clock size={14} className="text-indigo-600" />
                      <span>{service.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest">
                      <Check size={14} />
                      <span>Free Spray</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-8 pt-0 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Mulai</span>
                    <span className="text-2xl font-black text-slate-900">Rp {service.price.toLocaleString('id-ID')}</span>
                  </div>
                  <Link to="/booking">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase text-xs tracking-widest px-8 shadow-lg shadow-indigo-100 active:scale-95 transition-all">
                      Pilih
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Contact Info Footer/Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 lg:p-20 bg-slate-900 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-indigo-300 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
                Customer Support
              </div>
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-none uppercase">BUTUH<br/>KONSULTASI?</h2>
              <p className="text-xl text-slate-400 mb-12 max-w-md leading-relaxed">
                Bingung memilih layanan yang tepat? Tim spesialis kami siap membantu memberikan diagnosa gratis.
              </p>
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-2xl px-12 py-8 font-black uppercase text-sm tracking-widest shadow-xl">
                Chat via WhatsApp
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { val: '100%', label: 'Safety Guarantee' },
                { val: 'Expert', label: 'Trained staff' },
                { val: 'Eco', label: 'Friendly soap' },
                { val: '24/7', label: 'Live tracking' }
              ].map((stat, i) => (
                <div key={stat.label} className="bg-white/5 p-8 rounded-3xl border border-white/10">
                  <div className="text-4xl font-black text-indigo-400 mb-2">{stat.val}</div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
