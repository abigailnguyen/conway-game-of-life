var expect = chai.expect;
var grid = gridBuilder(12,12);
describe("Testing the grid", function(){
    it("Check grid created", function(){
        expect(grid.grid.length).to.equal(144);
    });
});

describe("Test return correct live stages", function(){
    it("Cell dies when there is 0 living neighbours", function(){
        expect(nextCellState(true, 0)).to.equal(false);
    });
    it("Cell dies when there is 1 living neighbours", function(){
        expect(nextCellState(true, 1)).to.equal(false);
    });
    it("Cell dies when there are more than 3 living neighbours", function(){
        expect(nextCellState(true, 4)).to.equal(false);
    });
    it("Cell relives when there are 3 living neighbours", function(){
        expect(nextCellState(false, 3)).to.equal(true);
    })
    it("Cell remains alive when there are 2 living neighbours", function(){
        expect(nextCellState(true, 2)).to.equal(true);
    })
    it("Cell remains alive when there are 3 living neighbours", function(){
        expect(nextCellState(true, 3)).to.equal(true);
    })
    it("Cell remains dead when there are less than 3 living neighbours", function(){
        expect(nextCellState(false, 1)).to.equal(false);
    })
    it("Cell remains dead when there are more than 3 neighbours", function() {
        expect(nextCellState(false, 4)).to.equal(false);
    })
});

describe("Test getting neighbours of cells", function(){
    it ("Cell in middle of grid 8 neighbours", function() {
        expect(calculateNeighbours.call(grid, grid.grid[16]).length).to.equal(8);
        expect
    });
    it ("Cell at bottom left corner has 3 neighbours", function() {
        expect(calculateNeighbours.call(grid, grid.grid[0]).length).to.equal(3);
    });
    it ("Cell at bottom right corner has 3 neighbours", function() {
        expect(calculateNeighbours.call(grid, grid.grid[grid.length-1]).length).to.equal(3);
    });
    it ("Cell at top left corner has 3 neighbours", function() { 
        expect(calculateNeighbours.call(grid, grid.grid[grid.height-1]).length).to.equal(3);
    });
    it ("Cell at top right corner has 3 neighbours", function() {
        expect(calculateNeighbours.call(grid, grid.grid[grid.height*grid.length - 1]).length).to.equal(3);
    });

    it ("Cell at top row has 5 neighbours", function () {
        expect(calculateNeighbours.call(grid, grid.grid[1]).length).to.equal(5);
    });

    it ("Cell at bottom row has 5 neighbours", function (){
        expect(calculateNeighbours.call(grid, grid.grid[7]).length).to.equal(5);
    });
    it ("Cell at left most row has 5 neighbours", function (){
        expect(calculateNeighbours.call(grid, grid.grid[3]).length).to.equal(5);
    });
    it ("Cell at right most row has 5 neighbours", function (){
        expect(calculateNeighbours.call(grid, grid.grid[5]).length).to.equal(5);
    });
    
    it ("The number of alive states in array [true, false, true, false, true, false, true, false] is 4", function(){
        expect(getTotalAliveStates([true, false, true, false, true, false, true, false])).to.equal(4);
    });
});