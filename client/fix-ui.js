const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove Navbar import
  content = content.replace(/import Navbar from '[^']+';\r?\n?/g, '');
  content = content.replace(/import Navbar from "[^"]+";\r?\n?/g, '');
  
  // Remove <Navbar /> component usage
  content = content.replace(/<Navbar \/>\r?\n?/g, '');

  // Remove ml-[Xpx] spacing
  content = content.replace(/lg:ml-\[[0-9]+px\]/g, '');

  // Modify "proper" layout wrappers
  // Example: <div className="min-h-screen font-sans bg-[#fbfbfa] lg:ml-[280px] relative overflow-hidden flex flex-col pt-32 pb-12 px-6">
  content = content.replace(/min-h-screen relative flex flex-col items-center justify-center py-12/g, 'relative flex flex-col items-center justify-center py-6');

  // Dashboard uses 'min-h-screen relative'
  // Others use 'min-h-screen font-sans bg-[...] relative overflow-hidden flex flex-col pt-32 pb-12 px-6'
  
  // Remove padding that pushes components too far down because of no Navbar
  content = content.replace(/pt-32/g, 'pt-4');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
