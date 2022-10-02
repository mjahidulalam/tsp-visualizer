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
    drawCycles(solution)
    delete points[nextInsert];

    if (Object.keys(points).length < 1) {
        stopUpdate();
        return;
    } else {
        if (stop_value) {
            stopUpdate();
            return;
        }
        setTimeout(function(){FarthestInsertion(points, speed, tourDist = tourDist, solution = solution)}, speed);
    }
}