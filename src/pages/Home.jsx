import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

const allProjects = [
  {
    id: 1,
    title: "Marketing Campaign",
    description: "Digital marketing campaign for Q1 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    status: "active"
  },
  {
    id: 2,
    title: "Website Redesign",
    description: "Complete overhaul of company website",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1200",
    status: "on-hold"
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "New mobile app for customer engagement",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
    status: "completed"
  },
  {
    id: 4,
    title: "E-commerce Platform",
    description: "Online shopping platform development",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
    status: "active"
  },
  {
    id: 5,
    title: "Social Media Integration",
    description: "Integrate social media platforms",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
    status: "completed"
  },
  {
    id: 6,
    title: "Customer Support System",
    description: "Implement new support ticketing system",
    image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=1200",
    status: "active"
  },
  {
    id: 7,
    title: "Data Analytics Dashboard",
    description: "Real-time analytics dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    status: "on-hold"
  },
  {
    id: 8,
    title: "Cloud Migration",
    description: "Migrate infrastructure to cloud",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200",
    status: "active"
  },
  {
    id: 9,
    title: "Security Audit",
    description: "Comprehensive security assessment",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    status: "completed"
  },
  {
    id: 10,
    title: "AI Integration",
    description: "Implement AI-powered features",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    status: "active"
  },
  {
    id: 11,
    title: "Payment Gateway",
    description: "Integrate multiple payment methods",
    image: "https://images.unsplash.com/photo-1559067096-49ebca3406aa?auto=format&fit=crop&q=80&w=1200",
    status: "on-hold"
  },
  {
    id: 12,
    title: "Mobile Optimization",
    description: "Optimize website for mobile devices",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=1200",
    status: "completed"
  },
  {
    id: 13,
    title: "Content Management",
    description: "New CMS implementation",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=1200",
    status: "active"
  },
  {
    id: 14,
    title: "Email Marketing",
    description: "Automated email campaign system",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1200",
    status: "on-hold"
  },
  {
    id: 15,
    title: "Performance Optimization",
    description: "Improve website performance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    status: "completed"
  }
];

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const statusColors = {
    'active': 'bg-green-100 text-green-800',
    'completed': 'bg-blue-100 text-blue-800',
    'on-hold': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl flex flex-col">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800">{project.title}</h2>
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
            {project.status}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <button
          onClick={() => navigate(`/project/${project.id}`)}
          className="w-full mt-auto flex items-center justify-center gap-2 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <span>Editar Tabla</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12;

  const filteredProjects = allProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Tablas UAT</h1>
          <button
            onClick={() => navigate('/project/new')}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Nueva Tabla
          </button>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Anterior
            </button>
            <span className="text-gray-600">
              Pagina {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}