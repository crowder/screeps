module.exports = function (creep) {
    // If we don't really exist yet, bail
    if (creep.spawning)
        return;
    
    if (creep.carryCapacity == 0) {
        console.log("BOGUS HARVESTER with 0 carry capacity -- add CARRY body part");
        return;
    }

    // If I have room to carry energy, go get some
  if (creep.carry.energy < creep.carryCapacity) {
    var sources = creep.room.find(FIND_SOURCES);
    
    creep.moveTo(sources[0]);
    creep.harvest(sources[0]);

    return;
  }

    // Otherwise, go to spawner and store it
  creep.moveTo(Game.spawns.Spawn1);
  creep.transferEnergy(Game.spawns.Spawn1)
}
