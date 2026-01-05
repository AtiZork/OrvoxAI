"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  BarChart3, 
  MessageSquare, 
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Link as LinkIcon,
  XCircle,
  FolderPlus,
  Mail,
  Eye,
  Clock
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.orvoxai.com";

export default function AdminPanel() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [token, setToken] = useState<string | null>(null);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [data, setData] = useState<any>({
    teams: [],
    projects: [],
    services: [],
    pricing: [],
    stats: [],
    testimonials: [],
    about: [],
    contacts: [],
  });
  const [allMembers, setAllMembers] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editingType, setEditingType] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [skillsList, setSkillsList] = useState<string[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    if (storedToken) {
      setToken(storedToken);
      verifyToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Modal scroll lock - prevent background scrolling
  useEffect(() => {
    if (showModal) {
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent layout shift from scrollbar
      
      // Also prevent touch-based scrolling on mobile
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Restore scrolling
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [showModal]);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        loadDashboardData();
      } else {
        localStorage.removeItem("admin_token");
        setLoading(false);
      }
    } catch (error) {
      localStorage.removeItem("admin_token");
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { access_token } = await response.json();
        localStorage.setItem("admin_token", access_token);
        setToken(access_token);
        setIsAuthenticated(true);
        loadDashboardData();
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  const loadDashboardData = async () => {
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const [stats, teams, projects, services, pricing, testimonials, about, members, contacts] = await Promise.all([
        fetch(`${API_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }).then((r) => r.json()).catch(() => ({ teamMembers: 0, projects: 0, services: 0 })),
        fetch(`${API_URL}/api/teams/groups`).then((r) => r.json()).catch(() => []),
        fetch(`${API_URL}/api/projects`).then((r) => r.json()).catch(() => []),
        fetch(`${API_URL}/api/services`).then((r) => r.json()).catch(() => []),
        fetch(`${API_URL}/api/pricing`).then((r) => r.json()).catch(() => []),
        fetch(`${API_URL}/api/testimonials`).then((r) => r.json()).catch(() => []),
        fetch(`${API_URL}/api/about`).then((r) => r.json()).catch(() => []),
        fetch(`${API_URL}/api/teams/members`).then((r) => r.json()).catch(() => []),
        fetch(`${API_URL}/api/contact`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }).then((r) => r.json()).catch(() => []),
      ]);

      setDashboardStats(stats);
      setAllMembers(members);
      setData({ teams, projects, services, pricing, stats: [], testimonials, about, contacts });
      setLoading(false);
    } catch (error) {
      console.error("Failed to load data:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setToken(null);
    router.push("/");
  };

  // Team Group Operations
  const openTeamGroupModal = (group?: any) => {
    if (group) {
      setFormData({
        title: group.title,
        description: group.description,
        order: group.order || 0,
      });
      setEditing(group.id);
      setEditingType("team-group");
    } else {
      setFormData({ title: "", description: "", order: 0 });
      setEditing(null);
      setEditingType("team-group");
    }
    setShowModal(true);
  };

  const saveTeamGroup = async () => {
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const url = editing 
        ? `${API_URL}/api/teams/groups/${editing}`
        : `${API_URL}/api/teams/groups`;
      
      const response = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        loadDashboardData();
      } else {
        alert("Failed to save team group");
      }
    } catch (error) {
      alert("Error saving team group");
    }
  };

  const deleteTeamGroup = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team group?")) return;
    
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const response = await fetch(`${API_URL}/api/teams/groups/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        loadDashboardData();
      } else {
        alert("Failed to delete team group");
      }
    } catch (error) {
      alert("Error deleting team group");
    }
  };

  // Team Member Operations
  const openTeamMemberModal = (member?: any) => {
    if (member) {
      setSkillsList(Array.isArray(member.skills) ? member.skills : []);
      setFormData({
        name: member.name,
        role: member.role,
        slug: member.slug,
        image: member.image,
        bio: member.bio,
        icon: member.icon || "Code2",
        color: member.color || "text-cyan-400",
        groupId: member.groupId,
        linkedin: member.linkedin || "",
        twitter: member.twitter || "",
        github: member.github || "",
      });
      setEditing(member.id);
      setEditingType("team-member");
    } else {
      setSkillsList([""]);
      setFormData({
        name: "",
        role: "",
        slug: "",
        image: "",
        bio: "",
        icon: "Code2",
        color: "text-cyan-400",
        groupId: data.teams[0]?.id || "",
        linkedin: "",
        twitter: "",
        github: "",
      });
      setEditing(null);
      setEditingType("team-member");
    }
    setShowModal(true);
  };

  const uploadTeamImage = async (file: File) => {
    setUploading(true);
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/api/teams/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setFormData({ ...formData, image: `${API_URL}${result.url}` });
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const saveTeamMember = async () => {
    try {
      const authToken = token || localStorage.getItem("admin_token");
      
      // Filter out empty skills
      const filteredSkills = skillsList.filter((s) => s.trim());
      
      const payload = {
        ...formData,
        skills: JSON.stringify(filteredSkills),
        // Remove empty social links
        linkedin: formData.linkedin?.trim() || undefined,
        twitter: formData.twitter?.trim() || undefined,
        github: formData.github?.trim() || undefined,
      };

      const url = editing 
        ? `${API_URL}/api/teams/members/${editing}`
        : `${API_URL}/api/teams/members`;
      
      const response = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowModal(false);
        setSkillsList([]);
        loadDashboardData();
      } else {
        const error = await response.json();
        alert(`Failed to save team member: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("Error saving team member");
    }
  };

  const addSkill = () => {
    setSkillsList([...skillsList, ""]);
  };

  const removeSkill = (index: number) => {
    setSkillsList(skillsList.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...skillsList];
    updated[index] = value;
    setSkillsList(updated);
  };

  const deleteTeamMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const response = await fetch(`${API_URL}/api/teams/members/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        loadDashboardData();
      } else {
        alert("Failed to delete team member");
      }
    } catch (error) {
      alert("Error deleting team member");
    }
  };

  // Project Operations
  const openProjectModal = (project?: any) => {
    if (project) {
      // Parse technologies if it's a string
      let techs = [];
      if (typeof project.technologies === 'string') {
        try {
          techs = JSON.parse(project.technologies);
        } catch {
          techs = project.technologies.split(',').map((t: string) => t.trim()).filter((t: string) => t);
        }
      } else if (Array.isArray(project.technologies)) {
        techs = project.technologies;
      }
      
      setFormData({
        title: project.title,
        slug: project.slug,
        category: project.category,
        description: project.description,
        status: project.status,
        technologies: techs.length > 0 ? techs : [""],
        image: project.image || "",
        year: project.year || "",
        memberIds: project.members?.map((m: any) => m.memberId || m.id) || [],
      });
      setEditing(project.id);
      setEditingType("project");
    } else {
      setFormData({
        title: "",
        slug: "",
        category: "",
        description: "",
        status: "ongoing",
        technologies: [""],
        image: "",
        year: "",
        memberIds: [],
      });
      setEditing(null);
      setEditingType("project");
    }
    setShowModal(true);
  };

  const uploadProjectImage = async (file: File) => {
    setUploading(true);
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/api/projects/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setFormData({ ...formData, image: `${API_URL}${result.url}` });
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const saveProject = async () => {
    try {
      const authToken = token || localStorage.getItem("admin_token");
      
      // Filter empty technologies and stringify
      const filteredTechs = formData.technologies.filter((tech: string) => tech.trim() !== "");
      
      const payload = {
        ...formData,
        technologies: JSON.stringify(filteredTechs),
        memberIds: formData.memberIds || [],
      };

      const url = editing 
        ? `${API_URL}/api/projects/${editing}`
        : `${API_URL}/api/projects`;
      
      const response = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowModal(false);
        loadDashboardData();
      } else {
        const error = await response.json();
        alert(`Failed to save project: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("Error saving project");
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        loadDashboardData();
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      alert("Error deleting project");
    }
  };

  // Service Operations
  const openServiceModal = (service?: any) => {
    if (service) {
      let items = [];
      if (typeof service.items === 'string') {
        try {
          items = JSON.parse(service.items);
        } catch {
          items = service.items.split(',').map((t: string) => t.trim()).filter((t: string) => t);
        }
      } else if (Array.isArray(service.items)) {
        items = service.items;
      }
      
      setFormData({
        title: service.title,
        icon: service.icon,
        items: items.length > 0 ? items : [""],
        order: service.order || 0,
      });
      setEditing(service.id);
      setEditingType("service");
    } else {
      setFormData({
        title: "",
        icon: "Code",
        items: [""],
        order: 0,
      });
      setEditing(null);
      setEditingType("service");
    }
    setShowModal(true);
  };

  const saveService = async () => {
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const filteredItems = formData.items.filter((item: string) => item.trim() !== "");
      
      const payload = {
        ...formData,
        items: JSON.stringify(filteredItems),
      };

      const url = editing 
        ? `${API_URL}/api/services/${editing}`
        : `${API_URL}/api/services`;
      
      const response = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowModal(false);
        loadDashboardData();
      } else {
        const error = await response.json();
        alert(`Failed to save service: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("Error saving service");
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const response = await fetch(`${API_URL}/api/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        loadDashboardData();
      } else {
        alert("Failed to delete service");
      }
    } catch (error) {
      alert("Error deleting service");
    }
  };

  // Pricing Operations
  const openPricingModal = (plan?: any) => {
    if (plan) {
      let features = [];
      if (typeof plan.features === 'string') {
        try {
          features = JSON.parse(plan.features);
        } catch {
          features = plan.features.split(',').map((t: string) => t.trim()).filter((t: string) => t);
        }
      } else if (Array.isArray(plan.features)) {
        features = plan.features;
      }
      
      setFormData({
        price: plan.price,
        period: plan.period,
        features: features.length > 0 ? features : [""],
        highlight: plan.highlight || false,
        order: plan.order || 0,
      });
      setEditing(plan.id);
      setEditingType("pricing");
    } else {
      setFormData({
        price: "",
        period: "month",
        features: [""],
        highlight: false,
        order: 0,
      });
      setEditing(null);
      setEditingType("pricing");
    }
    setShowModal(true);
  };

  const savePricing = async () => {
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const filteredFeatures = formData.features.filter((feat: string) => feat.trim() !== "");
      
      const payload = {
        ...formData,
        features: JSON.stringify(filteredFeatures),
      };

      const url = editing 
        ? `${API_URL}/api/pricing/${editing}`
        : `${API_URL}/api/pricing`;
      
      const response = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowModal(false);
        loadDashboardData();
      } else {
        const error = await response.json();
        alert(`Failed to save pricing plan: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("Error saving pricing plan");
    }
  };

  const deletePricing = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;
    
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const response = await fetch(`${API_URL}/api/pricing/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        loadDashboardData();
      } else {
        alert("Failed to delete pricing plan");
      }
    } catch (error) {
      alert("Error deleting pricing plan");
    }
  };

  // Testimonial Operations
  const openTestimonialModal = (testimonial?: any) => {
    if (testimonial) {
      setFormData({
        text: testimonial.text,
        author: testimonial.author,
        company: testimonial.company || "",
        image: testimonial.image || "",
        verified: testimonial.verified !== undefined ? testimonial.verified : true,
        order: testimonial.order || 0,
      });
      setEditing(testimonial.id);
      setEditingType("testimonial");
    } else {
      setFormData({
        text: "",
        author: "",
        company: "",
        image: "",
        verified: true,
        order: 0,
      });
      setEditing(null);
      setEditingType("testimonial");
    }
    setShowModal(true);
  };

  const saveTestimonial = async () => {
    try {
      const authToken = token || localStorage.getItem("admin_token");

      const url = editing 
        ? `${API_URL}/api/testimonials/${editing}`
        : `${API_URL}/api/testimonials`;
      
      const response = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        loadDashboardData();
      } else {
        const error = await response.json();
        alert(`Failed to save testimonial: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("Error saving testimonial");
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const response = await fetch(`${API_URL}/api/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        loadDashboardData();
      } else {
        alert("Failed to delete testimonial");
      }
    } catch (error) {
      alert("Error deleting testimonial");
    }
  };

  // Contact Message Operations
  const markContactAsRead = async (id: string) => {
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const response = await fetch(`${API_URL}/api/contact/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        loadDashboardData();
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const deleteContactMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const authToken = token || localStorage.getItem("admin_token");
      const response = await fetch(`${API_URL}/api/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        loadDashboardData();
      } else {
        alert("Failed to delete message");
      }
    } catch (error) {
      alert("Error deleting message");
    }
  };

  const toggleMemberInProject = (memberId: string) => {
    const currentIds = formData.memberIds || [];
    if (currentIds.includes(memberId)) {
      setFormData({ ...formData, memberIds: currentIds.filter((id: string) => id !== memberId) });
    } else {
      setFormData({ ...formData, memberIds: [...currentIds, memberId] });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8 text-cyan-400">Orvox Admin</h2>
        <nav className="space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: BarChart3 },
            { id: "teams", label: "Teams", icon: Users },
            { id: "projects", label: "Projects", icon: Briefcase },
            { id: "services", label: "Services", icon: Settings },
            { id: "pricing", label: "Pricing", icon: DollarSign },
            { id: "testimonials", label: "Testimonials", icon: MessageSquare },
            { id: "contacts", label: "Contact Messages", icon: Mail },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowModal(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "text-gray-400 hover:bg-zinc-800"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
            {dashboardStats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <div className="text-3xl font-bold text-cyan-400">{dashboardStats.teamMembers || 0}</div>
                  <div className="text-gray-400 mt-2">Team Members</div>
                </div>
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <div className="text-3xl font-bold text-cyan-400">{dashboardStats.projects || 0}</div>
                  <div className="text-gray-400 mt-2">Projects</div>
                </div>
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <div className="text-3xl font-bold text-cyan-400">{dashboardStats.services || 0}</div>
                  <div className="text-gray-400 mt-2">Services</div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "teams" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold">Teams</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => openTeamGroupModal()}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg flex items-center gap-2 border border-zinc-700"
                >
                  <FolderPlus className="w-5 h-5" />
                  Add Group
                </button>
                <button
                  onClick={() => openTeamMemberModal()}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Member
                </button>
              </div>
            </div>
            <div className="space-y-6">
              {data.teams.map((group: any) => (
                <div key={group.id} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{group.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{group.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openTeamGroupModal(group)}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTeamGroup(group.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {group.members?.map((member: any) => (
                      <div key={member.id} className="flex justify-between items-center p-4 bg-zinc-800 rounded-lg">
                        <div className="flex items-center gap-4">
                          {member.image && (
                            <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                          )}
                          <div>
                            <div className="font-bold">{member.name}</div>
                            <div className="text-sm text-gray-400">{member.role}</div>
                            {member.projects && member.projects.length > 0 && (
                              <div className="text-xs text-cyan-400 mt-1">
                                {member.projects.length} project{member.projects.length !== 1 ? "s" : ""}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openTeamMemberModal(member)}
                            className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTeamMember(member.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(!group.members || group.members.length === 0) && (
                      <div className="text-gray-500 text-center py-4">No members in this group</div>
                    )}
                  </div>
                </div>
              ))}
              {data.teams.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No team groups yet. Create one to get started!
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold">Projects</h1>
              <button
                onClick={() => openProjectModal()}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Project
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.projects.map((project: any) => (
                <div key={project.id} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-bold text-xl">{project.title}</div>
                      <div className="text-gray-400 text-sm">{project.category}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          project.status === "featured" ? "bg-cyan-500/20 text-cyan-400" :
                          project.status === "ongoing" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-green-500/20 text-green-400"
                        }`}>
                          {project.status}
                        </span>
                        {project.year && (
                          <span className="text-gray-500 text-xs">{project.year}</span>
                        )}
                      </div>
                      {project.members && project.members.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {project.members.slice(0, 3).map((pm: any) => (
                            <span key={pm.memberId || pm.id} className="text-xs px-2 py-1 bg-zinc-800 rounded text-gray-400">
                              {pm.member?.name || "Member"}
                            </span>
                          ))}
                          {project.members.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-zinc-800 rounded text-gray-400">
                              +{project.members.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => openProjectModal(project)}
                      className="flex-1 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-3 py-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {data.projects.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No projects yet. Create one to get started!
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold">Services</h1>
              <button 
                onClick={() => openServiceModal()}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Service
              </button>
            </div>
            <div className="space-y-4">
              {data.services.map((service: any) => (
                <div key={service.id} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-xl">{service.title}</div>
                    <div className="text-gray-400">
                      {typeof service.items === 'string' ? JSON.parse(service.items || '[]').length : (service.items?.length || 0)} items
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openServiceModal(service)}
                      className="p-2 hover:bg-zinc-700 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteService(service.id)}
                      className="p-2 hover:bg-red-500/20 rounded text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold">Pricing Plans</h1>
              <button 
                onClick={() => openPricingModal()}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Plan
              </button>
            </div>
            <div className="space-y-4">
              {data.pricing.map((plan: any) => (
                <div key={plan.id} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-xl">${plan.price} / {plan.period}</div>
                    <div className="text-gray-400">
                      {typeof plan.features === 'string' ? JSON.parse(plan.features || '[]').length : (plan.features?.length || 0)} features
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openPricingModal(plan)}
                      className="p-2 hover:bg-zinc-700 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deletePricing(plan.id)}
                      className="p-2 hover:bg-red-500/20 rounded text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "testimonials" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold">Testimonials</h1>
              <button 
                onClick={() => openTestimonialModal()}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Testimonial
              </button>
            </div>
            <div className="space-y-4">
              {data.testimonials.map((testimonial: any) => (
                <div key={testimonial.id} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-gray-400 text-sm line-clamp-2">{testimonial.text}</div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openTestimonialModal(testimonial)}
                      className="p-2 hover:bg-zinc-700 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteTestimonial(testimonial.id)}
                      className="p-2 hover:bg-red-500/20 rounded text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contacts" && (
          <div>
            <h1 className="text-4xl font-bold mb-6">Contact Messages</h1>
            <div className="space-y-4">
              {data.contacts && data.contacts.length > 0 ? (
                data.contacts.map((contact: any) => (
                  <div 
                    key={contact.id} 
                    className={`bg-zinc-900 p-6 rounded-xl border ${
                      contact.read ? 'border-zinc-800' : 'border-cyan-500/50 bg-cyan-500/5'
                    } transition-all`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="font-bold text-lg">{contact.name}</div>
                          {!contact.read && (
                            <span className="px-2 py-1 bg-cyan-500 text-black text-xs font-bold rounded-full">
                              NEW
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${contact.email}`} className="hover:text-cyan-400">
                              {contact.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {new Date(contact.createdAt).toLocaleDateString()} {new Date(contact.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                        {contact.subject && (
                          <div className="text-cyan-400 font-medium mb-2">Subject: {contact.subject}</div>
                        )}
                        <div className="text-gray-300 whitespace-pre-wrap">{contact.message}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {!contact.read && (
                          <button 
                            onClick={() => markContactAsRead(contact.id)}
                            className="p-2 hover:bg-cyan-500/20 rounded text-cyan-400 transition-colors"
                            title="Mark as read"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => deleteContactMessage(contact.id)}
                          className="p-2 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No contact messages yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-hidden"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-zinc-900 rounded-2xl border border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editing ? "Edit" : "Add"} {
                  editingType === "team-group" ? "Team Group" : 
                  editingType === "team-member" ? "Team Member" : 
                  editingType === "project" ? "Project" :
                  editingType === "service" ? "Service" :
                  editingType === "pricing" ? "Pricing Plan" :
                  editingType === "testimonial" ? "Testimonial" :
                  ""
                }
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Team Group Form */}
              {editingType === "team-group" && (
                <>
                  <div>
                    <label className="block text-gray-400 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      placeholder="e.g., Leadership, Development"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Description</label>
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      rows={3}
                      placeholder="Description of the team group"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Order</label>
                    <input
                      type="number"
                      value={formData.order || 0}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </>
              )}

              {/* Team Member Form */}
              {editingType === "team-member" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Role</label>
                      <input
                        type="text"
                        value={formData.role || ""}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Slug</label>
                      <input
                        type="text"
                        value={formData.slug || ""}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        placeholder="e.g., john-doe"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Team Group</label>
                      <select
                        value={formData.groupId || ""}
                        onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      >
                        {data.teams.map((group: any) => (
                          <option key={group.id} value={group.id}>{group.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Image</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.image || ""}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        placeholder="Image URL or upload file"
                      />
                      <label className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 cursor-pointer flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) uploadTeamImage(file);
                          }}
                        />
                      </label>
                    </div>
                    {formData.image && (
                      <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
                    )}
                    {uploading && <div className="text-cyan-400 text-sm mt-2">Uploading...</div>}
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Bio</label>
                    <textarea
                      value={formData.bio || ""}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      rows={4}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-gray-400">Skills</label>
                      <button
                        type="button"
                        onClick={addSkill}
                        className="flex items-center gap-1 px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-black rounded-lg text-sm font-medium transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Skill
                      </button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {skillsList.map((skill, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => updateSkill(index, e.target.value)}
                            className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                            placeholder={`Skill ${index + 1}`}
                          />
                          {skillsList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSkill(index)}
                              className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Icon</label>
                      <input
                        type="text"
                        value={formData.icon || "Code2"}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        placeholder="Code2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Color</label>
                      <input
                        type="text"
                        value={formData.color || "text-cyan-400"}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        placeholder="text-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Year</label>
                      <input
                        type="text"
                        value={formData.year || ""}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        placeholder="2024"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2">LinkedIn</label>
                      <input
                        type="url"
                        value={formData.linkedin || ""}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Twitter</label>
                      <input
                        type="url"
                        value={formData.twitter || ""}
                        onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">GitHub</label>
                      <input
                        type="url"
                        value={formData.github || ""}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Project Form */}
              {editingType === "project" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Slug</label>
                      <input
                        type="text"
                        value={formData.slug || ""}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        placeholder="e.g., my-awesome-project"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Category</label>
                      <input
                        type="text"
                        value={formData.category || ""}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        placeholder="e.g., Web Development"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Status</label>
                      <select
                        value={formData.status || "ongoing"}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="featured">Featured</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Description</label>
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Technologies</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {(formData.technologies || [""]).map((tech: string, index: number) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={tech}
                            onChange={(e) => {
                              const newTechs = [...formData.technologies];
                              newTechs[index] = e.target.value;
                              setFormData({ ...formData, technologies: newTechs });
                            }}
                            className="flex-grow px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                            placeholder="e.g., React"
                          />
                          {formData.technologies.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newTechs = formData.technologies.filter((_: string, i: number) => i !== index);
                                setFormData({ ...formData, technologies: newTechs });
                              }}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, technologies: [...formData.technologies, ""] })}
                      className="mt-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Add Technology
                    </button>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Image</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.image || ""}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        placeholder="Image URL or upload file"
                      />
                      <label className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 cursor-pointer flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) uploadProjectImage(file);
                          }}
                        />
                      </label>
                    </div>
                    {formData.image && (
                      <img src={formData.image} alt="Preview" className="mt-2 w-full max-w-md h-48 object-cover rounded-lg" />
                    )}
                    {uploading && <div className="text-cyan-400 text-sm mt-2">Uploading...</div>}
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Year</label>
                    <input
                      type="text"
                      value={formData.year || ""}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Team Members</label>
                    <div className="max-h-48 overflow-y-auto border border-zinc-700 rounded-lg p-4 bg-zinc-800">
                      {allMembers.length === 0 ? (
                        <div className="text-gray-500 text-center py-4">No team members available</div>
                      ) : (
                        <div className="space-y-2">
                          {allMembers.map((member: any) => (
                            <label
                              key={member.id}
                              className="flex items-center gap-3 p-2 hover:bg-zinc-700 rounded-lg cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={formData.memberIds?.includes(member.id) || false}
                                onChange={() => toggleMemberInProject(member.id)}
                                className="w-4 h-4 text-cyan-500 bg-zinc-800 border-zinc-700 rounded focus:ring-cyan-500"
                              />
                              <div className="flex items-center gap-3 flex-1">
                                {member.image && (
                                  <img src={member.image} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                                )}
                                <div>
                                  <div className="font-medium">{member.name}</div>
                                  <div className="text-xs text-gray-400">{member.role}</div>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                    {formData.memberIds && formData.memberIds.length > 0 && (
                      <div className="mt-2 text-sm text-cyan-400">
                        {formData.memberIds.length} member{formData.memberIds.length !== 1 ? "s" : ""} selected
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Service Form */}
              {editingType === "service" && (
                <>
                  <div>
                    <label className="block text-gray-400 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      placeholder="e.g., Blockchain Solutions"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Icon (Lucide icon name)</label>
                    <input
                      type="text"
                      value={formData.icon || ""}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      placeholder="e.g., Code, Smartphone, Database"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Service Items</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {(formData.items || [""]).map((item: string, index: number) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const newItems = [...formData.items];
                              newItems[index] = e.target.value;
                              setFormData({ ...formData, items: newItems });
                            }}
                            className="flex-grow px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                            placeholder="e.g., Smart Contract Development"
                          />
                          {formData.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newItems = formData.items.filter((_: string, i: number) => i !== index);
                                setFormData({ ...formData, items: newItems });
                              }}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, items: [...formData.items, ""] })}
                      className="mt-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Add Item
                    </button>
                  </div>
                </>
              )}

              {/* Pricing Form */}
              {editingType === "pricing" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Price</label>
                      <input
                        type="text"
                        value={formData.price || ""}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        placeholder="e.g., 99"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Period</label>
                      <input
                        type="text"
                        value={formData.period || ""}
                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        placeholder="e.g., month, year"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-gray-400 mb-2">
                      <input
                        type="checkbox"
                        checked={formData.highlight || false}
                        onChange={(e) => setFormData({ ...formData, highlight: e.target.checked })}
                        className="w-4 h-4 text-cyan-500 bg-zinc-800 border-zinc-700 rounded focus:ring-cyan-500"
                      />
                      Highlight this plan (Most Popular)
                    </label>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Features</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {(formData.features || [""]).map((feature: string, index: number) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => {
                              const newFeatures = [...formData.features];
                              newFeatures[index] = e.target.value;
                              setFormData({ ...formData, features: newFeatures });
                            }}
                            className="flex-grow px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                            placeholder="e.g., Unlimited projects"
                          />
                          {formData.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newFeatures = formData.features.filter((_: string, i: number) => i !== index);
                                setFormData({ ...formData, features: newFeatures });
                              }}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, features: [...formData.features, ""] })}
                      className="mt-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Add Feature
                    </button>
                  </div>
                </>
              )}

              {/* Testimonial Form */}
              {editingType === "testimonial" && (
                <>
                  <div>
                    <label className="block text-gray-400 mb-2">Author Name</label>
                    <input
                      type="text"
                      value={formData.author || ""}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      placeholder="e.g., John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Company (optional)</label>
                    <input
                      type="text"
                      value={formData.company || ""}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      placeholder="e.g., Tech Corp"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Testimonial Text</label>
                    <textarea
                      value={formData.text || ""}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      rows={4}
                      placeholder="Enter the testimonial..."
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-gray-400 mb-2">
                      <input
                        type="checkbox"
                        checked={formData.verified !== undefined ? formData.verified : true}
                        onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                        className="w-4 h-4 text-cyan-500 bg-zinc-800 border-zinc-700 rounded focus:ring-cyan-500"
                      />
                      Verified Client
                    </label>
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4 border-t border-zinc-800">
                <button
                  onClick={() => {
                    if (editingType === "team-group") saveTeamGroup();
                    else if (editingType === "team-member") saveTeamMember();
                    else if (editingType === "project") saveProject();
                    else if (editingType === "service") saveService();
                    else if (editingType === "pricing") savePricing();
                    else if (editingType === "testimonial") saveTestimonial();
                  }}
                  className="flex-1 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
