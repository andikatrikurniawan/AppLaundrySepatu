import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Package, 
  Truck, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Tracking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderIdParam = searchParams.get('id');
  const [orderId, setOrderId] = useState(orderIdParam || '');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrder = async (id: string) => {
    if (!id) return;
    setLoading(true);
    setError('');
    try {
      const docRef = doc(db, 'orders', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError('Pesanan tidak ditemukan. Periksa kembali ID pesanan Anda.');
        setOrder(null);
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat mencari pesanan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderIdParam) {
      fetchOrder(orderIdParam);
    }
  }, [orderIdParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ id: orderId });
    fetchOrder(orderId);
  };

  const statusMap: Record<string, { label: string, color: string, progress: number, icon: any }> = {
    'pending': { label: 'MENUNGGU KONFIRMASI', color: 'bg-yellow-500', progress: 10, icon: Clock },
    'confirmed': { label: 'PESANAN DIKONFIRMASI', color: 'bg-blue-500', progress: 25, icon: CheckCircle2 },
    'picked_up': { label: 'SEPATU DIJEMPUT', color: 'bg-indigo-500', progress: 40, icon: MapPin },
    'washing': { label: 'SEDANG DICUCI', color: 'bg-sky-500', progress: 60, icon: Package },
    'drying': { label: 'PROSES PENGERINGAN', color: 'bg-cyan-500', progress: 75, icon: Package },
    'finishing': { label: 'FINISHING & QC', color: 'bg-teal-500', progress: 85, icon: CheckCircle2 },
    'shipping': { label: 'DALAM PENGIRIMAN', color: 'bg-orange-500', progress: 95, icon: Truck },
    'completed': { label: 'PESANAN SELESAI', color: 'bg-emerald-500', progress: 100, icon: CheckCircle2 },
    'cancelled': { label: 'DIBATALKAN', color: 'bg-red-500', progress: 0, icon: AlertCircle }
  };

  const currentStatus = order ? statusMap[order.status] || statusMap['pending'] : null;

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black mb-6 w-fit uppercase tracking-widest">
              Live Order Updates
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-6 uppercase leading-none">
              LACAK <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">PESANAN</span><br/>
              ANDA DI SINI.
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              Pantau setiap tahap perawatan sepatu kesayangan Anda secara real-time dari jemputan hingga pengantaran kembali.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mb-16">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 p-3 bg-white rounded-[2rem] shadow-xl border border-slate-200">
            <div className="flex-grow flex items-center px-6 py-3">
              <Search className="text-slate-400 mr-4" size={24} />
              <input 
                type="text" 
                placeholder="MASUKKAN ID PESANAN" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-300 font-black text-lg tracking-tighter uppercase"
              />
            </div>
            <Button type="submit" disabled={loading} className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-12 h-16 font-black uppercase tracking-widest shadow-lg shadow-slate-200 transition-all active:scale-95">
              {loading ? 'MENCARI...' : 'TRACK ORDER'}
            </Button>
          </form>
          {error && <p className="mt-6 text-red-500 font-black uppercase text-xs tracking-widest px-6">{error}</p>}
        </div>

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
             {/* Main Info Card */}
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
              <div className="bg-slate-900 p-10 lg:p-14 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black">INV</div>
                      <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Official Receipt</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none">ORDER ID<br/>#{order.id.slice(0, 8)}</h2>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-2">Order Created On</p>
                    <p className="text-2xl font-black tracking-tighter uppercase">
                      {order.createdAt?.seconds ? format(new Date(order.createdAt.seconds * 1000), 'd MMM yyyy', { locale: localeId }) : '---'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-10 lg:p-14">
                <div className="mb-16">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", currentStatus?.color)}>
                        <currentStatus.icon size={28} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Current Status</p>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{currentStatus?.label}</h3>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="text-6xl font-black tracking-tighter text-slate-100 absolute right-14 -mt-4 pointer-events-none">{currentStatus?.progress}%</span>
                    </div>
                  </div>
                  <Progress value={currentStatus?.progress} className="h-4 rounded-full bg-slate-100" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
                  <div className="lg:col-span-2 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Service Choice</p>
                        <p className="text-xl font-black text-slate-900 leading-tight uppercase">{order.serviceId}</p>
                        <p className="text-sm font-bold text-indigo-600 mt-1 uppercase">{order.shoeType}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Pickup Method</p>
                        <p className="text-xl font-black text-slate-900 leading-tight uppercase">{order.pickupType}</p>
                        <p className="text-sm text-slate-500 font-bold mt-1 uppercase max-w-xs truncate">{order.address || 'In-Store Drop'}</p>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Execution Log</p>
                      <div className="space-y-6">
                        <div className="flex gap-6">
                          <div className="w-1 bg-indigo-600 rounded-full h-8 mt-1"></div>
                          <div>
                            <p className="font-black text-slate-900 text-sm uppercase">Order Received</p>
                            <p className="text-xs font-bold text-slate-400">System validated order ID</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between">
                    <div>
                      <h4 className="font-black text-slate-900 mb-8 uppercase tracking-tighter text-xl">Payment Details</h4>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Rate</span>
                          <span className="font-black text-slate-900">Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between items-center text-indigo-600">
                          <span className="text-[10px] font-black uppercase tracking-widest">Extra Services</span>
                          <span className="font-black">Rp 0</span>
                        </div>
                        <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Due</span>
                          <span className="font-black text-3xl tracking-tighter text-slate-900">Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10">
                      <Badge className={cn(
                        "w-full justify-center py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg",
                        order.paymentStatus === 'paid' ? "bg-emerald-500" : "bg-orange-500"
                      )}>
                        {order.paymentStatus === 'paid' ? 'Paid / Verified' : 'Unpaid / Pending'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
