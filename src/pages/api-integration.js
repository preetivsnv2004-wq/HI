import { Zap } from 'lucide-react';

const ApiIntegrationPage = {
    title: 'API Integration',
    kicker: 'Connected systems',
    icon: Zap,
    gradient: 'from-primary to-primary-light',
    description: 'Reliable integrations that connect your website, CRM, payment gateway, marketing tools, inventory, booking systems, and internal software.',
    bullets: ['CRM Integration', 'Payment Gateway', 'WhatsApp/API', 'Inventory Sync', 'Form Automation', 'Webhook Setup'],
    stats: ['Faster handoff', 'Reduced errors', 'Connected data'],
    animation: 'orbit',
    keyPoints: [
      { title: 'System Planning', desc: 'We identify what data needs to move, where it should go, and what should trigger each action.' },
      { title: 'Secure Connections', desc: 'API keys, validation, and error handling are implemented carefully to keep workflows reliable.' },
      { title: 'Automation Logic', desc: 'Leads, orders, notifications, and status updates can move between tools without manual copying.' },
      { title: 'Testing & Monitoring', desc: 'We test success paths, failed requests, duplicate submissions, and edge cases before launch.' },
    ],
    process: ['Integration Map', 'API Setup', 'Testing', 'Monitoring'],
  };

export default ApiIntegrationPage;
