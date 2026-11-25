import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, RotateCcw, Send } from 'lucide-react';
import { PARTNERS } from '../data/siteData';
import { ARCHITECTURAL_EASE, RevealBlock } from './MotionPrimitives';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const PartnersAndContact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const validate = (data: FormState): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!data.name.trim() || data.name.trim().length < 2) {
      nextErrors.name = 'يرجى إدخال الاسم الكامل.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim() || !emailPattern.test(data.email.trim())) {
      nextErrors.email = 'يرجى إدخال بريد إلكتروني صحيح.';
    }
    if (!data.message.trim() || data.message.trim().length < 10) {
      nextErrors.message = 'يرجى كتابة نبذة مختصرة عن مشروعك (10 أحرف على الأقل).';
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
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="bg-[#F5F4F0] text-[#141619]">
      {/* Partners Section — شركاء النجاح */}
      <section id="partners" className="py-20 md:py-28 border-b border-[#141619]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealBlock className="mb-14">
            <p className="text-xs font-semibold text-[#8E6322] mb-3">05. شبكة التعاون</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141619]">شركاء النجاح</h2>
            <p className="mt-3 text-base sm:text-lg text-[#4D5159] max-w-[56ch]">
              جهات وعملاء ومقاولون عملنا معهم على تنفيذ مشاريعنا.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-r border-[#141619]/12">
            {PARTNERS.map((partner, index) => (
              <RevealBlock key={partner.id} delay={index * 0.05}>
                <div className="h-full p-7 sm:p-8 bg-white/70 hover:bg-white border-b border-l border-[#141619]/12 transition-colors duration-200 flex flex-col justify-between gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      aria-hidden="true"
                      className="w-12 h-12 flex items-center justify-center border border-[#141619]/15 bg-[#F5F4F0] font-[Cairo] text-base font-extrabold text-[#141619] shrink-0"
                    >
                      {partner.monogram}
                    </div>
                    <span className="font-mono text-xs text-[#8E6322] tabular-nums">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-[Cairo] text-lg font-bold text-[#141619]">
                      {partner.name}
                    </h3>
                    <p className="text-xs font-medium text-[#8E6322]">{partner.sector}</p>
                    <p className="text-sm leading-relaxed text-[#52565E] pt-1">
                      {partner.collaboration}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section — تواصل معنا */}
      <section id="contact" className="py-20 md:py-28 architectural-grid-light">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Editorial Contact Guidance */}
            <RevealBlock className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#8E6322] mb-3">06. ابدأ المحادثة</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141619]">تواصل معنا</h2>
                <p className="mt-4 text-base sm:text-lg leading-[1.85] text-[#4D5159]">
                  اكتب لنا عن مشروعك، وسيعود إليك أحد أعضاء الفريق.
                </p>
              </div>

              <div className="pt-6 border-t border-[#141619]/12 space-y-5 text-sm">
                <div>
                  <p className="text-xs font-medium text-[#5A5E66] mb-1">نطاق الأعمال المتاح</p>
                  <p className="font-semibold text-[#141619]">
                    أعمال الخرسانات، الحدادة المسلحة، النجارة المسلحة، والتشطيبات المتكاملة
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#5A5E66] mb-1">العمل مع الجهات</p>
                  <p className="text-[#2B2E33] leading-relaxed">
                    نتعاون مباشرة مع الجهات المالكة، المكاتب الاستشارية، وشركات المقاولات الكبرى لتنفيذ البنود الإنشائية والتشطيبية حسب العقد والمواصفات.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#5A5E66] mb-1">مسار المتابعة</p>
                  <p className="text-[#2B2E33] leading-relaxed">
                    بعد استلام رسالتك، يراجع فريقنا الفني تفاصيل النطاق ويتواصل معك لتحديد موعد المعاينة أو دراسة المقايسة.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Validated Contact Form */}
            <RevealBlock delay={0.12} className="lg:col-span-7">
              <div className="bg-white border border-[#141619]/12 p-6 sm:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="contact-success"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: ARCHITECTURAL_EASE }}
                      role="status"
                      aria-live="polite"
                      className="py-10 text-center space-y-6"
                    >
                      <div className="w-14 h-14 mx-auto flex items-center justify-center bg-[#111315] text-[#D4A459]">
                        <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-[Cairo] text-2xl font-bold text-[#141619]">
                          تم استلام رسالتك. شكرًا لتواصلك مع المناهري.
                        </h3>
                        <p className="text-sm text-[#52565E] max-w-md mx-auto leading-relaxed">
                          سيراجع أحد أعضاء فريقنا الهندسي تفاصيل طلبك ويعود إليك عبر البريد الإلكتروني{' '}
                          <span className="font-mono text-[#141619]" dir="ltr">
                            {formData.email}
                          </span>
                          .
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-[#141619]/20 text-[#141619] hover:border-[#141619] transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" aria-hidden="true" />
                          <span>إرسال رسالة أخرى</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="contact-form"
                      initial={shouldReduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-sm font-semibold text-[#141619] mb-2"
                          >
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
                            className={`w-full px-4 py-3 bg-[#F5F4F0]/60 border text-sm text-[#141619] placeholder:text-[#787C84] transition-colors focus:outline-none focus:bg-white ${
                              errors.name
                                ? 'border-red-700 focus:border-red-700'
                                : 'border-[#141619]/18 focus:border-[#111315]'
                            }`}
                          />
                          {errors.name && (
                            <p id="contact-name-error" className="mt-1.5 text-xs text-red-700">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-sm font-semibold text-[#141619] mb-2"
                          >
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
                            className={`w-full px-4 py-3 bg-[#F5F4F0]/60 border text-sm text-[#141619] placeholder:text-[#787C84] text-left transition-colors focus:outline-none focus:bg-white ${
                              errors.email
                                ? 'border-red-700 focus:border-red-700'
                                : 'border-[#141619]/18 focus:border-[#111315]'
                            }`}
                          />
                          {errors.email && (
                            <p id="contact-email-error" className="mt-1.5 text-xs text-red-700">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-sm font-semibold text-[#141619] mb-2"
                        >
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
                          placeholder="اذكر نوع المشروع، الموقع، ونطاق الأعمال المطلوب (خرسانات، حدادة، نجارة، أو تشطيبات)..."
                          aria-invalid={Boolean(errors.message)}
                          aria-describedby={errors.message ? 'contact-message-error' : undefined}
                          className={`w-full px-4 py-3 bg-[#F5F4F0]/60 border text-sm text-[#141619] placeholder:text-[#787C84] resize-y transition-colors focus:outline-none focus:bg-white ${
                            errors.message
                              ? 'border-red-700 focus:border-red-700'
                              : 'border-[#141619]/18 focus:border-[#111315]'
                          }`}
                        />
                        {errors.message && (
                          <p id="contact-message-error" className="mt-1.5 text-xs text-red-700">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <p className="text-xs text-[#5A5E66]">
                          تُعامل بيانات مشروعك بسرية تامة ولا تُشارك مع أي جهة خارجية.
                        </p>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#111315] text-white text-sm font-bold hover:bg-[#8E6322] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111315]"
                        >
                          <span>إرسال الرسالة</span>
                          <Send className="w-4 h-4" aria-hidden="true" />
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
