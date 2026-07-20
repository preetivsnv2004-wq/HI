// Slug -> page data map used by App.js (`PAGE_DATA[route]`).
// Each module default-exports a plain data object, so they are imported
// eagerly here; the previous lazy `() => import(...)` loaders were never
// awaited by App.js, which made every detail route crash on `page.icon`.
import digitalMarketing from './digital-marketing.js';
import ppcPaidAds from './ppc-paid-ads.js';
import socialMedia from './social-media.js';
import contentMarketing from './content-marketing.js';
import emailMarketing from './email-marketing.js';
import leadGeneration from './lead-generation.js';
import analyticsReporting from './analytics-reporting.js';
import webDevelopment from './web-development.js';
import appDevelopment from './app-development.js';
import customSoftware from './custom-software.js';
import apiIntegration from './api-integration.js';
import cloudSolutions from './cloud-solutions.js';
import websiteMaintenance from './website-maintenance.js';
import seoServices from './seo-services.js';
import uiuxDesign from './uiux-design.js';
import startups from './startups.js';
import eCommerce from './e-commerce.js';
import eCommerceSolution from './e-commerce-solution.js';
import enterprise from './enterprise.js';
import brandBuilding from './brand-building.js';
import performanceMarketing from './performance-marketing.js';
import healthcare from './healthcare.js';
import realEstate from './real-estate.js';
import webDevelopmentMumbai from './web-development-mumbai.js';
import digitalMarketingMumbai from './digital-marketing-mumbai.js';
import seoServicesMumbai from './seo-services-mumbai.js';
import appDevelopmentMumbai from './app-development-mumbai.js';
import webDevelopmentKandivali from './web-development-kandivali.js';
import seoServicesKandivali from './seo-services-kandivali.js';
import crmSoftware from './crm-software.js';
import salonSoftware from './salon-software.js';
import businessAutomation from './business-automation.js';

const PAGE_DATA = {
  'digital-marketing': digitalMarketing,
  'ppc-paid-ads': ppcPaidAds,
  'social-media': socialMedia,
  'content-marketing': contentMarketing,
  'email-marketing': emailMarketing,
  'lead-generation': leadGeneration,
  'analytics-reporting': analyticsReporting,
  'web-development': webDevelopment,
  'app-development': appDevelopment,
  'custom-software': customSoftware,
  'api-integration': apiIntegration,
  'cloud-solutions': cloudSolutions,
  'website-maintenance': websiteMaintenance,
  'seo-services': seoServices,
  'uiux-design': uiuxDesign,
  'startups': startups,
  'e-commerce': eCommerce,
  'solutions-e-commerce': eCommerceSolution,
  'enterprise': enterprise,
  'brand-building': brandBuilding,
  'performance-marketing': performanceMarketing,
  'healthcare': healthcare,
  'real-estate': realEstate,
  'web-development-mumbai': webDevelopmentMumbai,
  'digital-marketing-mumbai': digitalMarketingMumbai,
  'seo-services-mumbai': seoServicesMumbai,
  'app-development-mumbai': appDevelopmentMumbai,
  'web-development-kandivali': webDevelopmentKandivali,
  'seo-services-kandivali': seoServicesKandivali,
  'crm-software': crmSoftware,
  'salon-software': salonSoftware,
  'business-automation': businessAutomation,
};

export default PAGE_DATA;
