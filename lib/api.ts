import { API_URL } from "./config";

async function fetchAPI(endpoint: string) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Teams
  async getTeamGroups() {
    return fetchAPI('/api/teams/groups');
  },

  async getTeamMemberBySlug(slug: string) {
    return fetchAPI(`/api/teams/members/slug/${slug}`);
  },

  // Projects
  async getProjects(status?: string) {
    const url = status ? `/api/projects?status=${status}` : '/api/projects';
    return fetchAPI(url);
  },

  async getProjectBySlug(slug: string) {
    return fetchAPI(`/api/projects/slug/${slug}`);
  },

  // Services
  async getServices() {
    return fetchAPI('/api/services');
  },

  // Pricing
  async getPricingPlans() {
    return fetchAPI('/api/pricing');
  },

  // Stats
  async getStats() {
    return fetchAPI('/api/stats');
  },

  // Testimonials
  async getTestimonials() {
    return fetchAPI('/api/testimonials');
  },

  // About
  async getAboutContent() {
    return fetchAPI('/api/about');
  },
};

