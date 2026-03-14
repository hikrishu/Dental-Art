import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  LogOut, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle,
  Phone,
  Mail,
  MoreVertical,
  ChevronRight,
  User,
  Info,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Check,
  Eye,
  FileText,
  Lock,
  Loader2,
  ShieldCheck
} from 'lucide-react';

const AdminDashboard = () => {
  const { admin, logout, token } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'contacts'
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // For detail modal
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwStatus, setPwStatus] = useState({ type: '', msg: '' });

  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    confirmed: 0,
    unreadMessages: 0
  });

  const fetchData = async () => {
    setLoading(true);
    const endpoint = activeTab === 'appointments' ? 'appointments' : 'contacts';
    const query = new URLSearchParams();
    if (search) query.append('search', search);
    if (statusFilter && activeTab === 'appointments') query.append('status', statusFilter);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/${endpoint}?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        setData(result.data);
        
        if (activeTab === 'appointments') {
          const newCount = result.data.filter(i => i.status === 'New').length;
          const confirmedCount = result.data.filter(i => i.status === 'Confirmed').length;
          setStats(prev => ({ ...prev, total: result.data.length, new: newCount, confirmed: confirmedCount }));
        } else {
          const unreadCount = result.data.filter(i => !i.isRead).length;
          setStats(prev => ({ ...prev, unreadMessages: unreadCount }));
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, statusFilter, token]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const markContactRead = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contacts/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPwStatus({ type: 'error', msg: 'New passwords do not match' });
      return;
    }

    setPwLoading(true);
    setPwStatus({ type: '', msg: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/auth/update-password`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        }),
      });

      const result = await response.json();
      if (result.success) {
        setPwStatus({ type: 'success', msg: 'Password updated successfully!' });
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
          setPwStatus({ type: '', msg: '' });
        }, 2000);
      } else {
        setPwStatus({ type: 'error', msg: result.message || 'Failed to update password' });
      }
    } catch (error) {
      setPwStatus({ type: 'error', msg: 'Connection error' });
    } finally {
      setPwLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Contacted': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Completed': return 'bg-slate-50 text-slate-600 border-slate-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  // --- Components ---
  
  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider leading-none mb-1">{title}</h3>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  );

  const SidebarContent = () => (
    <>
      <div className="p-8 border-b border-slate-100/80 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-teal-200 ring-2 ring-teal-50 ring-offset-0">
            <Calendar size={20} />
          </div>
          <div>
            <h1 className="font-black text-slate-900 leading-tight text-lg tracking-tight">Dental Art</h1>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mt-0.5">Administrator</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Main Menu</div>
        <button 
          onClick={() => { setActiveTab('appointments'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${activeTab === 'appointments' ? 'bg-teal-600 text-white shadow-lg shadow-teal-100 scale-[1.02]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
        >
          <Calendar size={20} className={activeTab === 'appointments' ? 'text-white' : 'group-hover:text-teal-600'} />
          <span className="font-bold text-sm tracking-tight">Appointments</span>
          {activeTab !== 'appointments' && stats.new > 0 && (
            <span className="ml-auto w-5 h-5 bg-teal-100 text-teal-600 text-[10px] font-black rounded-full flex items-center justify-center">{stats.new}</span>
          )}
        </button>
        <button 
          onClick={() => { setActiveTab('contacts'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${activeTab === 'contacts' ? 'bg-teal-600 text-white shadow-lg shadow-teal-100 scale-[1.02]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
        >
          <MessageSquare size={20} className={activeTab === 'contacts' ? 'text-white' : 'group-hover:text-teal-600'} />
          <span className="font-bold text-sm tracking-tight">Inbox</span>
          {activeTab !== 'contacts' && stats.unreadMessages > 0 && (
            <span className="ml-auto w-5 h-5 bg-amber-100 text-amber-600 text-[10px] font-black rounded-full flex items-center justify-center">{stats.unreadMessages}</span>
          )}
        </button>

        <div className="pt-4 px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Settings</div>
        <button 
          onClick={() => { setIsPasswordModalOpen(true); setIsMobileMenuOpen(false); }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all text-slate-500 hover:bg-slate-50 hover:text-slate-900 group"
        >
          <Lock size={20} className="group-hover:text-teal-600" />
          <span className="font-bold text-sm tracking-tight">Change Password</span>
        </button>
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-teal-600 shadow-sm">
              <User size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate tracking-tight">{admin?.name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Super Admin</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-red-500 bg-red-50/50 hover:bg-red-50 transition-all font-bold text-xs ring-1 ring-red-100/50"
          >
            <LogOut size={14} />
            <span>Log Out Securely</span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col h-screen sticky top-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[40] md:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-72 h-full bg-white z-[50] flex flex-col shadow-2xl md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="flex-1 flex flex-col md:max-h-screen relative min-w-0">
        {/* Header - Fixed */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-5 sticky top-0 z-10 w-full overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center justify-between w-full lg:w-auto">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 -ml-2 text-slate-600 hover:text-teal-600 md:hidden bg-slate-100 rounded-xl transition-all"
                >
                  <MoreVertical size={24} className="rotate-90 md:rotate-0" />
                </button>
                <div>
                  <div className="flex items-center gap-3 text-sm text-slate-400 font-bold mb-1">
                    <span className="hidden sm:inline">Dashboard</span>
                    <ChevronRight size={14} className="hidden sm:inline" />
                    <span className="text-teal-600">{activeTab === 'appointments' ? 'Appointments' : 'Messages'}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">
                    {activeTab === 'appointments' ? 'Clinic Schedule' : 'Patient Inbox'}
                  </h2>
                </div>
              </div>
              
              <button 
                onClick={fetchData} 
                className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50/50 transition-all shadow-sm flex-shrink-0 lg:hidden"
                title="Refresh Data"
              >
                <TrendingUp size={18} className={loading ? 'animate-pulse' : ''} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <form onSubmit={handleSearch} className="relative group/search flex-1 min-w-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/search:text-teal-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder={`Search...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 w-full lg:w-80 transition-all placeholder:text-slate-400 shadow-inner"
                />
              </form>
              
              {activeTab === 'appointments' && (
                <div className="relative group/filter">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover/filter:text-teal-600 transition-colors pointer-events-none" size={18} />
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 appearance-none transition-all cursor-pointer min-w-full sm:min-w-[160px] shadow-inner"
                  >
                    <option value="">All Statuses</option>
                    <option value="New">Status: New</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="Confirmed">Status: Confirmed</option>
                    <option value="Completed">Status: Completed</option>
                    <option value="Cancelled">Status: Cancelled</option>
                  </select>
                </div>
              )}

              <button 
                onClick={fetchData} 
                className="hidden lg:flex p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50/50 transition-all shadow-sm flex-shrink-0"
                title="Refresh Data"
              >
                <TrendingUp size={20} className={loading ? 'animate-pulse' : ''} />
              </button>
            </div>
          </div>
        </header>


        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTab === 'appointments' ? (
              <>
                <StatCard title="Total Requests" value={stats.total} icon={Calendar} colorClass="bg-teal-50 text-teal-600" />
                <StatCard title="New Pending" value={stats.new} icon={Clock} colorClass="bg-blue-50 text-blue-600" />
                <StatCard title="Confirmed" value={stats.confirmed} icon={CheckCircle} colorClass="bg-emerald-50 text-emerald-600" />
                <StatCard title="Health Rate" value="98%" icon={TrendingUp} colorClass="bg-amber-50 text-amber-600" />
              </>
            ) : (
              <>
                <StatCard title="Total Messages" value={data.length} icon={MessageSquare} colorClass="bg-teal-50 text-teal-600" />
                <StatCard title="Unread Inquiries" value={stats.unreadMessages} icon={AlertCircle} colorClass="bg-red-50 text-red-600" />
                <StatCard title="Last 24h" value="12" icon={TrendingUp} colorClass="bg-blue-50 text-blue-600" />
                <StatCard title="Avg Response" value="2h" icon={Clock} colorClass="bg-indigo-50 text-indigo-600" />
              </>
            )}
          </div>

          {/* Table Result Section */}
          <div className="relative">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[32px] border border-slate-200 shadow-sm">
                <div className="w-14 h-14 border-4 border-slate-100 border-t-teal-600 rounded-full animate-spin"></div>
                <p className="mt-6 text-slate-400 font-black tracking-widest uppercase text-[10px]">Processing Database...</p>
              </div>
            ) : data.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] p-24 text-center">
                <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Search Limit Reached</h3>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto font-medium">We couldn't find any results matching your filters. This is NOT a deletion, just a filter view.</p>
                <button 
                  onClick={() => {
                    if(window.confirm("This will clear your search and filters to show all data. Continue?")) {
                      setSearch(''); 
                      setStatusFilter(''); 
                      fetchData();
                    }
                  }}
                  className="mt-8 px-8 py-3 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100"
                >
                  Clear All Filters & Show Data
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden">
                <div className="overflow-x-auto overflow-y-visible">
                  <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-100">
                        <th className="w-[30%] px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Patient Details</th>
                        {activeTab === 'appointments' ? (
                          <>
                            <th className="w-[20%] px-6 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Schedule</th>
                            <th className="w-[30%] px-6 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Consulting / Service</th>
                            <th className="w-[10%] px-6 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Status</th>
                          </>
                        ) : (
                          <th className="w-[50%] px-6 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Message Content</th>
                        )}
                        <th className="w-[10%] px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.map((item, idx) => (
                        <motion.tr 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          key={item._id} 
                          className="hover:bg-slate-50/50 transition-all group/row cursor-pointer"
                          onClick={() => setSelectedItem(item)}
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-2xl bg-slate-50 group-hover/row:bg-white group-hover/row:scale-110 transition-all flex items-center justify-center text-slate-400 group-hover/row:text-teal-600 ring-2 ring-transparent group-hover/row:ring-teal-50">
                                <User size={20} />
                              </div>
                              <div className="min-w-0">
                                <p className="font-extrabold text-slate-900 group-hover/row:text-teal-700 transition-colors tracking-tight text-base truncate">
                                  {item.fullName || item.name}
                                </p>
                                <div className="mt-1.5 flex items-center gap-2 overflow-hidden">
                                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold bg-slate-100/50 px-2 py-0.5 rounded-lg border border-slate-100">
                                    <Phone size={11} className="text-teal-500" />
                                    <span>{item.phone}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>

                          {activeTab === 'appointments' ? (
                            <>
                              <td className="px-6 py-6">
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                                    <Calendar size={14} className="text-teal-600" />
                                    <span>{item.preferredDate}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 w-fit">
                                    <Clock size={12} className="text-amber-500" />
                                    <span>{item.preferredTime}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-6">
                                <div className="max-w-md">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-teal-50 text-teal-700 uppercase ring-1 ring-teal-100 shadow-sm">
                                      {item.service?.replace('_', ' ')}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                                    {item.message || <span className="italic text-slate-300">No consultation notes provided.</span>}
                                  </p>
                                </div>
                              </td>
                              <td className="px-6 py-6 text-center">
                                <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border shadow-sm ${getStatusColor(item.status)}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.status === 'Confirmed' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}`}></span>
                                  {item.status}
                                </span>
                              </td>
                            </>
                          ) : (
                            <td className="px-6 py-6">
                              <div className="max-w-lg">
                                <p className={`text-sm tracking-tight leading-relaxed line-clamp-2 ${!item.isRead ? 'font-bold text-slate-900 border-l-2 border-teal-500 pl-4' : 'text-slate-500'}`}>
                                  {item.message}
                                </p>
                                {!item.isRead && (
                                  <div className="mt-2 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                                    <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Urgent Reading</span>
                                  </div>
                                )}
                              </div>
                            </td>
                          )}

                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                               <button 
                                  className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-200 rounded-2xl transition-all shadow-sm"
                                  onClick={() => setSelectedItem(item)}
                                >
                                  <Eye size={18} />
                                </button>
                               {activeTab === 'appointments' ? (
                                 <div className="relative group/menu">
                                   <button className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-50 rounded-2xl transition-all">
                                     <MoreVertical size={18} />
                                   </button>
                                   <div className="absolute right-0 bottom-full mb-3 w-56 bg-white border border-slate-200 rounded-[24px] shadow-2xl p-2 hidden group-hover/menu:block z-50">
                                     <p className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 mb-1">Set Journey Phase</p>
                                     <div className="space-y-0.5">
                                       {['Contacted', 'Confirmed', 'Completed', 'Cancelled'].map(s => (
                                         <button 
                                           key={s}
                                           onClick={() => updateStatus(item._id, s)}
                                           className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-teal-600 rounded-xl flex items-center justify-between group/btn transition-colors"
                                         >
                                           <span>{s}</span>
                                           <ArrowRight size={14} className="opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                                         </button>
                                       ))}
                                     </div>
                                   </div>
                                 </div>
                               ) : (
                                 !item.isRead && (
                                   <button 
                                     onClick={() => markContactRead(item._id)}
                                     className="px-5 py-2.5 bg-teal-600 text-white text-[10px] font-black rounded-2xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 uppercase tracking-widest flex items-center gap-2"
                                   >
                                     <Check size={14} strokeWidth={3} />
                                     Ready
                                   </button>
                                 )
                               )}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Footer status bar */}
                <div className="bg-slate-50/80 border-t border-slate-100 px-8 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Database Latency: 42ms
                  </div>
                  <div className="flex gap-4">
                     <span className="flex items-center gap-2 text-[10px] font-black uppercase text-teal-600 tracking-widest">
                       <TrendingUp size={12} /> Live Sync Active
                     </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-xl shadow-teal-100">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Lead Dossier</h3>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">System Generated Report</p>
                  </div>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                  <XCircle size={28} />
                </button>
              </div>
              
              <div className="p-10 space-y-10 max-h-[65vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-600 mb-4 flex items-center gap-2">
                       <User size={14} /> Personal Details
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase mb-0.5">Full Name</p>
                        <p className="font-black text-slate-900 text-lg leading-tight">{selectedItem.fullName || selectedItem.name}</p>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <Phone size={16} className="text-teal-500" />
                        <p className="font-bold text-slate-700">{selectedItem.phone}</p>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <Mail size={16} className="text-teal-500" />
                        <p className="font-bold text-slate-700 text-sm truncate">{selectedItem.email}</p>
                      </div>
                    </div>
                  </div>

                  {activeTab === 'appointments' && (
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-600 mb-4 flex items-center gap-2">
                         <Calendar size={14} /> Schedule Block
                      </h4>
                      <div className="space-y-4">
                         <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shadow-teal-100">
                            <p className="text-[10px] font-black uppercase opacity-60 mb-1">Preferred Date</p>
                            <p className="text-xl font-black">{selectedItem.preferredDate}</p>
                         </div>
                         <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-lg shadow-slate-200">
                            <p className="text-[10px] font-black uppercase opacity-60 mb-1">Clinic Session</p>
                            <p className="text-xl font-black">{selectedItem.preferredTime}</p>
                         </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-200/50 relative">
                  <div className="absolute -top-3 left-8 px-4 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Transmission Content
                  </div>
                  <p className="text-slate-700 leading-relaxed font-bold text-lg italic">
                    "{selectedItem.message || "Implicit intent - no text provided."}"
                  </p>
                </div>
              </div>
              
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="px-8 py-3.5 rounded-2xl font-black text-slate-500 hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
                >
                  Dismiss
                </button>
                {activeTab === 'appointments' && selectedItem.status === 'New' && (
                  <button 
                    onClick={() => { updateStatus(selectedItem._id, 'Confirmed'); setSelectedItem(null); }}
                    className="px-8 py-3.5 rounded-2xl font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all uppercase tracking-widest text-xs flex items-center gap-2"
                  >
                    <CheckCircle size={16} /> Confirm Reservation
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-md rounded-[40px] shadow-2xl p-10"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-teal-100 shadow-inner">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Security Update</h3>
                <p className="text-slate-500 font-bold text-sm">Update your administrative credentials</p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-5">
                {pwStatus.msg && (
                  <div className={`p-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center border ${pwStatus.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                    {pwStatus.msg}
                  </div>
                )}
                
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4">Current Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4">New Secret Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-4">Verify New Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => { setIsPasswordModalOpen(false); setPwStatus({type:'', msg:''}); }}
                    className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={pwLoading}
                    className="flex-1 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-teal-700 transition-all shadow-xl shadow-teal-100 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {pwLoading ? <Loader2 className="animate-spin" size={16} /> : 'Save Key'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
