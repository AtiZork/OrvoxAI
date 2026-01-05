import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { join } from 'path';

const dbPath = process.env.DATABASE_URL || 'file:../dev.db';
const adapter = new PrismaLibSql({ url: dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

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
  console.log('   Password: admin123 (CHANGE THIS IN PRODUCTION!)');

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
      features: [
        'Request to unlimited logo',
        'Request to unlimited website',
        'Request upto 10 team',
        'Request to unlimited dashboard',
        '24/7 dedicated support system',
      ],
      highlight: false,
      order: 0,
    },
    {
      price: '599',
      period: 'month',
      features: [
        'Request to unlimited logo',
        'Request to unlimited website',
        'Request upto 10 team',
        'Request to unlimited dashboard',
        '24/7 dedicated support system',
      ],
      highlight: true,
      order: 1,
    },
    {
      price: '799',
      period: 'month',
      features: [
        'Request to unlimited logo',
        'Request to unlimited website',
        'Request upto 10 team',
        'Request to unlimited dashboard',
        '24/7 dedicated support system',
      ],
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
    {
      title: 'Blockchain Solutions',
      icon: 'Cpu',
      items: ['Secure infrastructure', 'Smart contracts', 'Crypto wallets', 'Custom platforms'],
      order: 0,
    },
    {
      title: 'AI & ML Solutions',
      icon: 'Brain',
      items: ['Predictive analytics', 'NLP', 'Custom ML models', 'AI automation'],
      order: 1,
    },
    {
      title: 'Web Development',
      icon: 'Code',
      items: ['Responsive design', 'Full-stack solutions', 'CMS integration', 'E-commerce'],
      order: 2,
    },
    {
      title: 'DevOps & Cloud',
      icon: 'Cloud',
      items: ['CI/CD pipelines', 'IaC (Terraform)', 'Cost optimization', 'Monitoring'],
      order: 3,
    },
    {
      title: 'Data Analysis',
      icon: 'Database',
      items: ['Web scraping', 'Data pipelines', 'Data cleaning', 'Analytics dashboards'],
      order: 4,
    },
    {
      title: 'App Development',
      icon: 'Smartphone',
      items: ['Flutter & React Native', 'Cross-platform', 'API integration', 'Performance optimization'],
      order: 5,
    },
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

  console.log('🎉 Seed completed!');
  console.log('\n📝 Next steps:');
  console.log('   1. Access admin panel at: http://localhost:3000/admin');
  console.log('   2. Login with: admin@orvox.ai / admin123');
  console.log('   3. Add your team members and projects through the admin panel');
  console.log('   4. CHANGE THE DEFAULT PASSWORD!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
