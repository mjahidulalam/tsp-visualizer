export function distance(point1, point2){
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
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

export function argMinObj(obj) {
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
};

function drawPoint(x, y, c, color='black'){
    c.beginPath();
    c.arc(x, y, 3, 0, 2 * Math.PI, true);
    c.fillStyle = color;
    c.fill();
}
