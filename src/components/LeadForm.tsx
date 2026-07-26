import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { config } from '../config';

const FORMSPREE_ENDPOINT = `https://formspree.io/f/${config.formspreeFormId}`;

const PROJECT_OPTIONS = [
  { id: 'studios', name: 'Studios' },
  { id: 'one-bedroom', name: 'One Bedroom' },
  { id: 'two-bedrooms', name: 'Two Bedrooms' },
  { id: 'executive', name: 'Executive Units' },
  { id: 'penthouse', name: 'Penthouse' },
];

interface FormData {
  fullName: string;
  phoneNumber: string;
  confirmPhoneNumber: string;
  contactMethod: 'whatsapp' | 'call' | '';
  interestedProject: string;
}

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  confirmPhoneNumber?: string;
  contactMethod?: string;
  interestedProject?: string;
}

const LeadForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    confirmPhoneNumber: '',
    contactMethod: '',
    interestedProject: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        return undefined;
      case 'phoneNumber':
        if (!value.trim()) return 'رقم التواصل مطلوب';
        if (!/^[0-9+\s-]+$/.test(value)) return 'يرجى إدخال رقم هاتف صحيح مع كود الدولة';
        if (value.replace(/\D/g, '').length < 10) return 'يجب أن يكون رقم الهاتف على الأقل 10 أرقام مع كود الدولة';
        return undefined;
      case 'confirmPhoneNumber':
        return undefined;
      case 'contactMethod':
        return undefined;
      case 'interestedProject':
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    const error = validateField(name, formData[name]);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getThankYouPath = (): string => {
    const base = (typeof import.meta.env.BASE_URL === 'string' ? import.meta.env.BASE_URL : '').replace(/\.$/, '') || '/';
    return base === '/' ? '/thank-you' : `${base.replace(/\/$/, '')}/thank-you`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    const errorMessage = 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو الاتصال بنا على الواتساب أو الهاتف.';
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('full_name', formData.fullName);
      formDataToSend.append('phone', formData.phoneNumber);
      formDataToSend.append('additional_phone', formData.confirmPhoneNumber);
      formDataToSend.append('contact_method', formData.contactMethod);
      formDataToSend.append('interested_project', formData.interestedProject);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formDataToSend,
        redirect: 'manual',
      });
      const success =
        res.ok ||
        res.status === 301 ||
        res.status === 302 ||
        res.status === 303 ||
        res.type === 'opaqueredirect';
      if (success) {
        navigate(getThankYouPath());
        return;
      }
      setIsSubmitting(false);
      alert(errorMessage);
    } catch {
      setIsSubmitting(false);
      alert(errorMessage);
    }
  };

  const isFormValid = () => {
    // Check if phone number is filled
    if (formData.phoneNumber.trim() === '') return false;
    
    // Check if there are any actual error messages (not undefined)
    const hasErrors = Object.values(errors).some(error => error !== undefined && error !== '');
    return !hasErrors;
  };

  return (
    <section id="lead-form" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
            احصل على الأسعار وخطط الدفع والبروشور
          </h2>
          <p className="text-gray-600 text-center mb-8">
            املأ النموذج أدناه وسنرسل لك جميع التفاصيل
          </p>

          <motion.form
            action={FORMSPREE_ENDPOINT}
            method="POST"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="full_name"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                      errors.fullName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-tatweer-orange'
                    } focus:outline-none focus:ring-2 focus:ring-tatweer-orange focus:ring-offset-2`}
                    placeholder="أدخل اسمك الكامل"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    رقم التواصل (واتساب) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phone"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    onBlur={() => handleBlur('phoneNumber')}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                      errors.phoneNumber
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-tatweer-orange'
                    } focus:outline-none focus:ring-2 focus:ring-tatweer-orange focus:ring-offset-2`}
                    placeholder="+20 123 456 7890 (مع كود الدولة)"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPhoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    رقم إضافي للتواصل (اختياري)
                  </label>
                  <input
                    type="tel"
                    id="confirmPhoneNumber"
                    name="additional_phone"
                    value={formData.confirmPhoneNumber}
                    onChange={(e) => handleChange('confirmPhoneNumber', e.target.value)}
                    onBlur={() => handleBlur('confirmPhoneNumber')}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                      errors.confirmPhoneNumber
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-tatweer-orange'
                    } focus:outline-none focus:ring-2 focus:ring-tatweer-orange focus:ring-offset-2`}
                    placeholder="أدخل رقم إضافي إن وجد"
                  />
                  {errors.confirmPhoneNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.confirmPhoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    طريقة الاتصال المفضلة
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contact_method"
                        value="whatsapp"
                        checked={formData.contactMethod === 'whatsapp'}
                        onChange={(e) => handleChange('contactMethod', e.target.value)}
                        className="w-4 h-4 text-tatweer-orange focus:ring-tatweer-orange"
                      />
                      <span className="ml-2 text-gray-700">واتساب</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contact_method"
                        value="call"
                        checked={formData.contactMethod === 'call'}
                        onChange={(e) => handleChange('contactMethod', e.target.value)}
                        className="w-4 h-4 text-tatweer-orange focus:ring-tatweer-orange"
                      />
                      <span className="ml-2 text-gray-700">مكالمة</span>
                    </label>
                  </div>
                  {errors.contactMethod && (
                    <p className="mt-1 text-sm text-red-500">{errors.contactMethod}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="interestedProject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    الوحدة المهتم بها
                  </label>
                  <select
                    id="interestedProject"
                    name="interested_project"
                    value={formData.interestedProject}
                    onChange={(e) => handleChange('interestedProject', e.target.value)}
                    onBlur={() => handleBlur('interestedProject')}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                      errors.interestedProject
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-tatweer-orange'
                    } focus:outline-none focus:ring-2 focus:ring-tatweer-orange focus:ring-offset-2`}
                  >
                    <option value="">اختر الوحدة المهتم بها</option>
                    {PROJECT_OPTIONS.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  {errors.interestedProject && (
                    <p className="mt-1 text-sm text-red-500">{errors.interestedProject}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isFormValid() && !isSubmitting ? 1.02 : 1 }}
                  whileTap={{ scale: isFormValid() && !isSubmitting ? 0.98 : 1 }}
                  className={`w-full px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg ${
                    isFormValid() && !isSubmitting
                      ? 'bg-tatweer-orange hover:bg-orange-600 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال والحصول على البروشور'}
                </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadForm;

