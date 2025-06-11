// scripts/extractComponentData.js
const fs = require('fs');
const path = require('path');
const { parse } = require('@vue/compiler-sfc');

const components = [
  'About.vue',
  'Forum.vue',
  'SelfCare.vue',
  'Profile.vue',
  'Home.vue',
  'Resources.vue',
  'EmergencyResources.vue'
];

const basePath = path.join(__dirname, '../src/views');
const emergencyPath = path.join(__dirname, '../src/components/common');

const output = {};

components.forEach((component) => {
  const filePath = component === 'EmergencyResources.vue'
    ? path.join(emergencyPath, component)
    : path.join(basePath, component);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = parse(content);
    const template = parsed.descriptor.template?.content || '';

    const cleanedText = template
      .replace(/{{[^}]+}}/g, '')          // Remove Vue interpolations
      .replace(/<[^>]*>/g, '')            // Remove all HTML tags
      .replace(/&nbsp;/g, ' ')            // Replace common HTML entities
      .replace(/\s+/g, ' ')               // Collapse whitespace
      .trim();

    output[component] = {
      name: component.replace('.vue', ''),
      description: cleanedText || 'No description available'
    };
  } else {
    console.warn(`⚠️ File not found: ${filePath}`);
  }
});

const outputPath = path.join(__dirname, '../src/assets/componentData.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log('✅ All readable text extracted to componentData.json');
