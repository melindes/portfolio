// Prépare la photo détourée (PNG transparent) pour l'affiche d'accueil :
// retire les marges transparentes et limite la hauteur. La source reste locale (assets-source/ n'est pas versionné).
import sharp from 'sharp';

const SOURCE = 'assets-source/portrait/photo-detouree.png';
const CIBLE = 'src/assets/portrait-detoure.png';

await sharp(SOURCE).trim().resize({ height: 1400, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(CIBLE);
console.log(`Portrait préparé → ${CIBLE}`);
