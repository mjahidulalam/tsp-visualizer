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
        stopUpdate();
        return;
    } else {
        drawCycles(solution)
        delete points[nextInsert];

        if (stop_value) {
            stopUpdate();
            return;
        }

        setTimeout(function(){NearestInsertion(points, speed, tourDist = tourDist, solution = solution)}, speed);
    }
}