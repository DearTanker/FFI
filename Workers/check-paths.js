const fs = require('fs');
const path = require('path');

const root = path.join(process.cwd(), "..", "Filaments");
console.log("Calculated Root:", root);

if (!fs.existsSync(root)) {
  console.error("Root does not exist!");
} else {
  console.log("Root exists.");
  const vendors = fs.readdirSync(root);
  console.log("Vendors:", vendors);
  
  if (vendors.includes("Aliz")) {
    const alizPath = path.join(root, "Aliz");
    const types = fs.readdirSync(alizPath);
    console.log("Aliz types:", types);
    
    if (types.includes("PETG")) {
        const petgPath = path.join(alizPath, "PETG");
        const series = fs.readdirSync(petgPath);
        console.log("Aliz PETG series:", series);
        
        if (series.includes("Basic")) {
            const basicPath = path.join(petgPath, "Basic");
            const files = fs.readdirSync(basicPath);
            console.log("Aliz PETG Basic files:", files);
        }
    }
  }
}
