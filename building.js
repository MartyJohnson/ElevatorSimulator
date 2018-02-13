




//create some structures to hold information about the rules
var elevators = [];
var floorCount = 6;
var timeToPauseOnFloor = 30;
var elevatorCount = 3;


//create an object holding properties of each elevator
function elevatorPosition(elevatorId, direction, currentFloor, isStopped, isOpen)
{
    this.elevatorId = elevatorId;
    this.direction = direction;
    this.currentFloor = currentFloor;
    this.isStopped - isStopped;
    this.isOpen = isOpen;
}

//load up each elevator and initialize to bottom floor
for(int i = 0; i < elevatorCount; i++)
{
    elevators.push(elevatorPosition("Elevator " + i, 0, 1, true, false );
}


