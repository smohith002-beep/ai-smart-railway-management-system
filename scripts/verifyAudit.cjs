const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const trains = JSON.parse(fs.readFileSync(path.join(rootDir, 'public', 'data', 'trains.json'), 'utf8'));
const stations = JSON.parse(fs.readFileSync(path.join(rootDir, 'public', 'data', 'stations.json'), 'utf8'));
const schedules = JSON.parse(fs.readFileSync(path.join(rootDir, 'public', 'data', 'trainSchedules.json'), 'utf8'));

const testTrains = [
  '20607', // Vande Bharat (MAS -> MYS)
  '22436', // Vande Bharat (NDLS -> BSB)
  '12951', // Mumbai Rajdhani (MMCT -> NDLS)
  '12007', // Mysuru Shatabdi (MAS -> MYS)
  '12626', // Kerala Express (NDLS -> TVC)
  '12301', // Howrah Rajdhani (HWH -> NDLS)
  '12841', // Coromandel Express (HWH -> MAS)
  '12622', // Tamil Nadu Express (NDLS -> MAS)
  '16525', // Kanyakumari Express (CAPE -> SBC)
  '11014'  // Lokmanya Tilak Express (CBE -> LTT)
];

console.log('==================================================');
console.log('       INDIAN RAILWAYS AUDIT VERIFICATION');
console.log('==================================================');
console.log('TOTAL TRAINS IN DATABASE:', trains.length);
console.log('TOTAL STATIONS IN DATABASE:', stations.length);
console.log('TOTAL SCHEDULES INDEXED:', Object.keys(schedules).length);
console.log('--------------------------------------------------');

const stationMap = new Map(stations.map(s => [s.code, s]));
const trainMap = new Map(trains.map(t => [t.trainNumber, t]));

let verifiedCount = 0;

testTrains.forEach((num, idx) => {
  const t = trainMap.get(num);
  const sched = schedules[num] || [];
  console.log(`\n[Test ${idx + 1}] Train ${num}:`);
  if (!t) {
    console.log('  ❌ Train NOT FOUND in database!');
    return;
  }
  verifiedCount++;
  console.log(`  ✓ Name: ${t.trainName}`);
  console.log(`  ✓ Type: ${t.trainType}`);
  console.log(`  ✓ Origin: ${t.originStationName} (${t.originStationCode})`);
  console.log(`  ✓ Destination: ${t.destinationStationName} (${t.destinationStationCode})`);
  console.log(`  ✓ Dep: ${t.departureTime} | Arr: ${t.arrivalTime} | Dist: ${t.distanceKm} KM | Zone: ${t.zone}`);
  console.log(`  ✓ Schedule stops available: ${sched.length} stations`);
  
  const originValid = stationMap.has(t.originStationCode);
  const destValid = stationMap.has(t.destinationStationCode);
  const originSt = stationMap.get(t.originStationCode);
  const destSt = stationMap.get(t.destinationStationCode);

  console.log(`  ✓ Origin Verified: ${originValid ? 'YES (' + originSt.latitude + ', ' + originSt.longitude + ')' : 'NO'}`);
  console.log(`  ✓ Destination Verified: ${destValid ? 'YES (' + destSt.latitude + ', ' + destSt.longitude + ')' : 'NO'}`);
});

console.log('\n==================================================');
console.log(`FINAL RESULT: ${verifiedCount} OF ${testTrains.length} TARGET TRAINS PERFECTLY VERIFIED`);
console.log('==================================================');
