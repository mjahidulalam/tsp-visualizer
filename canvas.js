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

function plotPoints(points, length, base_color = "red", base_size = 7, node_color = "white", node_size = 5.5){
    for(var i = 0; i < length; i++) {
        if (i == 0) {
            drawPoint(points[i][0], points[i][1], c, size=base_size, color=base_color);
        } else {
            drawPoint(points[i][0], points[i][1], c, size=node_size, color=node_color);
        }
    }
}

function drawCycles(solution, line_color = "white", line_width = 3){
    let node = solution.head
        for (var index = 0; index < solution.length; index++) {
            if (index == 0) {
                c.clearRect(0, 0, canvas.width, canvas.height);
                c.putImageData(imageData, 0, 0);
                c.beginPath();
                c.strokeStyle = line_color;
                c.lineWidth = line_width;
                c.moveTo(node.coord[0], node.coord[1]);
            }
            c.lineTo(node.coord[0], node.coord[1]);
            node = node.next
        }
        c.stroke(); 
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

    let min;
    let minKey;

    for (var i in obj) {
        i = parseInt(i)
        if (!min || obj[i] < min) {
            minKey = i;
            min = obj[i];
        }
    }

    return minKey;
}

class LinkedList {
    constructor(value, coord) {
        this.head = {
            value: value,
            coord: coord,
            next: null
        };
        this.tail = this.head;
        this.length = 1;
    }

    append(value, coord) {
        const newNode = {
            value: value,
            coord: coord,
            next: null
        }

        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        return this
    }

    insert(value, coord, index) {
        if (index >= this.length) {
            return this.append(value, coord)
        } 

        if (index < 0) {
            index = this.lenghth - index
        }

        const newNode = {
            value: value,
            coord: coord,
            next: null
        }

        const leader = this.lookup(index-1)
        const holdingPointer = leader.next
        leader.next = newNode
        newNode.next = holdingPointer
        this.length++
        return this
    }

    lookup(index) {
        let currentNode = this.head;
        let counter = 0;
        while (counter !== index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode
    }

    print_list() {
        let list = []
        let currentNode = this.head
        for (var i = 0; i < this.length; i++) {
            list.push(currentNode.value)
            currentNode = currentNode.next
        }

        return list
    }
}

function NearestNeighbors(points, speed, current_node = 0) {
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
        setTimeout(function(){NearestNeighbors(points, speed, current_node = current_node)}, speed);
    }
}

function NearestInsertion(points, speed, tourDist = 0, solution = null) {
    if (solution == null) {
        solution = new LinkedList(0, points[0])
        solution.append(0, points[0])
        delete points[0];
    }

    let currentNode = solution.head;
    let minDist = Infinity;
    let nextInsert = null;
    for (var index = 0; index < solution.length-1; index++) {
        nextNode = currentNode.next
        let dist_ab = adjList[[currentNode.value, nextNode.value]]

        for (var i in points) {
            let dist_aib = 0;
            for (node of [currentNode, nextNode]) {
                let dist = null
                if (!adjList[[node.value, i]]) {
                    dist = distance(node.coord, points[parseInt(i)])
                    adjList[[node.value, i]] = dist
                    adjList[[i, node.value]] = dist
                } else {
                    dist = adjList[[node.value, i]]
                }

                dist_aib = dist_aib + dist
            }

            if (tourDist - dist_ab + dist_aib < minDist) {
                minDist = tourDist - dist_ab + dist_aib
                nextInsert = i;
                insertPosition = index+1;
            }
        }
        currentNode = currentNode.next
    }

    solution.insert(nextInsert, points[nextInsert], insertPosition)
    tourDist = minDist

    c.strokeStyle = 'white';
    if (Object.keys(points).length < 1) {
        return;
    } else {
        drawCycles(solution)
        delete points[nextInsert];
        setTimeout(function(){NearestInsertion(points, speed, tourDist = tourDist, solution = solution)}, speed);
    }
}

function FarthestInsertion(points, speed, tourDist = 0, solution = null) {
    if (solution == null) {
        solution = new LinkedList(0, points[0])
        solution.append(0, points[0])
        delete points[0];
    }

    let currentNode = solution.head;
    let maxDist = 0;
    let nextInsert = null;
    for (var index = 0; index < solution.length-1; index++) {
        for (var i in points) {
            let dist = null;
            if (!adjList[[currentNode.value, i]]) {
                dist = distance(currentNode.coord, points[parseInt(i)])
                adjList[[currentNode.value, i]] = dist
                adjList[[i, currentNode.value]] = dist
            } else {
                dist = adjList[[currentNode.value, i]]
            }

            if (dist > maxDist) {
                maxDist = dist;
                nextInsert = i;
            }
        }
        currentNode = currentNode.next
    }

    currentNode = solution.head;
    let minTourDist = Infinity;
    for (var index = 0; index < solution.length-1; index++) {
        nextNode = currentNode.next
        let dist_ab = adjList[[currentNode.value, nextNode.value]]
        let dist_aib = 0;

        for (node of [currentNode, nextNode]) {
            let dist = null
            if (!adjList[[node.value, nextInsert]]) {
                dist = distance(node.coord, points[parseInt(nextInsert)])
                adjList[[node.value, nextInsert]] = dist
                adjList[[nextInsert, node.value]] = dist
            } else {
                dist = adjList[[node.value, nextInsert]]
            }

            dist_aib = dist_aib + dist
        }

        if (tourDist - dist_ab + dist_aib < minTourDist) {
            minTourDist = tourDist - dist_ab + dist_aib
            insertPosition = index+1;
        }
        currentNode = currentNode.next
    }

    solution.insert(nextInsert, points[nextInsert], insertPosition)
    tourDist = minTourDist

    c.strokeStyle = 'white';
    if (Object.keys(points).length < 1) {
        return;
    } else {
        drawCycles(solution)
        delete points[nextInsert];
        setTimeout(function(){FarthestInsertion(points, speed, tourDist = tourDist, solution = solution)}, speed);
    }
}

function run_animation() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    const PointsLength = document.getElementById('node_input').valueAsNumber;
    const algo = document.querySelector('input[name="algo-input"]:checked').value;
    const speed_input = document.querySelector('input[name="speed-input"]').value;

    let points = createRandomPoints(PointsLength, canvas.width, canvas.height);
    plotPoints(points, PointsLength)

    imageData = c.getImageData(0,0,canvas.width,canvas.height);

    if (PointsLength < 50) {
        speed_value = 200;
    } else if (PointsLength >= 50 && PointsLength < 100) {
        speed_value = 100;
    } else if (PointsLength >= 100 && PointsLength < 300) {
        speed_value = 50;
    } else if (PointsLength >= 300 && PointsLength < 500) {
        speed_value = 20;
    } else {
        speed_value = 10;
    }

    alert(speed_value)

    c.beginPath();
    c.strokeStyle = "white";
    c.lineWidth = 3;
    origin_coords = points[0]
    c.moveTo(points[0][0], points[0][1]);

    if (algo == "NN") {
        NearestNeighbors(points, speed = speed_value)
    } else if (algo == "NI") {
        adjList = {"0,0": 0}
        NearestInsertion(points, speed = speed_value)
        return;
    } else if (algo == "FI") {
        adjList = {"0,0": 0}
        FarthestInsertion(points, speed = speed_value)
        return;
    } else {
        alert("Not yet implemented")
        return;
    }
}