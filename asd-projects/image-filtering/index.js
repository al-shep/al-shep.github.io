// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    filter()




    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
function applyFilter(filterFunction) {

    for (var x = 0; x < image.length; x++) {
        for (var i = 0; i < image[x].length; i++) {
            var rgbString = image[x][i]
            var rgbNumbers = rgbStringToArray(rgbString)
            filterFunction(rgbNumbers)
            rgbString = rgbArrayToString(rgbNumbers)
            image[x][i] = rgbString
        }
    }

}

// TODO 5: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
    const initialBackground = image[0][0]
    let white = "rgb(255, 255, 255)"
    for (var x = 0; x < image.length; x++) {
        for (var i = 0; i < image[x].length; i++) {
            var rgbString = image[x][i]
            if (rgbString === initialBackground) {
                image[x][i] = white
            }
            else {
                var rgbNumbers = rgbStringToArray(rgbString)
                filterFunction(rgbNumbers)
                rgbString = rgbArrayToString(rgbNumbers)
                image[x][i] = rgbString
            }
        }
    }

}

// TODO 2 & 4: Create filter functions\

let filterArr = []

filterArr.push( 
    function reddify(arr) {
        arr[RED] = 255
    }
 )

filterArr.push(
    function decreaseBlue(arr) {
        arr[BLUE] = Math.max( (arr[BLUE] - 30), 0 )
    }
)

filterArr.push(
    function increaseGreenByBlue(arr) {
        arr[GREEN] = Math.min( (arr[GREEN] + arr[BLUE]), 255 )
    }
)

function filter() {
    for (var i = 0; i < filterArr.length; i++) {
        applyFilterNoBackground(filterArr[i])
    }
}

// CHALLENGE code goes below here
