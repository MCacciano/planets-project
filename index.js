const fs = require('fs');
const { parse } = require('csv-parse');

const habitablePlanets = [];

// testing something

function isHabitablePlanet(planet) {
  if (!planet) return false;

  return (
    planet.koi_disposition === 'CONFIRMED' &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
}

fs.createReadStream('kepler_data.csv')
  .pipe(parse({ comment: '#', columns: true }))
  .on('data', data => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', err => {
    console.error(err);
  })
  .on('end', () => {
    console.log(habitablePlanets.map(({ kepler_name }) => kepler_name));
    console.log('done');
  });
