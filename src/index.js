function gridBuilder(length, height) {
    var grid = new Grid(length, height);
    
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid.height; j++) {
            grid.grid.push(new Cell(i, j, false));
        }
    }
    var start = (length - 1)/2*length + (height - 1)/2 - 25
    console.log(start);
    for (i = Math.floor(start) ; i < start + 9; i++){
        grid.grid[i].DOA = true;
    }
    return grid;
}

function calculateNeighbours(cell) {
    //this should be grid
    var grid = this;
    var leftXPos, rightXPos, topYPos, bottomYPos;
    var topLeft, topMiddle, topRight, left, right, bottomLeft, bottomMiddle, bottomRight;
    if (cell.xPos > 0) {
        leftXPos = cell.xPos - 1;
    }
    if (cell.xPos < grid.length - 1) {
        rightXPos = cell.xPos + 1;
    }
    if (cell.yPos > 0) {
        bottomYPos = cell.yPos - 1;
    }
    if (cell.yPos < grid.height - 1) {
        topYPos = cell.yPos + 1;
    }
    
    neighbourStates = new Array();
    
    topLeft = getCell.call(grid, leftXPos, topYPos);
    topMiddle = getCell.call(grid, cell.xPos, topYPos);
    left = getCell.apply(grid, [leftXPos, cell.yPos]);
    topRight = getCell.apply(grid, [rightXPos, topYPos]);
    right = getCell.apply(grid, [rightXPos, cell.yPos]);
    bottomLeft = getCell.apply(grid, [leftXPos, bottomYPos]);
    bottomMiddle = getCell.apply(grid, [cell.xPos,bottomYPos]);
    bottomRight = getCell.apply(grid, [rightXPos, bottomYPos]);

    typeof(topLeft) != 'undefined' ? neighbourStates.push(topLeft): "";
    typeof(topMiddle) != 'undefined' ? neighbourStates.push(topMiddle): "";
    typeof(left) != 'undefined'? neighbourStates.push(left): "";
    typeof(right) != 'undefined'? neighbourStates.push(right) : "";
    typeof(topRight) != 'undefined'? neighbourStates.push(topRight): "";
    typeof(bottomLeft) != 'undefined'? neighbourStates.push(bottomLeft): "";
    typeof(bottomMiddle) != 'undefined'? neighbourStates.push(bottomMiddle): "";
    typeof(bottomRight) != 'undefined'? neighbourStates.push(bottomRight): "";
    return neighbourStates;
}

function gridUpdate (grid) {
    var gridArr = grid.grid;
    var nextStateGrid = gridArr.map(function (cell) {
        var neighbourStates = calculateNeighbours.call(grid, cell);
        var totalAlive = getTotalAliveStates(neighbourStates);
        //console.log("Neighbours States: " + neighbourStates);
        //console.log("Total alive: " + totalAlive);
        var nextState = nextCellState(cell.DOA, totalAlive);
        return new Cell(cell.xPos, cell.yPos, nextState);
    });
    return new Grid(grid.length, grid.height, nextStateGrid);
}

function getTotalAliveStates(neighbourStates) {
    return neighbourStates.reduce(function(sum, value){
        return sum + value;
    });
}

function getCell(xPos, yPos) {
    //this is grid
    if (xPos >= 0 && yPos >= 0) {
        var index = xPos * this.length + yPos;
        return this.grid[index].DOA;
    } 
}

function nextCellState (cellDOA, numOfNeigboursAlive) {
    if (cellDOA && numOfNeigboursAlive < 2) {
        return false; //dies
    } 
    else if (cellDOA && numOfNeigboursAlive > 3) {
        return false;
    } 
    else if (!cellDOA && numOfNeigboursAlive == 3) {
        return true;
    }
    else {
        return cellDOA;
    }
}

function Cell(x, y, DOA) {
    this.xPos = x;
    this.yPos = y;
    this.DOA = DOA;
}

function Grid(x, y, gridArr) {
    this.length = x;
    this.height = y;
    if (!gridArr) {
        this.grid = new Array();
    } else {
        this.grid = gridArr;
    }
}

function drawGrid(grid, times) {
    if (times >= 0) {
        for (yPos=grid.height - 1; yPos >= 0; yPos--) {
            var horizontal = "";
            for (xPos=0; xPos < grid.length; xPos++) {
                var index = xPos*grid.length + yPos;
                horizontal += aliveOrDeadSymbol(grid.grid[index].DOA);
            }
            console.log(horizontal);
        }
        var nextGrid = gridUpdate(grid);
        if (times) {
            console.log('---Next State---');
        }
        drawGrid(nextGrid, times-1);
    }
}

function aliveOrDeadSymbol(state) {
    if (state) {
        return "\u24ea";
    } else {
        return "\u24ff";
    }
}

var grid = gridBuilder(50,50);
drawGrid(grid,4);
console.log("next");




