var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

// // var PointsLength = document.getElementById('node_input').valueAsNumber;
// // var PointsLength;

// // var submit_button = document.getElementById('final-submit');

// // submit_button.onclick = function() {
// //     return document.getElementById('node_input').valueAsNumber;
// // };

// // var PointsLength = submit_button.onclick();
// // console.log(PointsLength)

canvas.width = 1000;
canvas.height = 1000;


function createRandomPoints(length, maxX, maxY) {
    var points = {};

    padding = 30
    maxX = maxX - padding
    maxY = maxY - padding
    min = padding

    for(var i = 0; i < length; i++) {
        // var x = Math.random() * maxX;
        // var y = Math.random() * MaxY;
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

function argMinObj(obj) {
    if (obj.length === 0) {
        return -1;
    }

    var min;
    var minKey;

    for (var i in obj) {
        i = parseInt(i)
        if (!min || obj[i] < min) {
            minKey = i;
            min = obj[i];
        }
    }

    return minKey;
}

  

// var points = createRandomPoints(PointsLength, canvas.width, canvas.height);

// for(var i = 0; i < PointsLength; i++) {
//     if (i == 0) {
//         color = "red";
//     } else {
//         color= 'black';
//     }

//     drawPoint(points[i].x, points[i].y, c, color=color);              
// }


function drawPath(points, p, i = 0) {
    
    var distances = [];
    point1 = points[i];
    for (var j = 0; j < p.length; j++){
        point2 = points[p[j]];
        distances.push(distance(point1, point2));
    }

    closest_point = argMin(distances);
    alert(p)

    c.strokeStyle = 'white';
    if (p.length <= 0) {
        c.lineTo(points[0].x, points[0].y);
        c.stroke();
        return;
    } else {
        i = p[closest_point];
        p.splice(closest_point, 1);
        c.lineTo(points[i].x, points[i].y);
        c.stroke();
        setTimeout(function(){drawPath(points, p, i = i)}, 200);
        alert(i)
    }
}

function drawLine(lastNode, nextNode, color="white") {
    alert(lastNode)
    c.beginPath();
    c.strokeStyle = "white";
    c.lineWidth = 3;
    c.moveTo(lastNode[0], lastNode[1]);
    c.lineTo(nextNode[0], nextNode[1]);
    c.stroke();
    c.closePath();
}

function drawPath2(length, points) {
    origin_node = points[0]
    current_node = points[0]
    delete points[0];

    for (var i = 0; i < length-1; i++){
        distances = {}
        for (var j in points){
            distances[j] = distance(current_node, points[parseInt(j)])
        }
        closest_node = argMinObj(distances);
        drawLine(current_node, closest_node);
        current_node = points[closest_node];
        delete points[closest_node];
        // c.lineTo(current_node[0], current_node[1]);
        // c.stroke();
        // setTimeout(function(){c.stroke()}, 200)
        // setInterval(function(){
        //     // c.lineTo(current_node[0], current_node[1]); 
        //     // c.stroke();
        //    }, 100);​

        // drawLine(current_node[0], current_node[1]);
        // c.stroke()
    }
    // c.lineTo(origin_node[0], origin_node[1]);
    // c.stroke();
}


function run_animation() {
    // var canvas = document.querySelector('canvas');
    // var c = canvas.getContext('2d');

    // canvas.width = 500;
    // canvas.height = 500;


    var PointsLength = document.getElementById('node_input').valueAsNumber;
    var points = createRandomPoints(PointsLength, canvas.width, canvas.height);

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

    c.stroke()

    // c.beginPath();
    c.strokeStyle = "white";
    c.lineWidth = 3;
    
    // c.moveTo(points[0][0], points[0][1]);
    // var p = Array.from(Array(PointsLength).keys())
    drawPath2(PointsLength, points)
}
// // c.beginPath();
// // c.moveTo(points[0].x, points[0].y);
// // var p = Array.from(Array(PointsLength).keys())
// // console.log(p.length)
// // drawPath(p)