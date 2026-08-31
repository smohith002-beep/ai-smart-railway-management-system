// ===============================================================
// AI SMART RAILWAY MANAGEMENT SYSTEM - SITEMAP & STATIC SEO PRERENDER
// Developer: MOHITH S | smohith002@gmail.com
// ===============================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SITE_URL = (process.env.VITE_SITE_URL || 'https://smartrailway.in').replace(/\/$/, '');
const TODAY = new Date().toISOString().split('T')[0];

console.log(`[SEO Engine] Generating Sitemap, Robots.txt & Static Prerender for ${SITE_URL}...`);

// 1. Extract stations and trains from public/data or realIndianRailwaysDataset.ts
let stations = [];
let trains = [];

const dataDir = path.join(rootDir, 'public', 'data');
const stationsJsonPath = path.join(dataDir, 'stations.json');
const trainsJsonPath = path.join(dataDir, 'trains.json');

if (fs.existsSync(stationsJsonPath) && fs.existsSync(trainsJsonPath)) {
  try {
    stations = JSON.parse(fs.readFileSync(stationsJsonPath, 'utf-8'));
    trains = JSON.parse(fs.readFileSync(trainsJsonPath, 'utf-8'));
  } catch (e) {
    console.warn('Failed parsing JSON data in scripts, fallback to regex', e);
  }
}

// Fallback regex if files not present
if (stations.length === 0 || trains.length === 0) {
  const datasetFilePath = path.join(rootDir, 'src', 'services', 'railwayApi', 'realIndianRailwaysDataset.ts');
  const datasetContent = fs.readFileSync(datasetFilePath, 'utf-8');

  const stationRegex = /{\s*id:\s*['"]st_([^'"]+)['"],\s*code:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"],\s*zone:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = stationRegex.exec(datasetContent)) !== null) {
    stations.push({
      id: match[1],
      code: match[2].toUpperCase().trim(),
      name: match[3].trim(),
      zone: match[4].trim()
    });
  }

  const trainRegex = /{\s*id:\s*['"]tr_([^'"]+)['"],\s*trainNumber:\s*['"]([^'"]+)['"],\s*trainName:\s*['"]([^'"]+)['"],\s*trainType:\s*['"]([^'"]+)['"],\s*originStationCode:\s*['"]([^'"]+)['"],\s*originStationName:\s*['"]([^'"]+)['"],\s*destinationStationCode:\s*['"]([^'"]+)['"],\s*destinationStationName:\s*['"]([^'"]+)['"]/g;
  while ((match = trainRegex.exec(datasetContent)) !== null) {
    trains.push({
      id: match[1],
      trainNumber: match[2].trim(),
      trainName: match[3].trim(),
      trainType: match[4].trim(),
      originStationCode: match[5].trim(),
      originStationName: match[6].trim(),
      destinationStationCode: match[7].trim(),
      destinationStationName: match[8].trim()
    });
  }
}

console.log(`[SEO Engine] Extracted ${stations.length} authentic stations & ${trains.length} authentic trains.`);

// 2. Generate XML Sitemap
const coreRoutes = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: '/booking', changefreq: 'daily', priority: '0.95' },
  { path: '/trains', changefreq: 'hourly', priority: '0.9' },
  { path: '/stations', changefreq: 'daily', priority: '0.9' },
  { path: '/map', changefreq: 'daily', priority: '0.8' },
  { path: '/cinematic', changefreq: 'daily', priority: '0.8' },
  { path: '/command', changefreq: 'weekly', priority: '0.7' },
  { path: '/copilot', changefreq: 'weekly', priority: '0.7' },
  { path: '/analytics', changefreq: 'weekly', priority: '0.7' },
  { path: '/attendance', changefreq: 'weekly', priority: '0.6' },
  { path: '/duty', changefreq: 'weekly', priority: '0.6' }
];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

// Add Core Routes
coreRoutes.forEach(r => {
  sitemapXml += `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>
`;
});

// Add Real Train Pages (up to top 500 in primary sitemap for crawler efficiency)
trains.slice(0, 500).forEach(t => {
  sitemapXml += `  <url>
    <loc>${SITE_URL}/train/${t.trainNumber}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.85</priority>
  </url>
`;
});

// Add Real Station Pages (up to top 500 in primary sitemap)
stations.slice(0, 500).forEach(s => {
  sitemapXml += `  <url>
    <loc>${SITE_URL}/station/${s.code.toLowerCase()}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.75</priority>
  </url>
`;
});

sitemapXml += `</urlset>\n`;

const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);
}
console.log(`[SEO Engine] Successfully generated sitemap.xml.`);

// 3. Generate Robots.txt
const robotsTxt = `# ===============================================================
# AI SMART RAILWAY MANAGEMENT SYSTEM - ROBOTS.TXT
# ===============================================================
User-agent: *
Allow: /
Allow: /trains
Allow: /stations
Allow: /map
Allow: /cinematic
Allow: /booking
Allow: /train/
Allow: /station/
Disallow: /simulation
Disallow: /audit

Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);
}
console.log(`[SEO Engine] Successfully generated robots.txt.`);
