import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowCounterClockwise,
  Check,
  CheckCircle,
  Copy,
  EnvelopeSimple,
  PaperPlaneTilt,
  Plus,
} from '@phosphor-icons/react';
import { FAQ_ITEMS, PARTNERS, QUOTATION_SCOPES } from '../data/siteData';
import { BASE_EASE, DarkChapterAtmosphere, RevealBlock } from './MotionPrimitives';

export type InquiryMode = 'general' | 'quotation';

export interface InquiryPreset {
  mode: InquiryMode;
  scope?: string;
  projectTitle?: string;
  nonce: number;
}

interface PartnersAndContactProps {
  inquiryPreset?: InquiryPreset | null;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  scope: string;
  location: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const OFFICIAL_EMAIL = 'info@almnahry.com';

export const PartnersAndContact: React.FC<PartnersAndContactProps> = ({ inquiryPreset }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [inquiryMode, setInquiryMode] = useState<InquiryMode>('general');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    scope: QUOTATION_SCOPES[0],
    location: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inquiryPreset) return;
    setInquiryMode(inquiryPreset.mode);
    setSubmitted(false);
    setFormData((prev) => ({
      ...prev,
      scope: inquiryPreset.scope ?? prev.scope,
      message: inquiryPreset.projectTitle
        ? `نرغب في طلب دراسة ومقايسة لمشروع مماثل لـ (${inquiryPreset.projectTitle}).`
        : prev.message,
    }));
  }, [inquiryPreset]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OFFICIAL_EMAIL);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  const validate = (data: FormState): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!data.name.trim() || data.name.trim().length < 2) {
      nextErrors.name = 'أدخل الاسم الكامل أو اسم الجهة للمتابعة.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim() || !emailPattern.test(data.email.trim())) {
      nextErrors.email = 'البريد الإلكتروني غير صحيح. أعد كتابته بصيغة صالحة.';
    }
    if (!data.message.trim() || data.message.trim().length < 10) {
      nextErrors.message = 'اكتب تفاصيل مختصرة عن المشروع لا تقل عن 10 أحرف.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      scope: QUOTATION_SCOPES[0],
      location: '',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div>
      {/* Partners Section — Pure Architectural White Chapter */}
      <section
        id="partners"
        className="bg-white text-[#071121] py-24 sm:py-32 border-b border-[#071121]/8"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10 flex flex-col gap-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#071121]/10">
            <RevealBlock className="flex flex-col gap-3 max-w-[680px]">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#2563EB]">
                08 — شبكة الثقة والتعاون
              </span>
              <h2 className="font-[Cairo] text-4xl sm:text-5xl font-extrabold text-[#071121]">
                شركاء النجاح
              </h2>
              <p className="text-base sm:text-lg text-[#475569]">
                جهات وعملاء ومقاولون عملنا معهم على تنفيذ مشاريعنا.
              </p>
            </RevealBlock>
            <RevealBlock delay={0.08} className="text-xs sm:text-sm text-[#64748B]">
              علاقات عمل ممتدة مع الملاك والمكاتب الاستشارية وشركات المقاولات الكبرى
            </RevealBlock>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARTNERS.map((partner, index) => (
              <RevealBlock key={partner.id} delay={index * 0.05} className="h-full">
                <div className="group h-full rounded-3xl p-7 sm:p-8 bg-[#F8FAFC] border border-[#071121]/8 hover:bg-white hover:-translate-y-1 hover:border-[#2563EB]/45 hover:shadow-[0_24px_60px_-24px_rgba(7,17,33,0.14)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between gap-7">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      aria-hidden="true"
                      className="w-13 h-13 rounded-2xl flex items-center justify-center bg-[#071121] text-white font-[Cairo] text-lg font-extrabold group-hover:bg-[#2563EB] transition-colors duration-300 shrink-0"
                    >
                      {partner.monogram}
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#2563EB] tabular-nums">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-[Cairo] text-xl font-extrabold text-[#071121]">
                      {partner.name}
                    </h3>
                    <span className="text-xs font-semibold text-[#2563EB]">{partner.sector}</span>
                    <p className="text-sm leading-[1.8] text-[#475569] pt-1">
                      {partner.collaboration}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section — Gallery Alabaster Clean Accordion */}
      <section id="faq" className="bg-[#F8FAFC] text-[#071121] py-24 sm:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <RevealBlock className="lg:col-span-4 flex flex-col gap-3">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#2563EB]">
                09 — استفسارات متكررة
              </span>
              <h2 className="font-[Cairo] text-3xl sm:text-4xl font-extrabold text-[#071121]">
                الأسئلة الشائعة
              </h2>
              <p className="text-sm sm:text-base leading-[1.8] text-[#475569]">
                إجابات واضحة حول نطاق أعمالنا وآلية التعاقد والمتابعة في المواقع.
              </p>
            </RevealBlock>

            <div className="lg:col-span-8 flex flex-col gap-3.5">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqId === item.id;
                return (
                  <RevealBlock key={item.id} delay={idx * 0.04}>
                    <div
                      className={`rounded-2xl bg-white border transition-colors duration-300 overflow-hidden ${
                        isOpen
                          ? 'border-[#2563EB]/45 shadow-[0_12px_32px_-16px_rgba(37,99,235,0.16)]'
                          : 'border-[#071121]/8'
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${item.id}`}
                        onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                        className="w-full text-right p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB]"
                      >
                        <span className="font-[Cairo] text-base sm:text-lg font-bold text-[#071121]">
                          {item.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isOpen
                              ? 'rotate-45 bg-[#2563EB] text-white'
                              : 'bg-white border border-[#071121]/10 text-[#071121]'
                          }`}
                        >
                          <Plus className="w-4 h-4" weight="bold" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-answer-${item.id}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: BASE_EASE }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 pb-6 flex flex-col gap-4">
                              <div className="h-px w-full bg-[#071121]/8" aria-hidden="true" />
                              <p className="text-sm sm:text-base leading-[1.85] text-[#475569]">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </RevealBlock>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Business Inquiry Section — Deep Architectural Navy Finale */}
      <section
        id="contact"
        className="relative bg-[#071121] text-white py-24 sm:py-32 overflow-hidden"
      >
        <DarkChapterAtmosphere variant="navy" />
        <div aria-hidden="true" className="absolute inset-0 arch-grid-dark pointer-events-none" />

        <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <RevealBlock className="lg:col-span-5 flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#60A5FA]">
                  10 — التواصل وطلب المقايسات
                </span>
                <h2 className="font-[Cairo] text-4xl sm:text-5xl font-extrabold text-white">
                  تواصل معنا
                </h2>
                <p className="text-base sm:text-lg leading-[1.85] text-[#CBD5E1]">
                  اكتب لنا عن مشروعك، وسيعود إليك أحد أعضاء الفريق.
                </p>
              </div>

              <div
                className="h-px w-full bg-gradient-to-l from-[#3B82F6]/60 via-white/15 to-transparent"
                aria-hidden="true"
              />

              {/* Official Business Inquiry Desk */}
              <div className="rounded-2xl p-5 bg-[#0D1B31]/85 border border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-10 h-10 rounded-xl bg-[#2563EB]/20 border border-[#3B82F6]/35 text-[#60A5FA] flex items-center justify-center shrink-0">
                      <EnvelopeSimple className="w-5 h-5" weight="bold" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-[#94A3B8]">البريد الرسمي لاستفسارات المشاريع</span>
                      <a
                        href={`mailto:${OFFICIAL_EMAIL}`}
                        dir="ltr"
                        className="font-mono text-sm font-semibold text-white hover:text-[#60A5FA] transition-colors truncate"
                      >
                        {OFFICIAL_EMAIL}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="نسخ البريد الإلكتروني"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/12 text-xs font-semibold text-[#CBD5E1] hover:text-white hover:border-[#3B82F6] transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#60A5FA]" weight="bold" aria-hidden="true" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" weight="bold" aria-hidden="true" />
                        <span>نسخ</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="h-px w-full bg-white/10" aria-hidden="true" />
                <div className="flex items-center justify-between gap-3 text-xs text-[#94A3B8]">
                  <span>مواعيد استقبال المخططات والمقايسات</span>
                  <span className="text-white font-medium">السبت – الخميس</span>
                </div>
              </div>

              <div className="flex flex-col gap-6 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#60A5FA]">نطاق الأعمال المتاح</span>
                  <p className="text-base font-semibold text-white">
                    خرسانات وحدادة ونجارة وتشطيبات وفق المواصفات الهندسية
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#60A5FA]">العمل مع الجهات</span>
                  <p className="text-[#CBD5E1] leading-[1.8]">
                    نتعاون مباشرة مع الجهات المالكة، المكاتب الاستشارية، وشركات المقاولات الكبرى لتنفيذ البنود الإنشائية والتشطيبية حسب العقد.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#60A5FA]">مسار المتابعة</span>
                  <p className="text-[#CBD5E1] leading-[1.8]">
                    بعد استلام رسالتك، يراجع فريقنا الفني تفاصيل النطاق ويعود إليك لتحديد موعد المعاينة أو دراسة المقايسة دون أي التزام مسبق.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Dual-Mode Business Conversion Card (Project Inquiry + Request a Quotation) */}
            <RevealBlock delay={0.1} className="lg:col-span-7">
              <div className="rounded-3xl p-6 sm:p-10 bg-[#0D1B31]/92 backdrop-blur-2xl border border-white/12 shadow-[0_32px_90px_-20px_rgba(0,0,0,0.65)] flex flex-col gap-7">
                {/* Interactive Mode Switcher */}
                <div
                  role="tablist"
                  aria-label="نوع الطلب"
                  className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-[#071121] border border-white/10"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={inquiryMode === 'general'}
                    onClick={() => {
                      setInquiryMode('general');
                      setSubmitted(false);
                    }}
                    className={`relative min-h-[42px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                      inquiryMode === 'general' ? 'text-white' : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {inquiryMode === 'general' && (
                      <motion.span
                        layoutId="inquiryModePill"
                        transition={{ duration: 0.35, ease: BASE_EASE }}
                        className="absolute inset-0 rounded-xl bg-[#2563EB]"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">استفسار عن مشروع</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={inquiryMode === 'quotation'}
                    onClick={() => {
                      setInquiryMode('quotation');
                      setSubmitted(false);
                    }}
                    className={`relative min-h-[42px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                      inquiryMode === 'quotation' ? 'text-white' : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {inquiryMode === 'quotation' && (
                      <motion.span
                        layoutId="inquiryModePill"
                        transition={{ duration: 0.35, ease: BASE_EASE }}
                        className="absolute inset-0 rounded-xl bg-[#2563EB]"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">طلب مقايسة وتسعير</span>
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="contact-success"
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: BASE_EASE }}
                      role="status"
                      aria-live="polite"
                      className="py-10 text-center flex flex-col items-center gap-6"
                    >
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#2563EB]/20 border border-[#3B82F6]/45 text-[#60A5FA]">
                        <CheckCircle className="w-8 h-8" weight="fill" aria-hidden="true" />
                      </div>
                      <div className="flex flex-col gap-2 max-w-md">
                        <h3 className="font-[Cairo] text-2xl font-bold text-white">
                          تم استلام رسالتك. شكرًا لتواصلك مع المناهري.
                        </h3>
                        <p className="text-sm text-[#CBD5E1] leading-relaxed">
                          سيراجع أحد أعضاء الفريق الفني تفاصيل{' '}
                          {inquiryMode === 'quotation' ? 'طلب المقايسة' : 'رسالتك'} ويتواصل معك عبر البريد الإلكتروني{' '}
                          <span className="font-mono text-[#60A5FA]" dir="ltr">
                            {formData.email}
                          </span>
                          .
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/8 text-white border border-white/15 hover:border-[#3B82F6]/60 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                      >
                        <ArrowCounterClockwise className="w-4 h-4" weight="bold" aria-hidden="true" />
                        <span>إرسال طلب آخر</span>
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key={`contact-form-${inquiryMode}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: BASE_EASE }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="flex flex-col gap-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="contact-name" className="text-sm font-semibold text-white">
                            الاسم
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData((prev) => ({ ...prev, name: e.target.value }));
                              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                            }}
                            placeholder="الاسم الكامل أو اسم الجهة"
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'contact-name-error' : undefined}
                            className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border text-sm text-white placeholder:text-[#94A3B8] transition-all duration-300 focus:outline-none focus:bg-white/[0.08] focus:ring-2 focus:ring-[#3B82F6]/60 ${
                              errors.name
                                ? 'border-red-400'
                                : 'border-white/14 focus:border-[#3B82F6]'
                            }`}
                          />
                          {errors.name && (
                            <p id="contact-name-error" className="text-xs text-red-300">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="contact-email" className="text-sm font-semibold text-white">
                            البريد الإلكتروني
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            dir="ltr"
                            autoComplete="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData((prev) => ({ ...prev, email: e.target.value }));
                              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                            }}
                            placeholder="name@company.com"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? 'contact-email-error' : undefined}
                            className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border text-sm text-white placeholder:text-[#94A3B8] text-left transition-all duration-300 focus:outline-none focus:bg-white/[0.08] focus:ring-2 focus:ring-[#3B82F6]/60 ${
                              errors.email
                                ? 'border-red-400'
                                : 'border-white/14 focus:border-[#3B82F6]'
                            }`}
                          />
                          {errors.email && (
                            <p id="contact-email-error" className="text-xs text-red-300">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {inquiryMode === 'quotation' && (
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="contact-scope" className="text-sm font-semibold text-white">
                              نطاق الأعمال المطلوب
                            </label>
                            <select
                              id="contact-scope"
                              name="scope"
                              value={formData.scope}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, scope: e.target.value }))
                              }
                              className="w-full px-4 py-3.5 rounded-xl bg-[#071121] border border-white/14 text-sm text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/60"
                            >
                              {QUOTATION_SCOPES.map((scopeOption) => (
                                <option key={scopeOption} value={scopeOption}>
                                  {scopeOption}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="contact-location" className="text-sm font-semibold text-white">
                                موقع المشروع (اختياري)
                              </label>
                              <input
                                id="contact-location"
                                name="location"
                                type="text"
                                value={formData.location}
                                onChange={(e) =>
                                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                                }
                                placeholder="مثال: القاهرة الجديدة / 6 أكتوبر"
                                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/14 text-sm text-white placeholder:text-[#94A3B8] transition-all duration-300 focus:outline-none focus:bg-white/[0.08] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/60"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <label htmlFor="contact-phone" className="text-sm font-semibold text-white">
                                رقم الهاتف (اختياري)
                              </label>
                              <input
                                id="contact-phone"
                                name="phone"
                                type="tel"
                                dir="ltr"
                                autoComplete="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                                }
                                placeholder="+20 100 000 0000"
                                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/14 text-sm text-white placeholder:text-[#94A3B8] text-left transition-all duration-300 focus:outline-none focus:bg-white/[0.08] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/60"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <label htmlFor="contact-message" className="text-sm font-semibold text-white">
                          رسالتك
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, message: e.target.value }));
                            if (errors.message)
                              setErrors((prev) => ({ ...prev, message: undefined }));
                          }}
                          placeholder={
                            inquiryMode === 'quotation'
                              ? 'اذكر المساحة التقريبية، جاهزية المخططات، والمدة المستهدفة لبدء التنفيذ'
                              : 'اذكر نوع المشروع والموقع ونطاق الأعمال المطلوب مثل الخرسانات أو الحدادة أو النجارة أو التشطيبات'
                          }
                          aria-invalid={Boolean(errors.message)}
                          aria-describedby={errors.message ? 'contact-message-error' : undefined}
                          className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border text-sm text-white placeholder:text-[#94A3B8] resize-y transition-all duration-300 focus:outline-none focus:bg-white/[0.08] focus:ring-2 focus:ring-[#3B82F6]/60 ${
                            errors.message
                              ? 'border-red-400'
                              : 'border-white/14 focus:border-[#3B82F6]'
                          }`}
                        />
                        {errors.message && (
                          <p id="contact-message-error" className="text-xs text-red-300">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                        <span className="text-xs text-[#94A3B8]">
                          تُستخدم بياناتك للرد على استفسار المشروع فقط.
                        </span>
                        <button
                          type="submit"
                          className="btn-cobalt inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-xl text-sm sm:text-base font-bold text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1B31]"
                        >
                          <span>
                            {inquiryMode === 'quotation'
                              ? 'إرسال طلب المقايسة والتسعير'
                              : 'إرسال تفاصيل المشروع'}
                          </span>
                          <PaperPlaneTilt className="w-4 h-4" weight="bold" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>
    </div>
  );
};
