const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Ensure dist/assets exists and copy assets
const copyRecursiveSync = (src, dest) => {
    if (!fs.existsSync(src)) return;
    const stats = fs.statSync(src);
    const isDirectory = stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};
copyRecursiveSync(path.join(srcDir, 'assets'), path.join(distDir, 'assets'));

// Read layout and components
const mainLayout = fs.readFileSync(path.join(srcDir, 'layouts', 'main.html'), 'utf-8');
const headerHtml = fs.readFileSync(path.join(srcDir, 'components', 'header.html'), 'utf-8');
const footerHtml = fs.readFileSync(path.join(srcDir, 'components', 'footer.html'), 'utf-8');

// Parse metadata from page
function extractMetadata(content) {
    const meta = { title: '', description: '', jsonLd: '', body: content };
    
    // Extract title
    const titleMatch = content.match(/<!-- TITLE: (.*?) -->/);
    if (titleMatch) meta.title = titleMatch[1];
    
    // Extract description
    const descMatch = content.match(/<!-- DESC: (.*?) -->/);
    if (descMatch) meta.description = descMatch[1];
    
    // Extract JSON-LD
    const jsonLdMatch = content.match(/<!-- JSON_LD:\s*([\s\S]*?)\s*-->/);
    if (jsonLdMatch) meta.jsonLd = `<script type="application/ld+json">\n${jsonLdMatch[1].trim()}\n</script>`;

    // Remove meta comments from body
    meta.body = content
        .replace(/<!-- TITLE: .*? -->/, '')
        .replace(/<!-- DESC: .*? -->/, '')
        .replace(/<!-- JSON_LD:[\s\S]*?-->/, '')
        .trim();

    return meta;
}

// Build pages
const pagesDir = path.join(srcDir, 'pages');
const pages = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));

pages.forEach(page => {
    const pagePath = path.join(pagesDir, page);
    const pageContent = fs.readFileSync(pagePath, 'utf-8');
    
    const { title, description, jsonLd, body } = extractMetadata(pageContent);
    
    let finalHtml = mainLayout
        .replace('{{title}}', title || 'Nexus B2B')
        .replace('{{meta_description}}', description || '')
        .replace('{{json_ld}}', jsonLd || '')
        .replace('{{header}}', headerHtml)
        .replace('{{footer}}', footerHtml)
        .replace('{{content}}', body);

    fs.writeFileSync(path.join(distDir, page), finalHtml, 'utf-8');
    console.log(`Built ${page}`);
});

console.log('Build complete.');
