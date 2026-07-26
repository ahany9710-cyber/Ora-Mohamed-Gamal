/**
 * إعدادات الموقع - عدّل القيم هنا فقط لتحديثها في كل الصفحات
 * Site config - edit these values only to update across the whole site
 */

export const config = {
  // معرف فورم Formspree (الفورم يبعت على الإيميل المسجل في formspree.io)
  // Formspree form ID (form submissions go to the email registered at formspree.io)
  formspreeFormId: 'meelayjw',

  // رقم الواتساب (بدون + أو مسافات لاستخدامه في wa.me)
  // WhatsApp number (without + or spaces for wa.me links)
  whatsappNumber: '201274230856',

  // رقم الموبايل للمكالمات (مع + للمكالمات)
  // Phone number for calls (with + for tel: links)
  phoneNumber: '+201274230856',

  // تنسيق رقم الموبايل للعرض (اختياري - لو فاضي يستخدم phoneNumber)
  // Phone display format (optional - uses phoneNumber if empty)
  phoneDisplay: '+20 127 423 0856',

  // ——— Google Ads (تهيئة جوجل أدز) ———
  // معرف Google Tag العالمي (مثل AW-XXXXXXXXX) - يُحمّل في كل الصفحات
  // Global Tag ID (e.g. AW-XXXXXXXXX) - loaded on all pages
  gtag_id: 'AW-17872457649',

  // معرف التحويل (اختياري - للتوثيق، التتبع الفعلي يستخدم gtag_id + conversion_label)
  // Conversion ID from Google Ads (optional - for reference; tracking uses gtag_id + conversion_label)
  conversion_id: '',

  // رمز التحويل من إعدادات التحويل في Google Ads - يُستخدم في صفحة الشكر فقط
  // Conversion label from Google Ads - used on thank-you page only
  conversion_label: '19hmCPvcm_kbELGfoMpC',

  // ——— الفيديوهات (اختياري - للاستضافة الخارجية) ———
  // لو فاضي: يستخدم الملفات من public (./hero-video.mp4، ./location.mp4)
  // لو مليان: يستخدم الرابط المباشر (مثلاً من YouTube أو CDN)
  heroVideoUrl: '',
  heroPosterUrl: '',
  mapVideoUrl: '',
};
