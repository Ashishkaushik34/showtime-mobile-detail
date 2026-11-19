import { defaultServices, defaultReviews, defaultGallery, adminCredentials } from './seedData';

const KEYS = {
  services: 'st_services',
  reviews: 'st_reviews',
  gallery: 'st_gallery',
  leads: 'st_leads',
  admin: 'st_admin',
  auth: 'st_auth',
};

export function initData() {
  if (!localStorage.getItem(KEYS.services)) {
    localStorage.setItem(KEYS.services, JSON.stringify(defaultServices));
  }
  if (!localStorage.getItem(KEYS.reviews)) {
    localStorage.setItem(KEYS.reviews, JSON.stringify(defaultReviews));
  }
  if (!localStorage.getItem(KEYS.gallery)) {
    localStorage.setItem(KEYS.gallery, JSON.stringify(defaultGallery));
  } else {
    try {
      const currentGallery = JSON.parse(localStorage.getItem(KEYS.gallery)) || [];
      // Map existing and append any new default items (e.g. gal-6)
      const updatedGallery = currentGallery.map(item => {
        const defaultItem = defaultGallery.find(d => d.id === item.id);
        if (defaultItem) {
          return {
            ...item,
            title: defaultItem.title,
            subtitle: defaultItem.subtitle || item.subtitle,
            beforeUrl: defaultItem.beforeUrl,
            afterUrl: defaultItem.afterUrl,
          };
        }
        return item;
      });
      // Add missing default items
      defaultGallery.forEach(def => {
        if (!updatedGallery.some(u => u.id === def.id)) {
          updatedGallery.push(def);
        }
      });
      localStorage.setItem(KEYS.gallery, JSON.stringify(updatedGallery));
    } catch {
      localStorage.setItem(KEYS.gallery, JSON.stringify(defaultGallery));
    }
  }
  if (!localStorage.getItem(KEYS.leads)) {
    localStorage.setItem(KEYS.leads, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.admin)) {
    localStorage.setItem(KEYS.admin, JSON.stringify(adminCredentials));
  }
}

function get(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
}

function set(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ── Services ──
export const getServices = () => get(KEYS.services);
export const getActiveServices = () => get(KEYS.services).filter(s => s.active);
export function saveService(service) {
  const all = getServices();
  const idx = all.findIndex(s => s.id === service.id);
  if (idx >= 0) all[idx] = service; else all.push({ ...service, id: 'svc-' + Date.now() });
  set(KEYS.services, all);
}
export function deleteService(id) {
  set(KEYS.services, getServices().filter(s => s.id !== id));
}

// ── Reviews ──
export const getReviews = () => get(KEYS.reviews);
export function saveReview(review) {
  const all = getReviews();
  const idx = all.findIndex(r => r.id === review.id);
  if (idx >= 0) all[idx] = review; else all.push({ ...review, id: 'rev-' + Date.now() });
  set(KEYS.reviews, all);
}
export function deleteReview(id) {
  set(KEYS.reviews, getReviews().filter(r => r.id !== id));
}

// ── Gallery ──
export const getGallery = () => get(KEYS.gallery);
export function saveGalleryItem(item) {
  const all = getGallery();
  const idx = all.findIndex(g => g.id === item.id);
  if (idx >= 0) all[idx] = item; else all.push({ ...item, id: 'gal-' + Date.now() });
  set(KEYS.gallery, all);
}
export function deleteGalleryItem(id) {
  set(KEYS.gallery, getGallery().filter(g => g.id !== id));
}

// ── Leads ──
export const getLeads = () => get(KEYS.leads);
export function saveLead(lead) {
  const all = getLeads();
  all.unshift({ ...lead, id: 'lead-' + Date.now(), status: 'New', submittedAt: new Date().toISOString() });
  set(KEYS.leads, all);
}
export function updateLeadStatus(id, status) {
  const all = getLeads();
  const lead = all.find(l => l.id === id);
  if (lead) lead.status = status;
  set(KEYS.leads, all);
}
export function deleteLead(id) {
  set(KEYS.leads, getLeads().filter(l => l.id !== id));
}

// ── Auth ──
export function login(email, password) {
  const admin = JSON.parse(localStorage.getItem(KEYS.admin));
  if (admin && admin.email === email && admin.password === password) {
    sessionStorage.setItem(KEYS.auth, 'true');
    return true;
  }
  return false;
}
export function isAuthenticated() {
  return sessionStorage.getItem(KEYS.auth) === 'true';
}
export function logout() {
  sessionStorage.removeItem(KEYS.auth);
}
