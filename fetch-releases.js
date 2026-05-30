import fs from 'fs';
import path from 'path';
import https from 'https';

// Helper to parse repo path from GitHub URL
function getRepoPath(githubUrl) {
  if (!githubUrl) return '';
  let clean = githubUrl.trim().replace(/\/+$/, '');
  
  if (clean.toLowerCase().endsWith('.git')) {
    clean = clean.slice(0, -4);
  }

  if (clean.includes('github.com')) {
    try {
      const url = new URL(clean);
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        return `${parts[0]}/${parts[1]}`;
      }
    } catch (e) {
      // fallback
    }
  }
  return clean;
}

// Promisified HTTP request
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Build-Time-Fetcher'
      }
    };

    // Use GitHub Token if available to avoid rate limits during build
    if (process.env.GITHUB_TOKEN) {
      options.headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Failed to parse JSON'));
          }
        } else {
          // If 404, we just resolve with empty array (no releases yet)
          if (res.statusCode === 404) {
            resolve([]);
          } else {
            reject(new Error(`HTTP ${res.statusCode} - ${res.statusMessage}`));
          }
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching GitHub releases at build time...');
  
  const productsPath = path.join(process.cwd(), 'public', 'products.json');
  const outputPath = path.join(process.cwd(), 'public', 'releases.json');
  
  if (!fs.existsSync(productsPath)) {
    console.error('products.json not found!');
    process.exit(1);
  }
  
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  const releasesData = {};
  
  for (const product of products) {
    const repo = getRepoPath(product.githubUrl);
    if (!repo) continue;
    
    console.log(`Fetching releases for ${repo}...`);
    try {
      const releases = await fetchJson(`https://api.github.com/repos/${repo}/releases`);
      releasesData[repo] = releases;
      console.log(`✓ Got ${Array.isArray(releases) ? releases.length : 0} releases`);
    } catch (error) {
      console.error(`✗ Error fetching for ${repo}:`, error.message);
      // Don't fail the entire build, just store empty or null
      releasesData[repo] = []; 
    }
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(releasesData, null, 2));
  console.log('Releases data saved to public/releases.json');
}

main();
