const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'public', 'data');
const trainsJsonPath = path.join(dataDir, 'trains.json');
const schedJsonPath = path.join(dataDir, 'trainSchedules.json');

const trains = JSON.parse(fs.readFileSync(trainsJsonPath, 'utf8'));
const schedules = JSON.parse(fs.readFileSync(schedJsonPath, 'utf8'));

// Extract trains from realIndianRailwaysDataset.ts
const datasetFilePath = path.join(rootDir, 'src', 'services', 'railwayApi', 'realIndianRailwaysDataset.ts');
const datasetContent = fs.readFileSync(datasetFilePath, 'utf-8');

const trainBlockRegex = /\{\s*id:\s*['"]tr_([^'"]+)['"],[\s\S]*?schedule:\s*\[([\s\S]*?)\]\s*\}/g;
let match;
let addedCount = 0;

const trainMap = new Map(trains.map(t => [t.trainNumber, t]));

while ((match = trainBlockRegex.exec(datasetContent)) !== null) {
  const block = match[0];
  const numMatch = block.match(/trainNumber:\s*['"]([^'"]+)['"]/);
  const nameMatch = block.match(/trainName:\s*['"]([^'"]+)['"]/);
  const typeMatch = block.match(/trainType:\s*['"]([^'"]+)['"]/);
  const srcCodeMatch = block.match(/originStationCode:\s*['"]([^'"]+)['"]/);
  const srcNameMatch = block.match(/originStationName:\s*['"]([^'"]+)['"]/);
  const dstCodeMatch = block.match(/destinationStationCode:\s*['"]([^'"]+)['"]/);
  const dstNameMatch = block.match(/destinationStationName:\s*['"]([^'"]+)['"]/);
  const zoneMatch = block.match(/zone:\s*['"]([^'"]+)['"]/);

  if (numMatch && nameMatch && srcCodeMatch && dstCodeMatch) {
    const num = numMatch[1].trim();
    const name = nameMatch[1].trim();
    const tType = typeMatch ? typeMatch[1].trim() : 'SUPERFAST';
    const srcCode = srcCodeMatch[1].trim();
    const srcName = srcNameMatch ? srcNameMatch[1].trim() : srcCode;
    const dstCode = dstCodeMatch[1].trim();
    const dstName = dstNameMatch ? dstNameMatch[1].trim() : dstCode;
    const zone = zoneMatch ? zoneMatch[1].trim() : 'IR';

    // Parse schedule items
    const schedBlock = match[2];
    const stopRegex = /\{\s*stationCode:\s*['"]([^'"]+)['"],\s*stationName:\s*['"]([^'"]+)['"],[\s\S]*?scheduledArrival:\s*['"]([^'"]+)['"],[\s\S]*?scheduledDeparture:\s*['"]([^'"]+)['"]/g;
    let stopMatch;
    const stops = [];
    while ((stopMatch = stopRegex.exec(schedBlock)) !== null) {
      stops.push({
        stationCode: stopMatch[1].trim(),
        stationName: stopMatch[2].trim(),
        scheduledArrival: stopMatch[3].trim(),
        scheduledDeparture: stopMatch[4].trim(),
        actualArrival: stopMatch[3].trim(),
        actualDeparture: stopMatch[4].trim(),
        platform: '1',
        distanceKm: 0,
        haltMinutes: 2,
        status: 'UPCOMING',
        dayCount: 1
      });
    }

    if (!trainMap.has(num)) {
      const trainObj = {
        trainNumber: num,
        trainName: name,
        trainType: tType,
        originStationCode: srcCode,
        originStationName: srcName,
        destinationStationCode: dstCode,
        destinationStationName: dstName,
        departureTime: stops[0]?.scheduledDeparture || '06:00',
        arrivalTime: stops[stops.length - 1]?.scheduledArrival || '18:00',
        durationHours: 6,
        durationMinutes: 0,
        distanceKm: 500,
        zone: zone,
        classes: tType === 'VANDE_BHARAT' ? 'EC, CC' : '1A, 2A, 3A, SL, 2S',
        returnTrainNumber: ''
      };
      trains.unshift(trainObj);
      trainMap.set(num, trainObj);
      addedCount++;
    }

    if (stops.length > 0) {
      schedules[num] = stops;
    }
  }
}

console.log('Added flagship trains to dataset:', addedCount);
console.log('New total trains in trains.json:', trains.length);

fs.writeFileSync(trainsJsonPath, JSON.stringify(trains));
fs.writeFileSync(schedJsonPath, JSON.stringify(schedules));
console.log('Successfully updated trains.json and trainSchedules.json');
