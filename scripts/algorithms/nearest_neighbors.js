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
        stopUpdate();
        return;
    } else {
        c.lineTo(closest_node_coords[0], closest_node_coords[1]);
        c.stroke();
        current_node = points[closest_node];
        delete points[closest_node];

        if (stop_value) {
            stopUpdate();
            return;
        }
        setTimeout(function(){NearestNeighbors(points, speed, current_node = current_node)}, speed);
    }
}