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

function NearestInsertion(points, solution = null) {
    if (solution == null) {
        solution = new LinkedList(0, points[0])
        solution.append(0, points[0])
        delete points[0];
    }

    let currentNode = solution.head;
    let minDist = Infinity;
    let nextInsert = null;
    for (var index = 0; index < solution.length-1; index++) {
        for (var i in points) {
            let dist = 0;
            if (!adjList[[currentNode.value, i]]) {
                dist = distance(currentNode.coord, points[parseInt(i)])
                adjList[[currentNode.value, i]] = dist
                adjList[[i, currentNode.value]] = dist
            } else {
                dist = adjList[[currentNode.value, i]]
            }

            if (dist < minDist) {
                minDist = dist;
                nextInsert = i;
                insertPosition = index;
            }
        }
        currentNode = currentNode.next
    }

    if (solution.length <= 3) {
        solution.insert(nextInsert, points[nextInsert], 1)
    } else {
        if (insertPosition == 0) {
            var node_a = solution.tail.value
            var node_b = solution.head.value
            var node_c = solution.head.next.value
        } else {
            let positionNodes = solution.lookup(insertPosition-1)
            var node_a = positionNodes.value
            var node_b = positionNodes.next.value
            var node_c = positionNodes.next.next.value
        }

        let dist_adb = adjList[[node_a, nextInsert]] + adjList[[nextInsert, node_b]] - adjList[[node_a, node_b]]
        let dist_bdc = adjList[[node_b, nextInsert]] + adjList[[nextInsert, node_c]] - adjList[[node_b, node_c]]

        if (dist_adb < dist_bdc) {
            solution.insert(nextInsert, points[nextInsert], insertPosition)
        } else {
            solution.insert(nextInsert, points[nextInsert], insertPosition+1)
        }
    }

    c.strokeStyle = 'white';
    if (Object.keys(points).length < 1) {   
        return;
    } else {
        let node = solution.head
        for (var index = 0; index < solution.length; index++) {
            // alert(PointsLength)
            if (index == 0) {
                c.clearRect(0, 0, canvas.width, canvas.height);
                c.putImageData(imageData, 0, 0);
                c.beginPath();
                c.strokeStyle = "white";
                c.lineWidth = 3;
                origin_coords = points[0]
                c.moveTo(node.coord[0], node.coord[1]);
            }
            c.lineTo(node.coord[0], node.coord[1]);
            node = node.next
        }
        c.stroke(); 
        delete points[nextInsert];
        setTimeout(function(){NearestInsertion(points, solution = solution)}, 200);
    }
}

function run_animation() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    const PointsLength = document.getElementById('node_input').valueAsNumber;
    const algo = document.querySelector('input[name="algo-input"]:checked').value;

    let points = createRandomPoints(PointsLength, canvas.width, canvas.height);
    plotPoints(points, PointsLength)

    imageData = c.getImageData(0,0,canvas.width,canvas.height);

    c.beginPath();
    c.strokeStyle = "white";
    c.lineWidth = 3;
    origin_coords = points[0]
    c.moveTo(points[0][0], points[0][1]);

    if (algo == "NN") {
        NearestNeighbors(points)
    } else {
        adjList = {}
        NearestInsertion(points)
        return;
    }
}