const upper = document.querySelector(".upper");
const upper_height = upper.clientHeight;
const upper_width = upper.clientWidth;
const body_height = document.querySelector("body").clientHeight;

const canvas_div = document.querySelector("canvas");
const screen_height = window.innerHeight

const canvas_div_height = screen_height - upper_height - 10

canvas_div.style.height = canvas_div_height + "px"

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d', {willReadFrequently: true});

canvas.width = upper_width*1.5;
canvas.height = canvas_div_height*1.5;

const nodeInput = document.getElementById('node_input');
const speedInput = document.querySelector('input[name="speed-input"]');
const nodeRangeText = document.getElementById('node_input_note');
const submit_button = document.getElementById('final-submit');
const stop_button = document.getElementById('stop-botton');

let stop_value = false;

nodeInput.addEventListener('input', updateSpeed);

stop_button.addEventListener('click', function() {
    stop_value = true;
});

function updateSpeed(e) {
    const n_nodes = e.target.value
    if (n_nodes < 50) {
        speedInput.value = 300;
    } else if (n_nodes >= 50 && n_nodes < 100) {
        speedInput.value = 150;
    } else if (n_nodes >= 100 && n_nodes < 300) {
        speedInput.value = 120;
    } else if (n_nodes >= 300 && n_nodes < 500) {
        speedInput.value = 60;
    } else {
        speedInput.value = 20;
    }
}

function run_animation() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    const PointsLength = document.getElementById('node_input').valueAsNumber;
    const algo = document.getElementById('algo-input').value;
    const speed_value = document.querySelector('input[name="speed-input"]').value;
 
    if (PointsLength > 1000 || PointsLength < 5 || !PointsLength) {
        nodeRangeText.style.color = "#ff0000";
        return;
    } else {
        nodeRangeText.style.color = "#A9A9A9";
        submit_button.style.display = "none";
        stop_button.style.display = "inline"
    }

    let points = createRandomPoints(PointsLength, canvas.width, canvas.height);
    plotPoints(points, PointsLength)

    imageData = c.getImageData(0,0,canvas.width,canvas.height);

    c.beginPath();
    c.strokeStyle = "white";
    c.lineWidth = 3;
    origin_coords = points[0]
    c.moveTo(points[0][0], points[0][1]);

    if (algo == "NN") {
        setTimeout(function(){NearestNeighbors(points, speed = speed_value)}, speed_value)
    } else if (algo == "NI") {
        adjList = {"0,0": 0}
        setTimeout(function(){NearestInsertion(points, speed = speed_value)}, speed_value)
    } else if (algo == "FI") {
        adjList = {"0,0": 0}
        setTimeout(function(){FarthestInsertion(points, speed = speed_value)}, speed_value)
    } else {
        alert("Not yet implemented");
    }
}