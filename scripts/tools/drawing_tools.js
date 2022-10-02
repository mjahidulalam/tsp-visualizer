function drawPoint(x, y, c, size=3, color='white'){
    c.beginPath();
    c.arc(x, y, size, 0, 2 * Math.PI, true);
    c.fillStyle = color;
    c.fill();
}

function plotPoints(points, length, base_color = "red", base_size = 7, node_color = "white", node_size = 4.5){
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

function stopUpdate() {
    submit_button.style.display = "inline";
    stop_button.style.display = "none";
    stop_value = false;
}