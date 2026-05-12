import { motion } from 'motion/react';
import { Target, Eye, History, Users, ShieldCheck, Sparkles } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: 'Kualitas Premium',
      description: 'Kami hanya menggunakan produk pembersih terbaik yang aman untuk berbagai jenis material sepatu.',
      icon: ShieldCheck
    },
    {
      title: 'Kepuasan Pelanggan',
      description: 'Prioritas kami adalah senyum pelanggan saat melihat sepatu mereka kembali seperti baru.',
      icon: Sparkles
    },
    {
      title: 'Inovasi Berkelanjutan',
      description: 'Terus memperbarui teknik dan teknologi pencucian untuk hasil yang lebih maksimal.',
      icon: Target
    }
  ];

  const timeline = [
    { year: '2016', event: 'Gerai pertama dibuka di Jakarta Selatan.' },
    { year: '2018', event: 'Meluncurkan layanan antar jemput (pickup & delivery).' },
    { year: '2020', event: 'Mencapai 10.000 pasang sepatu yang telah dicuci.' },
    { year: '2023', event: 'Implementasi sistem tracking digital real-time.' },
    { year: '2026', event: 'Menjadi penyedia perawatan sepatu premium nomor satu.' },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
              Lebih Dari Sekadar <br />
              <span className="text-brand-primary">Cuci Sepatu Biasa</span>
            </h1>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Di ShoeWash Premium, kami merawat setiap pasang sepatu seolah-olah itu milik kami sendiri. Bermula dari hobi mengoleksi sneakers, kami menyadari bahwa setiap sepatu memiliki cerita dan nilai tersendiri bagi pemiliknya.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Itulah mengapa kami mendedikasikan diri untuk memberikan perawatan tingkat tinggi dengan detail yang presisi, menggunakan teknik manual dan modern yang telah teruji.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1597042534062-811c750b6910?auto=format&fit=crop&q=80&w=800" 
                alt="Our Workshop" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -z-10 top-10 right-10 w-full h-full border-2 border-brand-primary rounded-[3rem]" />
          </motion.div>
        </div>

        {/* Vision Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="bg-slate-900 text-white p-12 rounded-[3rem] shadow-xl">
            <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center mb-6">
              <Target size={24} />
            </div>
            <h2 className="text-3xl font-bold mb-6">Visi Kami</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Menjadi pionir perawatan sepatu premium kelas dunia yang mengedepankan kualitas, transparansi, dan integritas dalam setiap pelayanan.
            </p>
          </div>
          <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-brand-secondary rounded-xl flex items-center justify-center text-white mb-6">
              <Eye size={24} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Misi Kami</h2>
            <ul className="space-y-4 text-slate-600">
              <li className="flex gap-3">
                <div className="w-6 h-6 bg-brand-secondary/10 text-brand-secondary rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</div>
                <p>Memberikan solusi perawatan sepatu terlengkap dengan standar profesional.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 bg-brand-secondary/10 text-brand-secondary rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</div>
                <p>Mengedukasi masyarakat tentang pentingnya perawatan sepatu yang benar.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 bg-brand-secondary/10 text-brand-secondary rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <p>Membangun platform digital yang memudahkan pelanggan dalam melacak perawatan.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Perjalanan Kami</h2>
            <p className="text-slate-500">Sejarah perkembangan ShoeWash Premium dari masa ke masa.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8 relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-200" />
            {timeline.map((item, i) => (
              <div key={i} className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="flex-1 text-right">
                  {i % 2 === 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 inline-block text-left">
                       <h4 className="font-bold text-brand-primary text-xl mb-1">{item.year}</h4>
                       <p className="text-slate-600 text-sm">{item.event}</p>
                    </div>
                  )}
                </div>
                <div className="w-4 h-4 rounded-full bg-brand-primary z-10 border-4 border-white shadow-md" />
                <div className="flex-1">
                  {i % 2 !== 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 inline-block">
                       <h4 className="font-bold text-brand-primary text-xl mb-1">{item.year}</h4>
                       <p className="text-slate-600 text-sm">{item.event}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
