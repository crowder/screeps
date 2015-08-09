/* @flow */
var beginCpu = Game.getUsedCpu()

var harvester = require('./harvester.js');
var builder = require('./builder.js');
var warrior = require('./warrior.js');
var healer = require('./healer.js')

var postReqCpu = Game.getUsedCpu()

var harvesterCount = 0;
var builderCount = 0;
var warriorCount = 0;
var healerCount = 0;
for (var key in Game.creeps) {
    var creep = Game.creeps[key];
  if (creep.memory.role == 'harvester') {
    harvester(creep);
    harvesterCount++;

        continue;
  }

  if (creep.memory.role == 'builder') {
      builder(creep);
      builderCount++;

        continue;
  }
  
  if(creep.memory.role == 'warrior') {
      warrior(creep);
      warriorCount++;
  }
}

var postCreepCpu = Game.getUsedCpu();

for (var key in Game.spawns) {
    var spawn = Game.spawns[key];
    
    // If this spawn is doing something already, there's no point
    // in evaluating it.
    if (spawn.spawning)
        continue;

    // Init minimum counts?
    if (!spawn.memory.minHarvesters) {
        spawn.memory.minHarvesters = 1;
        spawn.memory.minWarriors = 3;
    }

    // Can/should we spawn a harvester?
    var harvesterParts = [ MOVE, MOVE, CARRY, WORK ];
    if (harvesterCount < spawn.memory.minHarvesters &&
        spawn.canCreateCreep(harvesterParts) == 0) { // Enough energy for a harvester
        spawn.createCreep(harvesterParts, undefined, { role: "harvester" });
        harvesterCount++;
        
        break;
    }
    
    // Can/should we spawn a warrior?
    var warriorParts = [ MOVE, MOVE, ATTACK, TOUGH ];
    if (warriorCount < spawn.memory.minWarriors &&
        spawn.canCreateCreep(warriorParts) == 0) {
        spawn.createCreep(warriorParts, undefined, { role: "warrior" });
        warriorCount++;
        
        // Let's have as many harvesters as warriors
        spawn.minHarvesters++;
        
        break;
    }
}

var postSpawnCpu = Game.getUsedCpu();

console.log("CPU --- c: " + (postCreepCpu - postReqCpu));
