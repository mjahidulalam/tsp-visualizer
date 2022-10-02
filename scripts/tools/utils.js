function distance(point1, point2){
    return Math.sqrt((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2);
}

function createRandomPoints(length, maxX, maxY) {
    let points = {};

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