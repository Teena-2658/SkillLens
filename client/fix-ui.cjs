const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove Navbar import
  content = content.replace(/import Navbar from '([^']+)';\r?\n?/g, '');
  content = content.replace(/import Navbar from "([^"]+)";\r?\n?/g, '');
  
  // Remove <Navbar /> component usage
  content = content.replace(/<Navbar \/>\r?\n?/g, '');

  // Remove ml-[Xpx] spacing that pushes off screen
  content = content.replace(/lg:ml-\[[0-9]+px\]/g, '');

  // Also remove redundant spacing in Roadmap.jsx / Results.jsx
  // "min-h-screen font-sans bg-[#fbfbfa] lg:ml-[280px] relative overflow-hidden flex flex-col pt-32 pb-12 px-6"
  content = content.replace(/pt-32/g, 'pt-4');
  content = content.replace(/lg:ml-\[280px\]/g, ''); 
  content = content.replace(/min-h-screen relative flex flex-col items-center justify-center py-12/g, 'relative flex flex-col items-center justify-center py-6');

  // We should also remove `min-h-screen` from the pages wrapper because `main` in App.jsx sets properties.
  // Actually, keeping min-h-screen isn't harmful (it's min-height), so I'll leave it unless it causes issues.
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
