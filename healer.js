module.exports = function (creep) {
    // If we don't really exist yet, bail
    if (creep.spawning)
        return;

    // Otherwise, go to spawner and store it
    var targets = creep.pos.findClosestByRange(FIND_MY_CREEPS, { filter: isCreepDamaged });
    if (targets.length) {
        var target = targets[0];
        console.log("found target ...")
      var r1 = creep.moveTo(target);
      var r2 = creep.attack(target);
      console.log("r1: " + r1 + ", r2: " + r2);

      return;
    }
}

function isCreepDamaged(creep) {
}
