import { readFileSync, writeFileSync } from 'fs';

// Curated Unsplash images — varied modern London student & city living shots
const imagePool = [
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800', // modern studio room
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800', // stylish apartment interior
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800', // modern bedroom
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800', // kitchen
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800', // living room
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800', // studio apartment
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800', // bright room
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800', // cozy room
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800', // modern apartment
  'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=800', // student room
  'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&q=80&w=800', // flat interior
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800', // cozy lounge
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800', // bright studio
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800', // designer flat
  'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=800', // bedroom view
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800', // living area
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800', // compact room
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800', // white studio
  'https://images.unsplash.com/photo-1560185127-6a99bf5a1a61?auto=format&fit=crop&q=80&w=800', // open plan
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800', // luxury room
  'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&q=80&w=800', // contemporary flat
  'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?auto=format&fit=crop&q=80&w=800', // study space
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800', // window seat
  'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=800', // city view room
  'https://images.unsplash.com/photo-1600566753151-384129cf4d3a?auto=format&fit=crop&q=80&w=800', // modern en-suite
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800', // sleek studio
  'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&q=80&w=800', // student dorm
  'https://images.unsplash.com/photo-1578091879915-0ca68e8b52d4?auto=format&fit=crop&q=80&w=800', // penthouse
  'https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&q=80&w=800', // scandi room
  'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&q=80&w=800', // minimal
];

const GENERIC_URL = 'https://images.unsplash.com/photo-1543393399-add3ef060b2d?auto=format&fit=crop&q=80&w=800';

let content = readFileSync('src/data/londonAccommodations.ts', 'utf8');

let idx = 0;
const updated = content.replace(
  /("imageUrl": )"https:\/\/images\.unsplash\.com\/photo-1543393399-add3ef060b2d[^"]+"/g,
  () => {
    const img = imagePool[idx % imagePool.length];
    idx++;
    return `"imageUrl": "${img}"`;
  }
);

writeFileSync('src/data/londonAccommodations.ts', updated, 'utf8');
console.log(`✅ Replaced ${idx} generic imageUrls with unique images`);
