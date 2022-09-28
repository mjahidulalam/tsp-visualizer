import { argMinObj } from "https://github.com/mjahidulalam/tsp-visualizer/blob/ccc0e6a19271ff368e65f62292b60236951eab09/utils.js"

alert("pp")

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 1000;


function createRandomPoints(length, maxX, maxY) {
    var points = {};

    padding = 30
    maxX = maxX - padding
    maxY = maxY - padding
    min = padding

    for(var i = 0; i < length; i++) {
        var x = Math.floor(Math.random() * (maxX - min + 1) + min);
        var y = Math.floor(Math.random() * (maxY - min + 1) + min);
        points[i] = [x, y];
    }
    
    return points;
}

function drawPoint(x, y, c, size=3, color='white'){
    c.beginPath();
    c.arc(x, y, size, 0, 2 * Math.PI, true);
    c.fillStyle = color;
    c.fill();
}

function distance(point1, point2){
    return Math.sqrt((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2);
}

function argMin(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = arr[0];
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }

    return minIndex;
}

// function argMinObj(obj) {
//     if (obj.length === 0) {
//         return -1;
//     }

//     let min;
//     let minKey;

//     for (var i in obj) {
//         i = parseInt(i)
//         if (!min || obj[i] < min) {
//             minKey = i;
//             min = obj[i];
//         }
//     }

//     return minKey;
// }

function NearestNeighbors(points, current_node = 0) {
    if (current_node == 0) {        
        var current_node = points[0]
        delete points[0];
    }

    let distances = {}
    for (var j in points) {
        distances[j] = distance(current_node, points[parseInt(j)])
    }

    let closest_node = argMinObj(distances);
    let closest_node_coords = points[closest_node];

    c.strokeStyle = 'white';
    if (Object.keys(points).length < 1) {   
        c.lineTo(origin_coords[0], origin_coords[1]);
        c.stroke();
        return;
    } else {
        c.lineTo(closest_node_coords[0], closest_node_coords[1]);
        c.stroke();
        current_node = points[closest_node];
        delete points[closest_node];
        setTimeout(function(){NearestNeighbors(points, current_node = current_node)}, 200);
    }
}

function NearestInsertion(points, current_node = 0) {
    if (current_node == 0) {        
        var current_node = points[0]
        delete points[0];
    }

    let distances = {}
    for (var j in points) {
        distances[j] = distance(current_node, points[parseInt(j)])
    }

    let closest_node = argMinObj(distances);
    let closest_node_coords = points[closest_node];

    c.strokeStyle = 'white';
    if (Object.keys(points).length < 1) {   
        c.lineTo(origin_coords[0], origin_coords[1]);
        c.stroke();
        return;
    } else {
        c.lineTo(closest_node_coords[0], closest_node_coords[1]);
        c.stroke();
        current_node = points[closest_node];
        delete points[closest_node];
        setTimeout(function(){NearestNeighbors(points, current_node = current_node)}, 200);
    }
}

function run_animation() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    const PointsLength = document.getElementById('node_input').valueAsNumber;
    const algo = document.querySelector('input[name="algo-input"]:checked').value;

    let points = createRandomPoints(PointsLength, canvas.width, canvas.height);

    for(var i = 0; i < PointsLength; i++) {
        if (i == 0) {
            color = "red";
            size = 7;
        } else {
            color = 'white';
            size = 5.5;
        }
        drawPoint(points[i][0], points[i][1], c, size=size, color=color);              
    }

    c.beginPath();
    c.strokeStyle = "white";
    c.lineWidth = 3;
    origin_coords = points[0]
    c.moveTo(points[0][0], points[0][1]);

    if (algo == "NN") {
        NearestNeighbors(points)
    } else {
        alert("Not yet implemented")
        return;
    }
}