export const config: {
  formspreeFormId: string;
  whatsappNumber: string;
  phoneNumber: string;
  phoneDisplay: string;
  /** Google Ads Global Tag ID (e.g. AW-XXXXXXXXX) - loaded on all pages */
  gtag_id: string;
  /** Optional conversion ID from Google Ads (for reference) */
  conversion_id: string;
  /** Conversion label - used on thank-you page only */
  conversion_label: string;
  /** Optional: external URL for hero video; if empty, uses ./hero-video.mp4 from public */
  heroVideoUrl: string;
  /** Optional: external URL for hero poster image; if empty, uses ./video-poster.jpg from public */
  heroPosterUrl: string;
  /** Optional: external URL for map video; if empty, uses ./location.mp4 from public */
  mapVideoUrl: string;
};
