// Recadre la photo source (1920×2560) en portrait 4:5, de la tête aux genoux,
// sans la porte verte (à gauche) ni le décor de droite.
import sharp from 'sharp';

const SOURCE = 'assets-source/portrait/photo-originale.jpg';
const CIBLE = 'src/assets/portrait.jpg';
const ZONE = { left: 666, top: 461, width: 742, height: 928 };

await sharp(SOURCE).rotate().extract(ZONE).jpeg({ quality: 85 }).toFile(CIBLE);
console.log(`Portrait recadré → ${CIBLE}`);
