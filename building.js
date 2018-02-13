




//create some structures to hold information about the rules
var elevators = [];
var floorCount = 50;
var elevatorCount = 3;
var openTimeDuration = 15;
var mainteneceModeLimit = 100;
//count of how many floors justify a idle elevator starting vs stopping a moving one because moving is too far.
var floorCountIdleOverridesMoving = 10;
var floorCountStopsIdleOverridesMoving = 2;

//create an object holding properties of each elevator
function elevatorPosition(elevatorId, direction, currentFloor, isStopped, isOpen)
{
    this.elevatorId = elevatorId;
    this.direction = direction;
    this.currentFloor = currentFloor;
    this.isStopped - isStopped;
    this.isOpen = isOpen;
    this.isInMainteneceMode = false;
    this.floorsToStop = [];
    //default this to 0 and only set when an elevator is opened
    this.openTimeRemaining = 0;
    //start at zero trips
    this.tripCount = 0;
    //start at zero floorsTraveled
    this.floorsTraveld = 0;
    
    
}

//load up each elevator and initialize to bottom floor
for(int i = 0; i < elevatorCount; i++)
{
    elevators.push(elevatorPosition("Elevator " + i, 0, 1, true, false );
}

function callButtonPressed(floorId)
{
    var elevatorHere = false;
    //check to see if any elevators are on this floor open.. if so extend the open timer
    foreach(var el in elevators)
    {
        if (el.isInMainteneceMode === false)
        {
            if(el.currentFloor === floorId && isOpen === false)
            {
                //open the elevator 
                el.isOpen = true;
                el.openTimeRemaining = true;
                elevatorHere = true;
            }
            else if (el.currentFloor === floorId && isOpen)
            {
                //just reset the open timer
                el.openTimeRemaining = openTimeDuration;
                elevatorHere = true;
            }
        }
        
    }
    if (elevatorHere === true)
    {
        removeFloorStop(floorId);
    }
    else
    {
        FindOptimalElevator(floorId);
    }
}

function findNearestIdleElevator(floorId)
{

}

function findNearestMoveingElevator(floorId)
{

}

function removeFloorStop(floorId)
{
    foreach(var el in elevators)
    {
        
        //check if any others were going to stop here. if the are.. tell them to ignore the floor.
    }
}

//move as specific elevator specified direction
function moveElevator(elevatorId, direction)
{

}




