
var events = require('events');
var eventEmitter = new events.EventEmitter();

//create some structures to hold information about the rules
var elevators = [];
var floors = [];
var floorCount = 50;
var elevatorCount = 3;
var openTimeDuration = 15;
var extendDoorOpenTime = 5;
var mainteneceModeLimit = 100;
//count of how many floors justify a idle elevator starting vs stopping a moving one because moving is too far.
var floorCountIdleOverridesMoving = 10;
var floorCountStopsIdleOverridesMoving = 2;


//create an object holding properties of each elevator
function elevatorCar(elevatorId, direction, currentFloor, isStopped, isOpen)
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

// this is the function that will handle the up or down call buttons from the outside of the elevator on each floor
function callButtonPressed(floorId, direction)
{
    var elevatorHere = false;
    //check to see if any elevators are on this floor open.. if so extend the open timer
    foreach(var el in elevators)
    {
        if (el.isInMainteneceMode === false)
        {
            // make sure the elevator is going the correct way
            if (el.direction === 0 or el.direction === direction)
            {
                if(el.currentFloor === floorId && isOpen === false)
                {
                    //open the elevator 
                    el.isOpen = true;
                    el.openTimeRemaining = openTimeDuration;
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
        
    }
    if (elevatorHere === true)
    {
        removeFloorStop(floorId);
    }
    else
    {
        findOptimalElevator(floorId);
    }
}


function findOptimalElevator(floorId);
{
    //do logic to find nearest idle or moving.. rank by logic to what is best

}

function findNearestIdleElevator(floorId)
{

}

function findNearestMoveingElevator(floorId)
{

}

//mmmm maybe need to handle this if it was called externally separate from internally as internally you must stop at every floor but externally you can be serviced by another elevator
function removeFloorStop(floorId, direction)
{

    foreach(var el in elevators)
    {
        //check if any others were going to stop here. if the are.. tell them to ignore the floor.
        //i am sure there is an array.contain type method.. not sure what it is so did a loop
        if (el.direction === direction && checkElevatorFloorArray(el.floorsToStop, floorId ) === true )
        {
            //remove this floor to stop as it was done by one closer

        }
        
    }
}

//this is the function that will be clicked when the rider chooses a floor or floors within the elevator
function elevatorChooseFloor(elevator, floorId)
{
    //add the floor that was chosen for this elevator
    elevator.floorsToStop.push(floorId);
}


function elvatorHoldDoorsOpenLonger(elevator)
{
    elevator.openTimeRemaining  += openTimeRemaining;
}


//move as specific elevator specified direction
function moveElevator(elevator)
{
    //up will add 1.. down will "add" -1
    eventEmitter.emit('floorPosition',elevator.curFloor+=elevator.direction);

}

function floorDisplay (elevatorId, currentFloor)
{
    this.elevatorId = elevatorId;
    this.currentFloor = currentFloor;
}

function buildingFloor(floorId, hasUpButton, hasDownButton)
{
    this.floorId = floorId;
    this.hasUpButton = hasUpButton;
    this.hasDownButton = hasDownButton;
    this.elevatorDisplays = [];    
}


function createBuiding(floorCount, elevatorCount)
{
    //load up each elevator and initialize to bottom floor
    for(int i = 0; i < elevatorCount; i++)
    {
        elevators.push(elevatorCar("Elevator " + i, 0, 1, true, false );
    }

    for(int i = 1; i <= floorCount; i++)
    {
        var curFloor = buildingFloor(i+1,true, true);

        if (i === 1 )
        {
            // bottom floor cannot have a down button
            curFloor.hasDownButton = false;            
        }
        if (i === floorCount)
        {
            //top floor cannot have an up button     
            curFloor.hasUpButton = false;       
        }

        foreach(var el in elevators)
        {
            curFloor.elevatorDisplays.push(floorDisplay(el.elevatorId, el.currentFloor));
        }
        
        floors.push(curFloor);

    }

    
}



// Bind the elevatorDoorsOpen event with the elevatorStoppedListener function
eventEmitter.addListener('elevatorDoorsOpen', elevatorDoorsOpenListener);

// Bind the elevatorDoorsClose event with the elevatorDoorsCloseListener function
eventEmitter.addListener('elevatorDoorsClose', elevatorDoorsCloseListener);

// Bind the elevatorStopped event with the elevatorStoppedListener function
eventEmitter.addListener('elevatorStopped', elevatorStoppedListener);

// Bind the floorPosition event with the floorPositionListener function
eventEmitter.addListener('floorPosition', floorPositionListener);


var elevatorStoppedListener = function elevatorStoppedListener(elevator){
    //open doors and set timer
    elevator.isOpen = true;
    eventEmitter.emit('elevatorDoorsOpen', elevator);)
    elevator.openTimeRemaining = openTimeDuration;
    if (elevator.TripCount === 100)
    {
        //put it in maintenece mode... 
        elevator.isInMainteneceMode = true;
        // maybe display a message or something inside.. do not allow doors to close or anything as it should not move

    }
    else
    {
        //start a timer here to count down the open time remaining
    }
 
}

//button in elevator to close its own doors
function elevatorCloseDoors(elevator)
{
    elevator.openTimeRemaining  = 0;
    //dont let it work in maintenence mode
    if (elevator.isInMainteneceMode === false)
    {
        //close elevator doors
        eventEmitter.emit('elevatorDoorsClose', elevator);)
    }
}
//floorPositionListener of an Elevator
var floorPositionListener = function floorPositionListener(elevator, floorId) {
    elevator.currentFloor = floorId;
    //incriment the floor
    elevator.currentFloor += 1;
    //raise event that this elevator made it to another floor
    if (checkElevatorFloorArray(elevator.floorsToStop, floorId ) === true)
    {
        //raise event that elevator has stopped
        elevator.isStopped = true;
        eventEmitter.emit('elevatorStopped', elevator);
    }
    else
    {
        //keep the elevator moving
        moveElevator(elevator);
    }

    //set the floor display of this elevator outside on the floor so you can see where it is
    var thisFloor = floors[floorId-1];
    foreach(var fDisplay in thisFloor.elevatorDisplays)
    {
        if (fDisplay.elevatorId === elevator.Id )
        {
            fdisplay.currentFloor = floorId;
        }
    }
    floors[floorId-1].
 }

 function timerUpSoCloseDoors(elevator)
 {
    //Close doors 
    elevator.isOpen = close;
    eventEmitter.emit('elevatorDoorsClose', elevator);)
    //if any floors chosen... begin to move
    if (elevator.floorsToStop.length > 0 )
    {
        moveElevator(elevator);
    }
 }


 //helper function to check array
function checkElevatorFloorArray(array, floorId)
{        
 for(var i = 0 ; i< array.length; i++)
    {        
       if(array[i]== floorId){
         return true;
     }
 }
}


