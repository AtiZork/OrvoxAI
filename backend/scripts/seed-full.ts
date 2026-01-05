import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const dbPath = process.env.DATABASE_URL || 'file:../dev.db';
const adapter = new PrismaLibSql({ url: dbPath });
const prisma = new PrismaClient({ adapter });

// Map icon names
const iconMap: Record<string, string> = {
  'Star': 'Star',
  'Code2': 'Code2',
  'Briefcase': 'Briefcase',
};

async function main() {
  console.log('🌱 Starting full seed with team data...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@orvox.ai' },
    update: {},
    create: {
      email: 'admin@orvox.ai',
      password: hashedPassword,
      name: 'Admin User',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create stats
  const stats = [
    { label: 'Projects Delivered', value: '100', suffix: '+', icon: 'Users', order: 0 },
    { label: 'Client Funding Raised', value: '35', prefix: '$', suffix: 'M+', icon: 'Rocket', order: 1 },
    { label: 'Years Experience', value: '9', suffix: '+', icon: 'Code2', order: 2 },
  ];

  for (const stat of stats) {
    await prisma.stat.upsert({
      where: { id: `stat-${stat.label}` },
      update: stat,
      create: { ...stat, id: `stat-${stat.label}` },
    });
  }
  console.log('✅ Stats created');

  // Create pricing plans
  const plans = [
    {
      price: '499',
      period: 'month',
      features: ['Request to unlimited logo', 'Request to unlimited website', 'Request upto 10 team', 'Request to unlimited dashboard', '24/7 dedicated support system'],
      highlight: false,
      order: 0,
    },
    {
      price: '599',
      period: 'month',
      features: ['Request to unlimited logo', 'Request to unlimited website', 'Request upto 10 team', 'Request to unlimited dashboard', '24/7 dedicated support system'],
      highlight: true,
      order: 1,
    },
    {
      price: '799',
      period: 'month',
      features: ['Request to unlimited logo', 'Request to unlimited website', 'Request upto 10 team', 'Request to unlimited dashboard', '24/7 dedicated support system'],
      highlight: false,
      order: 2,
    },
  ];

  for (const plan of plans) {
    await prisma.pricingPlan.create({
      data: {
        ...plan,
        features: JSON.stringify(plan.features),
      },
    });
  }
  console.log('✅ Pricing plans created');

  // Create services
  const services = [
    { title: 'Blockchain Solutions', icon: 'Cpu', items: ['Secure infrastructure', 'Smart contracts', 'Crypto wallets', 'Custom platforms'], order: 0 },
    { title: 'AI & ML Solutions', icon: 'Brain', items: ['Predictive analytics', 'NLP', 'Custom ML models', 'AI automation'], order: 1 },
    { title: 'Web Development', icon: 'Code', items: ['Responsive design', 'Full-stack solutions', 'CMS integration', 'E-commerce'], order: 2 },
    { title: 'DevOps & Cloud', icon: 'Cloud', items: ['CI/CD pipelines', 'IaC (Terraform)', 'Cost optimization', 'Monitoring'], order: 3 },
    { title: 'Data Analysis', icon: 'Database', items: ['Web scraping', 'Data pipelines', 'Data cleaning', 'Analytics dashboards'], order: 4 },
    { title: 'App Development', icon: 'Smartphone', items: ['Flutter & React Native', 'Cross-platform', 'API integration', 'Performance optimization'], order: 5 },
  ];

  for (const service of services) {
    await prisma.service.create({
      data: {
        ...service,
        items: JSON.stringify(service.items),
      },
    });
  }
  console.log('✅ Services created');

  // Create about content
  await prisma.aboutContent.create({
    data: {
      title: 'Bridging the gap between AI and Business',
      content: `OrvoxAI is a forward-thinking AI and data solutions startup with a mission to make advanced technology practical, impactful, and scalable for businesses.

We empower organizations by unlocking efficiency, reducing costs, and accelerating growth through tailored AI, automation, and full-stack solutions.`,
      order: 0,
    },
  });
  console.log('✅ About content created');

  // Create Team Groups and Members
  const teamGroups = [
    {
      title: 'Leadership',
      description: 'Guiding the vision and strategy of Orvox AI.',
      order: 0,
      members: [
        {
          name: 'Atizaz Abid',
          role: 'CEO & Founder',
          slug: 'atizaz-abid',
          image: '/team/ceo.png',
          bio: 'Leading Orvox AI with a vision to revolutionize the digital landscape through artificial intelligence. With extensive experience in tech leadership and strategic planning, Atizaz drives innovation and growth across all company initiatives.',
          skills: ['Visionary Leadership', 'AI Strategy', 'Product Innovation', 'Business Development'],
          icon: 'Star',
          color: 'text-amber-400',
          linkedin: '',
          twitter: '',
          github: '',
          projects: [
            {
              title: 'Orvox AI Platform',
              slug: 'orvox-ai-platform',
              category: 'AI Strategy',
              description: 'Leading the development of Orvox AI\'s flagship platform, revolutionizing how businesses leverage artificial intelligence.',
              status: 'featured',
              technologies: ['AI Strategy', 'Product Design', 'Business Intelligence'],
              year: '2024',
            },
            {
              title: 'Global Expansion Initiative',
              slug: 'global-expansion-initiative',
              category: 'Business Growth',
              description: 'Spearheading Orvox AI\'s expansion into international markets with strategic partnerships.',
              status: 'ongoing',
              technologies: ['Market Analysis', 'Partnership Development'],
              year: '2025',
            },
          ],
        },
      ],
    },
    {
      title: 'Development',
      description: 'The engineers building the core of our technology.',
      order: 1,
      members: [
        {
          name: 'Muhammad Musaddaq Abbas',
          role: 'Senior Software Engineer',
          slug: 'musaddaq-abbas',
          image: '/team/musaddaq.jpeg',
          bio: 'Expert in building scalable web applications and system foundations. With years of experience in full-stack development, Musaddaq specializes in creating robust backend systems and cloud infrastructure.',
          skills: ['Python', 'Django', 'Django Rest Framework', 'Github', 'GitLab', 'Bitbucket', 'Node.js', 'AWS', 'SaaS'],
          icon: 'Code2',
          color: 'text-cyan-400',
          projects: [
            {
              title: 'Campaign Automation',
              slug: 'campaign-automation',
              category: 'SaaS Platform',
              description: 'Developed a comprehensive campaign automation platform enabling businesses to manage multi-channel marketing campaigns efficiently.',
              status: 'featured',
              technologies: ['Django', 'Python', 'AWS', 'PostgreSQL'],
              year: '2024',
            },
            {
              title: 'Pronto Mobile',
              slug: 'pronto-mobile',
              category: 'Mobile Backend',
              description: 'Built scalable backend infrastructure for a real-time mobile communication platform.',
              status: 'completed',
              technologies: ['Node.js', 'MongoDB', 'WebSocket'],
              year: '2023',
            },
            {
              title: 'Solivox',
              slug: 'solivox',
              category: 'Voice Technology',
              description: 'Developed voice-powered communication solutions with advanced NLP capabilities.',
              status: 'ongoing',
              technologies: ['Python', 'Django Rest Framework', 'AWS Lambda'],
              year: '2025',
            },
          ],
        },
        {
          name: 'Abdullah Aftab',
          role: 'Senior AI Engineer',
          slug: 'abdullah-aftab',
          image: '/team/Abdullah.JPG',
          bio: 'A dedicated and results-driven AI Engineer with over 1.5 years of hands-on experience in developing cutting-edge AI agents, implementing Retrieval-Augmented Generation (RAG) techniques, and optimizing intelligent workflows using tools like n8n.',
          skills: ['Python', 'JavaScript', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'spaCy', 'n8n', 'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Digital Ocean', 'BeautifulSoup', 'Scrapy', 'Selenium'],
          icon: 'Code2',
          color: 'text-cyan-400',
          projects: [
            {
              title: 'Campaign Automation AI',
              slug: 'campaign-automation-ai',
              category: 'AI Automation',
              description: 'Implemented intelligent automation systems using RAG techniques and AI agents for campaign optimization.',
              status: 'featured',
              technologies: ['Python', 'TensorFlow', 'n8n', 'MongoDB'],
              year: '2024',
            },
            {
              title: 'Pronto Mobile Intelligence',
              slug: 'pronto-mobile-intelligence',
              category: 'Machine Learning',
              description: 'Developed ML models for user behavior prediction and personalized content delivery.',
              status: 'completed',
              technologies: ['PyTorch', 'Scikit-learn', 'AWS'],
              year: '2023',
            },
            {
              title: 'Solivox NLP Engine',
              slug: 'solivox-nlp-engine',
              category: 'Natural Language Processing',
              description: 'Building advanced NLP capabilities using spaCy and custom models for voice processing.',
              status: 'ongoing',
              technologies: ['spaCy', 'Python', 'Docker'],
              year: '2025',
            },
            {
              title: 'Web Intelligence Scraper',
              slug: 'web-intelligence-scraper',
              category: 'Data Engineering',
              description: 'Created robust web scraping systems for large-scale data extraction and analysis.',
              status: 'featured',
              technologies: ['Scrapy', 'BeautifulSoup', 'Selenium', 'PostgreSQL'],
              year: '2024',
            },
          ],
        },
        {
          name: 'Zaryab Anwar',
          role: 'Senior Full Stack Engineer',
          slug: 'zaryab-anwar',
          image: '/team/Zaryab.jpeg',
          bio: 'A Senior Full-Stack Engineer and AI Systems Architect with over 5 years of professional experience building highly scalable, distributed, and intelligent applications.',
          skills: ['React.js', 'Next.js', 'Django', 'Node.js', 'NestJS', 'Flask', 'FastAPI', 'AI/ML/DL', 'RAG/AGENTS', 'MICROSERVICES', 'Express.js', 'Kafka', 'Redis', 'RabbitMQ', 'Kubernetes'],
          icon: 'Code2',
          color: 'text-cyan-400',
          projects: [
            {
              title: 'Client Dashboard V2',
              slug: 'client-dashboard-v2',
              category: 'Full Stack',
              description: 'Architected and developed a comprehensive client dashboard with real-time analytics, microservices architecture, and AI-powered insights.',
              status: 'featured',
              technologies: ['Next.js', 'NestJS', 'Kubernetes', 'Redis', 'PostgreSQL'],
              year: '2024',
            },
            {
              title: 'AI Agent Platform',
              slug: 'ai-agent-platform',
              category: 'AI Systems',
              description: 'Building multi-agent automation systems with RAG pipelines and LLM integration.',
              status: 'ongoing',
              technologies: ['FastAPI', 'LangChain', 'Vector DB', 'Kafka'],
              year: '2025',
            },
            {
              title: 'Microservices Infrastructure',
              slug: 'microservices-infrastructure',
              category: 'DevOps',
              description: 'Designed cloud-native microservices architecture with event-driven patterns and automated deployment.',
              status: 'featured',
              technologies: ['Docker', 'Kubernetes', 'AWS', 'RabbitMQ'],
              year: '2024',
            },
          ],
        },
        {
          name: 'Sufyan',
          role: 'Senior Full Stack Engineer',
          slug: 'sufyan',
          image: '/team/Sufiyan.png',
          bio: 'A Senior Full-Stack Engineer and AI Systems Architect with over 5 years of professional experience building highly scalable, distributed, and intelligent applications.',
          skills: ['React.js', 'Next.js', 'Django', 'Node.js', 'NestJS', 'Flask', 'FastAPI', 'AI/ML/DL', 'RAG/AGENTS', 'MICROSERVICES', 'Express.js'],
          icon: 'Code2',
          color: 'text-cyan-400',
          projects: [
            {
              title: 'Enterprise SaaS Platform',
              slug: 'enterprise-saas-platform',
              category: 'Full Stack',
              description: 'Developed enterprise-grade SaaS solution with advanced authentication, billing, and multi-tenancy.',
              status: 'featured',
              technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis'],
              year: '2024',
            },
            {
              title: 'AI-Powered Analytics',
              slug: 'ai-powered-analytics',
              category: 'AI/ML',
              description: 'Built intelligent analytics platform with machine learning insights and predictive modeling.',
              status: 'ongoing',
              technologies: ['Python', 'FastAPI', 'TensorFlow', 'React'],
              year: '2025',
            },
          ],
        },
        {
          name: 'Haroon Sajid',
          role: 'AI Engineer',
          slug: 'haroon-sajid',
          image: '/team/Haroon.jpg',
          bio: 'AI graduate with one year of experience in Python, machine learning, and backend development. Skilled in FastAPI, Django, React, and modern AI tools like LangChain and LangGraph.',
          skills: ['Python', 'Django', 'FastAPI', 'React', 'AI/ML', 'RAG Agent', 'n8n automations', 'Node.js', 'MICROSERVICES', 'Express.js', 'PostgreSQL', 'MongoDB', 'LangChain'],
          icon: 'Code2',
          color: 'text-cyan-400',
          projects: [
            {
              title: 'Scalable Infrastructure',
              slug: 'scalable-infrastructure',
              category: 'Backend',
              description: 'Designed and implemented scalable backend infrastructure with microservices architecture.',
              status: 'featured',
              technologies: ['FastAPI', 'PostgreSQL', 'Docker', 'Redis'],
              year: '2024',
            },
            {
              title: 'AI Workflow Automation',
              slug: 'ai-workflow-automation',
              category: 'AI/Automation',
              description: 'Created automated AI workflows using LangChain and n8n for business process optimization.',
              status: 'ongoing',
              technologies: ['LangChain', 'n8n', 'Python', 'MongoDB'],
              year: '2025',
            },
            {
              title: 'RAG Agent System',
              slug: 'rag-agent-system',
              category: 'AI',
              description: 'Developed Retrieval-Augmented Generation system for intelligent document processing.',
              status: 'ongoing',
              technologies: ['LangGraph', 'FastAPI', 'Vector DB'],
              year: '2025',
            },
          ],
        },
        {
          name: 'Muhammad Hamza Sajid',
          role: 'Software Engineer',
          slug: 'hamza-sajid',
          image: '/team/Hamza.jpeg',
          bio: 'A software engineer with experience in Python, JavaScript, and modern web frameworks. Specialized in building scalable, secure, and efficient software solutions with a focus on data processing and automation.',
          skills: ['Python', 'JavaScript', 'Node.js', 'NestJS', 'Django', 'Angular', 'React', 'Pandas', 'NumPy', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'BeautifulSoup', 'Scrapy', 'Selenium'],
          icon: 'Code2',
          color: 'text-cyan-400',
          projects: [
            {
              title: 'HomeEnergy',
              slug: 'homeenergy',
              category: 'IoT Platform',
              description: 'Developed energy monitoring and management platform for smart homes with real-time analytics.',
              status: 'featured',
              technologies: ['NestJS', 'Angular', 'MongoDB', 'AWS IoT'],
              year: '2024',
            },
            {
              title: 'IoT Data Migrations',
              slug: 'iot-data-migrations',
              category: 'Data Engineering',
              description: 'Implemented large-scale data migration system for IoT devices with zero downtime.',
              status: 'completed',
              technologies: ['Python', 'Pandas', 'PostgreSQL', 'Docker'],
              year: '2023',
            },
            {
              title: 'Bailey Time Series',
              slug: 'bailey-time-series',
              category: 'Data Analytics',
              description: 'Built time series analysis platform for financial data with predictive capabilities.',
              status: 'ongoing',
              technologies: ['Python', 'NumPy', 'React', 'MongoDB'],
              year: '2025',
            },
          ],
        },
      ],
    },
    {
      title: 'Business & Growth',
      description: 'Driving partnerships and market expansion.',
      order: 2,
      members: [
        {
          name: 'Muhammad Sajid',
          role: 'Business Development Executive',
          slug: 'muhammad-sajid',
          image: '/team/Sajid.png',
          bio: 'Business Development Executive at OrvoxAI, focusing on identifying growth opportunities, managing client acquisition through digital platforms, and fostering long-term partnerships.',
          skills: ['Growth Strategy', 'Client Acquisition', 'Software Quality Assurance', 'CRM Management'],
          icon: 'Briefcase',
          color: 'text-emerald-400',
          projects: [
            {
              title: 'Global Client Acquisition',
              slug: 'global-client-acquisition',
              category: 'Business Development',
              description: 'Leading client acquisition initiatives across multiple digital platforms, securing partnerships with enterprise clients.',
              status: 'featured',
              technologies: ['CRM', 'Sales Strategy', 'Client Relations'],
              year: '2024',
            },
            {
              title: 'Partnership Development Program',
              slug: 'partnership-development-program',
              category: 'Strategic Partnerships',
              description: 'Developing strategic partnerships with technology companies to expand service offerings.',
              status: 'ongoing',
              technologies: ['Business Strategy', 'Networking'],
              year: '2025',
            },
          ],
        },
        {
          name: 'Fiza Sardar',
          role: 'Senior Sales Executive',
          slug: 'fiza-sardar',
          image: '/team/Fiza.jpeg',
          bio: 'Business Developer Lead with extensive experience in lead generation, strategic planning, and B2B sales. With over 6.7k followers on LinkedIn and expertise in profile optimization.',
          skills: ['Business Development', 'Lead Generation', 'Strategic Planning', 'LinkedIn Optimization', 'B2B Sales', 'Upwork', 'Client Relationship Management', 'Team Management'],
          icon: 'Briefcase',
          color: 'text-emerald-400',
          projects: [
            {
              title: 'North America Market Expansion',
              slug: 'north-america-market-expansion',
              category: 'Market Growth',
              description: 'Leading market expansion initiatives in North America, establishing key partnerships and client relationships.',
              status: 'featured',
              technologies: ['B2B Sales', 'Market Analysis', 'LinkedIn'],
              year: '2024',
            },
            {
              title: 'Upwork Growth Strategy',
              slug: 'upwork-growth-strategy',
              category: 'Digital Sales',
              description: 'Developing and executing growth strategies on Upwork platform to increase client acquisition.',
              status: 'ongoing',
              technologies: ['Upwork', 'Client Relations', 'Proposal Writing'],
              year: '2025',
            },
            {
              title: 'LinkedIn Lead Generation',
              slug: 'linkedin-lead-generation',
              category: 'Digital Marketing',
              description: 'Creating and managing high-impact LinkedIn campaigns for B2B lead generation.',
              status: 'featured',
              technologies: ['LinkedIn', 'Content Strategy', 'Lead Generation'],
              year: '2024',
            },
          ],
        },
        {
          name: 'Anum',
          role: 'Business Analyst',
          slug: 'anum',
          image: '/team/anum.jpeg',
          bio: 'Business Developer with experience in email marketing, B2B sales, and client relationship management. Specialized in LinkedIn expertise, meeting coordination, and managing client relationships.',
          skills: ['Business Development', 'Email Marketing', 'B2B Sales', 'Client Relationship Management', 'LinkedIn Expert', 'Meeting Coordination', 'Team Management'],
          icon: 'Briefcase',
          color: 'text-emerald-400',
          projects: [
            {
              title: 'Growth Strategy 2026',
              slug: 'growth-strategy-2026',
              category: 'Strategic Planning',
              description: 'Developing comprehensive growth strategy for 2026 with focus on market expansion and client retention.',
              status: 'ongoing',
              technologies: ['Business Analysis', 'Market Research', 'CRM'],
              year: '2025',
            },
            {
              title: 'Email Marketing Automation',
              slug: 'email-marketing-automation',
              category: 'Digital Marketing',
              description: 'Implemented automated email marketing campaigns with high conversion rates.',
              status: 'featured',
              technologies: ['Email Marketing', 'Marketing Automation', 'Analytics'],
              year: '2024',
            },
            {
              title: 'Client Success Program',
              slug: 'client-success-program',
              category: 'Client Relations',
              description: 'Established client success program to improve retention and satisfaction rates.',
              status: 'ongoing',
              technologies: ['Client Management', 'Customer Success'],
              year: '2025',
            },
          ],
        },
      ],
    },
  ];

  // Create groups, members, and projects
  for (const groupData of teamGroups) {
    const { members, ...groupInfo } = groupData;

    const group = await prisma.teamGroup.create({
      data: groupInfo,
    });
    console.log(`✅ Created group: ${group.title}`);

    for (const memberData of members) {
      const { projects, ...memberInfo } = memberData;

      const member = await prisma.teamMember.create({
        data: {
          ...memberInfo,
          skills: JSON.stringify(memberInfo.skills),
          groupId: group.id,
        },
      });
      console.log(`   ✅ Created member: ${member.name}`);

      // Create projects and link to member
      for (const projectData of projects) {
        const { technologies, ...projectInfo } = projectData;

        // Check if project already exists
        let project = await prisma.project.findUnique({
          where: { slug: projectInfo.slug },
        });

        if (!project) {
          project = await prisma.project.create({
            data: {
              ...projectInfo,
              technologies: JSON.stringify(technologies),
            },
          });
          console.log(`      ✅ Created project: ${project.title}`);
        }

        // Link member to project
        await prisma.projectMember.create({
          data: {
            projectId: project.id,
            memberId: member.id,
          },
        });
      }
    }
  }

  console.log('\n🎉 Full seed completed with team data!');
  console.log('\n📝 Next steps:');
  console.log('   1. Access admin panel at: http://localhost:3000/admin');
  console.log('   2. Login with: admin@orvox.ai / admin123');
  console.log('   3. CHANGE THE DEFAULT PASSWORD!');
  console.log('\n   Team members and projects are now available!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

