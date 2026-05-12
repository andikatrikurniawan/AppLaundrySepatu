import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp, getDocs, writeBatch } from 'firebase/firestore';
import { services as defaultServices } from './Services';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Users, 
  ShoppingBag, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical,
  CheckCircle2,
  Trash2,
  Edit,
  Eye,
  ArrowUpRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [seeding, setSeeding] = useState(false);

  const seedServices = async () => {
    setSeeding(true);
    try {
      const servicesSnap = await getDocs(collection(db, 'services'));
      if (servicesSnap.empty) {
        const batch = writeBatch(db);
        defaultServices.forEach(service => {
          const newDoc = doc(collection(db, 'services'));
          batch.set(newDoc, service);
        });
        await batch.commit();
        toast.success('Layanan berhasil di-seed!');
      } else {
        toast.info('Layanan sudah ada.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Gagal melakukan seeding data');
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      toast.success(`Status pesanan diperbarui menjadi ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error('Gagal memperbarui status');
    }
  };

  const updatePaymentStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        paymentStatus: newStatus,
        updatedAt: serverTimestamp()
      });
      toast.success(`Status pembayaran diperbarui`);
    } catch (error) {
      console.error(error);
      toast.error('Gagal memperbarui pembayaran');
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Total Pesanan', value: orders.length, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Pendapatan', value: `Rp ${orders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? o.totalPrice : 0), 0).toLocaleString('id-ID')}`, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Pesanan Aktif', value: orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Pelanggan', value: new Set(orders.map(o => o.customerId)).size, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Dashboard Admin</h1>
            <p className="text-slate-500">Kelola pesanan, pelanggan, dan status pengerjaan.</p>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" onClick={seedServices} disabled={seeding} className="rounded-xl border-slate-200">
               {seeding ? 'Seeding...' : 'Seed Data Services'}
             </Button>
             <Button variant="outline" className="rounded-xl border-slate-200">Export PDF</Button>
             <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl">Refresh Data</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4"
            >
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-xl font-extrabold text-slate-900">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <h2 className="text-xl font-bold text-slate-900">Riwayat Pesanan</h2>
             <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    placeholder="Cari pelanggan / ID..." 
                    className="pl-10 rounded-xl w-full sm:w-64 border-slate-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="rounded-xl w-full sm:w-48 border-slate-200">
                    <SelectValue placeholder="Semua Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="pending">Menunggu Konfirmasi</SelectItem>
                    <SelectItem value="washing">Sedang Dicuci</SelectItem>
                    <SelectItem value="completed">Selesai</SelectItem>
                  </SelectContent>
                </Select>
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold py-5 pl-8">Order ID & Tanggal</TableHead>
                  <TableHead className="font-bold py-5">Nama Pelanggan</TableHead>
                  <TableHead className="font-bold py-5">Layanan</TableHead>
                  <TableHead className="font-bold py-5">Status Order</TableHead>
                  <TableHead className="font-bold py-5">Status Bayar</TableHead>
                  <TableHead className="font-bold py-5 text-right pr-8">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-20 text-slate-400">Memuat data pesanan...</TableCell></TableRow>
                ) : filteredOrders.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-20 text-slate-400">Tidak ada pesanan ditemukan.</TableCell></TableRow>
                ) : filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-slate-50/50">
                    <TableCell className="py-6 pl-8">
                      <div className="font-bold text-slate-900 mb-1">#{order.id.slice(0, 8)}</div>
                      <div className="text-xs text-slate-400">
                        {order.createdAt?.seconds ? format(new Date(order.createdAt.seconds * 1000), 'd MMM yyyy, HH:mm', { locale: localeId }) : '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-slate-900">{order.customerName}</div>
                      <div className="text-xs text-brand-primary">{order.whatsapp}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 font-medium">
                        {order.serviceId}
                      </Badge>
                      <div className="text-[10px] text-slate-400 mt-1 capitalize">{order.shoeType}</div>
                    </TableCell>
                    <TableCell>
                       <Select 
                        defaultValue={order.status} 
                        onValueChange={(v) => updateOrderStatus(order.id, v)}
                       >
                         <SelectTrigger className={cn(
                           "h-8 text-xs font-bold rounded-lg border-none w-40",
                           order.status === 'completed' ? "bg-green-100 text-green-700" : 
                           order.status === 'washing' ? "bg-blue-100 text-blue-700" :
                           "bg-yellow-100 text-yellow-700"
                         )}>
                           <SelectValue />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="pending">Menunggu Konfirmasi</SelectItem>
                           <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
                           <SelectItem value="picked_up">Dijemput</SelectItem>
                           <SelectItem value="washing">Dicuci</SelectItem>
                           <SelectItem value="drying">Dikeringkan</SelectItem>
                           <SelectItem value="finishing">Finishing</SelectItem>
                           <SelectItem value="shipping">Dikirim</SelectItem>
                           <SelectItem value="completed">Selesai</SelectItem>
                         </SelectContent>
                       </Select>
                    </TableCell>
                    <TableCell>
                       <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => updatePaymentStatus(order.id, order.paymentStatus === 'paid' ? 'unpaid' : 'paid')}
                        className={cn(
                          "h-8 rounded-lg font-bold gap-1 px-3",
                          order.paymentStatus === 'paid' ? "text-green-600 bg-green-50" : "text-orange-600 bg-orange-50"
                        )}
                       >
                         {order.paymentStatus === 'paid' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                         {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                       </Button>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                       <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg">
                            <Eye size={18} />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                            <Trash2 size={18} />
                          </Button>
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
