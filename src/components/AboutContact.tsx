import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Award, Clock, Heart, MessageSquare, Briefcase } from 'lucide-react';
import { ContactMessage } from '../types';
import { MILESTONES, SKILL_GROUPS, CLIENT_TESTIMONIALS } from '../data';

interface AboutContactProps {
  accentColor: string;
  cardBg: string;
  isLight?: boolean;
}

export default function AboutContact({ accentColor, cardBg, isLight = false }: AboutContactProps) {
  // Form handling
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'photography'
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [savedMessages, setSavedMessages] = useState<ContactMessage[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Save in simulated lists
    setSavedMessages((prev) => [formData, ...prev]);
    setHasSubmitted(true);
    
    // Auto reset submission alert after 4 seconds
    setTimeout(() => {
      setHasSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'photography'
      });
    }, 4000);
  };

  return (
    <div className="space-y-16">
      {/* SECTION 1: ABOUT ME & SKILL GROUPS */}
      <div id="about-section" className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start text-left">
        {/* Biography left section (take 3 columns) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" style={{ color: accentColor }} />
            <h3 className={`font-sans font-bold text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>The Story & Voyage</h3>
          </div>
          
          <h2 className={`font-sans font-black text-3xl sm:text-4xl tracking-tight leading-tight transition-colors duration-300 ${isLight ? 'text-zinc-900 font-black' : 'text-white'}`}>
            ബിന്യാസത്തോടെ നവക്രിയ • Combining passion with aesthetic craft.
          </h2>
          
          <p className={`text-sm leading-relaxed font-sans transition-colors duration-300 ${isLight ? 'text-zinc-700' : 'text-white/70'}`}>
            AJ Vertex is a modern creative portfolio and personal brand website created to showcase the artistic journey, visual stories, and digital creations of **Ajith**. Driven by passion and innovation, AJ Vertex reflects a unique blend of creativity and professionalism. Every image captured, every video edited, and every project completed tells a story of imagination, dedication, and continuous growth.
          </p>

          <p className={`text-sm leading-relaxed font-sans transition-colors duration-300 ${isLight ? 'text-zinc-600' : 'text-white/60'}`}>
            Whether it's cinematic photography, creative poster designs, web layouts, video edits, or digital content creation, AJ Vertex brings these mediums together in one place, allowing visitors to experience the creative philosophy behind each work.
          </p>

          {/* Quick numbers list */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className={`p-4 rounded-2xl border transition-colors duration-300 ${isLight ? 'bg-white border-zinc-200/80 shadow-xs' : 'bg-white/5 border-white/5'}`}>
              <span className={`font-sans font-black text-3xl block mb-1 ${isLight ? 'text-zinc-900' : 'text-white'}`}>5+</span>
              <span className={`text-[10px] uppercase font-mono tracking-wider block ${isLight ? 'text-zinc-500 font-bold' : 'text-white/45'}`}>Years Dynamic Craft</span>
            </div>
            <div className={`p-4 rounded-2xl border transition-colors duration-300 ${isLight ? 'bg-white border-zinc-200/80 shadow-xs' : 'bg-white/5 border-white/5'}`}>
              <span className={`font-sans font-black text-3xl block mb-1 ${isLight ? 'text-zinc-900' : 'text-white'}`}>40+</span>
              <span className={`text-[10px] uppercase font-mono tracking-wider block ${isLight ? 'text-zinc-500 font-bold' : 'text-white/45'}`}>Visual Projects</span>
            </div>
            <div className={`p-4 rounded-2xl border transition-colors duration-300 ${isLight ? 'bg-white border-zinc-200/80 shadow-xs' : 'bg-white/5 border-white/5'}`}>
              <span className={`font-sans font-black text-3xl block mb-1 ${isLight ? 'text-zinc-900' : 'text-white'}`}>100%</span>
              <span className={`text-[10px] uppercase font-mono tracking-wider block ${isLight ? 'text-zinc-500 font-bold' : 'text-white/45'}`}>Dedication / Quality</span>
            </div>
          </div>
        </div>

        {/* Tactical Skills sidebar (take 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" style={{ color: accentColor }} />
            <h3 className={`font-sans font-bold text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>Competencies & Tools</h3>
          </div>

          <div className="space-y-4">
            {SKILL_GROUPS.map((group, idx) => (
              <div key={idx} className={`rounded-2xl p-4 border transition-colors duration-300 ${isLight ? 'bg-white border-zinc-200/80 shadow-xs' : 'bg-white/5 border-white/5'}`}>
                <span className={`text-[11px] font-bold font-mono tracking-wider uppercase block mb-3 ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>
                  {group.title}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, sIdx) => {
                    const isFocus = sIdx % 3 === 0;
                    return (
                      <span 
                        key={sIdx}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-all"
                        style={{
                          backgroundColor: isFocus ? `${accentColor}10` : (isLight ? '#f4f4f5' : 'rgba(255,255,255,0.03)'),
                          borderColor: isFocus ? `${accentColor}30` : (isLight ? '#e4e4e7' : 'rgba(255,255,255,0.05)'),
                          color: isFocus ? (isLight ? accentColor : '#ffffff') : (isLight ? '#3f3f46' : 'rgba(255,255,255,0.7)')
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: MILESTONES & REVIEWS */}
      <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 items-start pt-6 border-t transition-colors duration-300 ${isLight ? 'border-zinc-200' : 'border-white/5'}`}>
        {/* Milestones Left (take 2 columns) */}
        <div className="lg:col-span-2 space-y-6 text-left">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" style={{ color: accentColor }} />
            <h3 className={`font-sans font-bold text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>Journey Highlights</h3>
          </div>

          <div className={`relative border-l pl-5 ml-2.5 space-y-8 transition-colors ${isLight ? 'border-zinc-200' : 'border-white/10'}`}>
            {MILESTONES.map((mile, idx) => (
              <div key={idx} className="relative group">
                {/* timeline point dot */}
                <div 
                  className={`absolute -left-[27.5px] top-1.5 w-3 h-3 rounded-full border transition-colors ${isLight ? 'bg-white' : 'bg-zinc-950'}`}
                  style={{ borderColor: accentColor }}
                />
                <span className="text-[11px] font-mono font-black" style={{ color: accentColor }}>
                  {mile.year}
                </span>
                <h4 className={`text-sm font-bold mt-1 ${isLight ? 'text-zinc-900' : 'text-white'}`}>{mile.title}</h4>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-zinc-600 font-medium' : 'text-white/50'}`}>{mile.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Right (take 3 columns) */}
        <div className="lg:col-span-3 space-y-6 text-left">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" style={{ color: accentColor }} />
            <h3 className={`font-sans font-bold text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>Creative Endorsements</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CLIENT_TESTIMONIALS.map((test) => (
              <div key={test.id} className={`p-5 rounded-2xl border flex flex-col justify-between transition-colors duration-300 ${isLight ? 'bg-white border-zinc-200 shadow-xs' : 'border-white/5 bg-white/[0.02]'}`}>
                <div>
                  <p className={`text-xs italic leading-relaxed font-sans mb-5 ${isLight ? 'text-zinc-700' : 'text-white/70'}`}>
                    "{test.text}"
                  </p>
                </div>
                <div className={`flex items-center gap-3 pt-3 border-t ${isLight ? 'border-zinc-100' : 'border-white/5'}`}>
                  <img
                    src={test.avatarUrl}
                    alt={test.name}
                    className={`w-8 h-8 rounded-full object-cover border ${isLight ? 'border-zinc-200 shadow-xs' : 'border-white/10'}`}
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className={`text-xs font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{test.name}</h5>
                    <p className={`text-[10px] ${isLight ? 'text-zinc-550' : 'text-white/40'}`}>{test.role}, {test.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: INTERACTIVE CONTACT PORTAL */}
      <div id="contact-section" className={`pt-12 border-t transition-colors duration-300 ${isLight ? 'border-zinc-200' : 'border-white/5'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Details Column (Take 2 spans) */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" style={{ color: accentColor }} />
              <h3 className={`font-sans font-bold text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>Let’s Collaborate</h3>
            </div>
            
            <h2 className={`font-sans font-black text-3xl tracking-tight leading-snug transition-colors ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              സൃഷ്ടിപരമായ കൂട്ടുകെട്ടുകൾക്കായി സ്വാഗതം!
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed font-sans transition-colors ${isLight ? 'text-zinc-650' : 'text-white/60'}`}>
              Have a cinema clip in mind, some graphic edits, or a creative web design idea? Drop a line here—I'm looking forward to working on meaningful digital solutions!
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-xl border transition-colors ${isLight ? 'bg-amber-100/30 border-amber-200/50' : 'bg-white/5 border-white/5'}`} style={{ color: accentColor }}>
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className={`text-[10px] font-mono tracking-wider uppercase block mb-0.5 ${isLight ? 'text-zinc-500 font-bold' : 'text-white/30'}`}>Email Address</span>
                  <a href="mailto:ajicreations1202@gmail.com" className={`text-xs sm:text-sm transition-colors font-semibold hover:underline ${isLight ? 'text-zinc-900 hover:text-amber-800' : 'text-white/80 hover:text-white'}`}>
                    ajicreations1202@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-xl border transition-colors ${isLight ? 'bg-amber-100/30 border-amber-200/50' : 'bg-white/5 border-white/5'}`} style={{ color: accentColor }}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className={`text-[10px] font-mono tracking-wider uppercase block mb-0.5 ${isLight ? 'text-zinc-500 font-bold' : 'text-white/30'}`}>Primary Studio Location</span>
                  <span className={`text-xs sm:text-sm font-semibold ${isLight ? 'text-zinc-800' : 'text-white/80'}`}>
                    Kerala, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form Column (Take 3 spans) */}
          <div className="lg:col-span-3 space-y-4">
            <div 
              id="contact-form-card"
              className={`p-6 rounded-3xl border transition-colors duration-300 ${isLight ? 'border-zinc-200 shadow-xl shadow-amber-950/5' : 'border-white/10'}`}
              style={{ backgroundColor: cardBg }}
            >
              <h4 className={`font-sans font-extrabold text-base mb-1 ${isLight ? 'text-zinc-900' : 'text-white'}`}>Collaboration Proposal</h4>
              <p className={`text-[11px] mb-6 ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>ആശയങ്ങൾ സന്ദേശമായി അയക്കുക • Form submits in real-time</p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Form fields row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-[10px] font-medium block ${isLight ? 'text-zinc-700' : 'text-white/65'}`}>Your Name (പേര്)*</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ajith"
                      className={`w-full border rounded-xl px-3 py-2 text-xs transition-all focus:outline-none ${isLight ? 'bg-white border-zinc-250 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 shadow-inner' : 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/20'}`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-[10px] font-medium block ${isLight ? 'text-zinc-700' : 'text-white/65'}`}>Your Email (ഇമെയിൽ)*</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className={`w-full border rounded-xl px-3 py-2 text-xs transition-all focus:outline-none ${isLight ? 'bg-white border-zinc-250 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 shadow-inner' : 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/20'}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-[10px] font-medium block ${isLight ? 'text-zinc-700' : 'text-white/65'}`}>Inquiry Category (വിഭാഗം)*</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none transition-colors ${isLight ? 'bg-white border-zinc-250 text-zinc-900 focus:border-amber-500' : 'bg-zinc-900 border-white/10 text-white focus:border-white/20'}`}
                    >
                      <option value="photography">Cinema / Portrait Photography</option>
                      <option value="videography">Reels & Promo Editing</option>
                      <option value="graphic-design">Graphic Posters & Packaging</option>
                      <option value="web-projects">Digital Website Engineering</option>
                      <option value="labs">Interactive Artistic Lab Ideas</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-[10px] font-medium block ${isLight ? 'text-zinc-700' : 'text-white/65'}`}>Subject (വിഷയം)</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Let's build together"
                      className={`w-full border rounded-xl px-3 py-2 text-xs transition-all focus:outline-none ${isLight ? 'bg-white border-zinc-250 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 shadow-inner' : 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/20'}`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={`text-[10px] font-medium block ${isLight ? 'text-zinc-700' : 'text-white/65'}`}>Message (സന്ദേശം)*</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your design vision or project query here..."
                    className={`w-full border rounded-xl px-3 py-2.5 text-xs transition-all focus:outline-none resize-none ${isLight ? 'bg-white border-zinc-250 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 shadow-inner' : 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/20'}`}
                  />
                </div>

                {/* Submissions alert */}
                <AnimatePresence>
                  {hasSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                      <span className="text-[11px] text-emerald-300 leading-snug">
                        <strong>സന്ദേശം അയച്ചു!</strong> Thank you indeed! Your simulated proposal log was created below successfully.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  id="submit-proposal-btn"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 hover:opacity-95 transition-all active:scale-[0.98]"
                  style={{ backgroundColor: accentColor }}
                >
                  <Send className="w-4 h-4" />
                  Send Proposal (അയക്കുക)
                </button>
              </form>
            </div>

            {/* Simulated Live Logs list */}
            {savedMessages.length > 0 && (
              <div className={`p-5 rounded-2xl border transition-colors duration-300 ${isLight ? 'bg-white border-zinc-200/80 shadow-md shadow-amber-950/5' : 'bg-white/5 border border-white/5'}`}>
                <span className={`text-[10px] font-mono tracking-wider uppercase block ${isLight ? 'text-zinc-500 font-bold' : 'text-white/35'}`}>
                  Simulated Submissions (ലൈവ് മെസ്സേജുകൾ • local sandbox log)
                </span>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {savedMessages.map((msg, mIdx) => (
                    <div key={mIdx} className={`p-3 rounded-xl border text-xs transition-colors duration-300 ${isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-800' : 'bg-black/20 border-white/5'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <strong className={isLight ? 'text-zinc-900 font-bold' : 'text-white font-medium'}>{msg.name}</strong>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono tracking-wider ${isLight ? 'bg-amber-100/55 text-amber-950 font-bold' : 'bg-white/10 text-white/70'}`}>{msg.category.toUpperCase()}</span>
                      </div>
                      <p className={isLight ? 'text-zinc-600 font-medium' : 'text-white/50'}>{msg.message}</p>
                      <span className={`text-[9px] block mt-2 font-mono ${isLight ? 'text-zinc-400' : 'text-white/25'}`}>{msg.email}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
