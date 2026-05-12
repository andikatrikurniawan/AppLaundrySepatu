import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from './Services';
import { Calendar as CalendarIcon, Upload, Trash2, CheckCircle2, ChevronRight, ChevronLeft, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Booking() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const [formData, setFormData] = useState({
    customerName: profile?.name || '',
    whatsapp: '',
    address: '',
    shoeType: '',
    serviceId: '',
    pickupType: 'pickup',
    notes: '',
    photoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300', // Mock photo for now
  });

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({ ...prev, customerName: profile.name }));
    }
  }, [profile]);

  const selectedService = services.find(s => s.id === formData.serviceId);
  const totalPrice = selectedService ? selectedService.price : 0;

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Silakan masuk terlebih dahulu');
      navigate('/login');
      return;
    }

    if (!formData.whatsapp || !formData.shoeType || !formData.serviceId) {
      toast.error('Harap lengkapi semua data wajib');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        ...formData,
        customerId: user.uid,
        totalPrice,
        bookingDate: date ? date.toISOString() : new Date().toISOString(),
        status: 'pending',
        paymentStatus: 'unpaid',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      toast.success('Pemesanan berhasil dibuat!');
      navigate(`/tracking?id=${docRef.id}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'orders');
      toast.error('Gagal membuat pesanan');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.customerName || !formData.whatsapp)) {
      toast.error('Silakan isi nama dan nomor WhatsApp');
      return;
    }
    if (step === 2 && (!formData.shoeType || !formData.serviceId)) {
      toast.error('Silakan pilih jenis sepatu dan layanan');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black mb-6 w-fit uppercase tracking-widest">
              Easy Booking Process
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-6 uppercase leading-none">
              BUAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">PESANAN</span><br/>
              DENGAN MUDAH.
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              Lengkapi data di bawah ini untuk mendapatkan perawatan premium terbaik untuk sepatu kesayangan Anda.
            </p>
          </motion.div>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-16 relative max-w-xl">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 -z-10" />
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div 
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 shadow-xl",
                  step >= s ? "bg-indigo-600 text-white scale-110 shadow-indigo-200" : "bg-white text-slate-300 border border-slate-100"
                )}
              >
                {s}
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                step >= s ? "text-indigo-600" : "text-slate-300"
              )}>
                {s === 1 ? 'Customer' : s === 2 ? 'Layanan' : 'Review'}
              </span>
            </div>
          ))}
        </div>

        <Card className="rounded-[3rem] border-slate-200 shadow-2xl overflow-hidden bg-white">
          <CardContent className="p-10 lg:p-14">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="space-y-8"
                >
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-400">Nama Lengkap</Label>
                      <Input 
                        id="name" 
                        placeholder="MASUKKAN NAMA" 
                        value={formData.customerName}
                        onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                        className="rounded-2xl h-16 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 transition-all font-bold text-lg px-6"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="whatsapp" className="text-xs font-black uppercase tracking-widest text-slate-400">Nomor WhatsApp</Label>
                      <Input 
                        id="whatsapp" 
                        placeholder="Contoh: 08123456789" 
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        className="rounded-2xl h-16 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 transition-all font-bold text-lg px-6"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="address" className="text-xs font-black uppercase tracking-widest text-slate-400">Alamat Penjemputan</Label>
                    <Textarea 
                      id="address" 
                      placeholder="MASUKKAN ALAMAT LENGKAP" 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="rounded-3xl h-32 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 transition-all font-bold text-lg p-6 resize-none"
                    />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2 italic">* Opsional jika Anda mengantar sendiri ke store kami.</p>
                  </div>
                  <div className="flex justify-end pt-10">
                    <Button onClick={nextStep} className="bg-slate-900 hover:bg-slate-800 text-white px-12 rounded-2xl h-16 font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                      NEXT STEP <ChevronRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="space-y-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <Label htmlFor="shoe-type" className="text-xs font-black uppercase tracking-widest text-slate-400">Jenis Sepatu</Label>
                      <Select 
                        onValueChange={(v) => setFormData({...formData, shoeType: v})}
                        defaultValue={formData.shoeType}
                      >
                        <SelectTrigger className="rounded-2xl h-16 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 transition-all font-bold text-lg px-6">
                          <SelectValue placeholder="PILIH JENIS" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-200">
                          <SelectItem value="sneakers" className="font-bold">Sneakers</SelectItem>
                          <SelectItem value="leather" className="font-bold">Leather Shoes</SelectItem>
                          <SelectItem value="boots" className="font-bold">Boots</SelectItem>
                          <SelectItem value="canvas" className="font-bold">Canvas</SelectItem>
                          <SelectItem value="sports" className="font-bold">Sports / Running</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="service" className="text-xs font-black uppercase tracking-widest text-slate-400">Pilih Layanan</Label>
                      <Select 
                        onValueChange={(v) => setFormData({...formData, serviceId: v})}
                        defaultValue={formData.serviceId}
                      >
                        <SelectTrigger className="rounded-2xl h-16 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 transition-all font-bold text-lg px-6">
                          <SelectValue placeholder="PILIH TREATMENT" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-200">
                          {services.map(s => (
                            <SelectItem key={s.id} value={s.id} className="font-bold">
                              {s.name.toUpperCase()} - RP {s.price.toLocaleString('id-ID')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Upload Foto Sepatu (Optional)</Label>
                    <div className="border-4 border-dashed border-slate-100 rounded-[2.5rem] p-12 text-center hover:border-indigo-600 transition-all cursor-pointer group bg-slate-50/50 hover:bg-white">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                          <Upload size={32} />
                        </div>
                        <div>
                          <p className="text-lg font-black text-slate-900 tracking-tighter uppercase mb-1">Click to browse or drop</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Max file 5MB (JPG, PNG)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-10">
                    <Button variant="ghost" onClick={prevStep} className="rounded-2xl h-16 font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 px-8">
                      <ChevronLeft className="mr-2" size={20} /> BACK
                    </Button>
                    <Button onClick={nextStep} className="bg-slate-900 hover:bg-slate-800 text-white px-12 rounded-2xl h-16 font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                      NEXT STEP <ChevronRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="space-y-10"
                >
                  <div className="bg-slate-900 rounded-[2.5rem] p-10 lg:p-14 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
                    <h3 className="font-black text-2xl uppercase tracking-tighter mb-10 border-b border-white/10 pb-6 relative z-10">Order Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-14 relative z-10">
                      <div>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Customer Name</p>
                        <p className="text-xl font-black uppercase truncate">{formData.customerName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Selected Treatment</p>
                        <p className="text-xl font-black uppercase truncate">{selectedService?.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Shoe Category</p>
                        <p className="text-xl font-black uppercase truncate">{formData.shoeType}</p>
                      </div>
                      <div className="flex flex-col items-start md:items-end">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Total Amount</p>
                        <p className="text-4xl lg:text-5xl font-black tracking-tighter text-white">Rp {totalPrice.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                    <div className="space-y-3">
                       <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Pickup Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full rounded-2xl h-16 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 transition-all font-bold text-lg px-6 justify-start",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-3 h-5 w-5 text-indigo-600" />
                              {date ? format(date, "PPP") : <span>PICK A DATE</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 rounded-3xl border-slate-200" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              className="rounded-3xl"
                            />
                          </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="method" className="text-xs font-black uppercase tracking-widest text-slate-400">Handling Method</Label>
                      <Select 
                        onValueChange={(v) => setFormData({...formData, pickupType: v})}
                        defaultValue={formData.pickupType}
                      >
                        <SelectTrigger className="rounded-2xl h-16 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 transition-all font-bold text-lg px-6">
                          <SelectValue placeholder="CHOOSE METHOD" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-200">
                          <SelectItem value="pickup" className="font-bold">Antar Jemput (Pickup)</SelectItem>
                          <SelectItem value="dropoff" className="font-bold">Antar ke Store</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-10">
                    <Button variant="ghost" onClick={prevStep} className="rounded-2xl h-16 font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 px-8">
                      <ChevronLeft className="mr-2" size={20} /> BACK
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={loading}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 rounded-2xl h-16 font-black uppercase tracking-widest shadow-xl shadow-indigo-100 active:scale-95 transition-all outline-none ring-offset-4 ring-indigo-50"
                    >
                      {loading ? 'PROCESSING...' : 'CONFIRM ORDER'} <CheckCircle2 className="ml-2" size={20} />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
