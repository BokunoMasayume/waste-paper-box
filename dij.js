// You decided to run every night when you see your roomate is more charming than you because he/she works out regularly.

// Now you have a dictionary of places in Beijing. It's in the form of {location: elevation}. And an array of distances you find on Baidu Map connecting each places.

// Please find the length of the shortest route on which you can run completely uphill then completely downhill. Assume you live in "Huilongguan".

// elevations = {"Huilongguan": 5, "Chaoyang Park": 25, "National Stadium": 15, "Olympic Park": 20, "Tsinghua University": 10}
// paths = {
//     ("Huilongguan", "Chaoyang Park"): 10,
//     ("Huilongguan", "National Stadium"): 8,
//     ("Huilongguan", "Olympic Park"): 15,
//     ("Chaoyang Park", "Olympic Park"): 12,
//     ("National Stadium", "Tsinghua University"): 10,
//     ("Olympic Park", "Tsinghua University"): 5,
//     ("Olympic Park", "Huilongguan"): 17,
//     ("Tsinghua University", "Huilongguan"): 10
// }

// For this set of data, the shortest valid path would be "Huilongguan" -> "National Stadium" -> "Tsinghua University" -> "Huilongguan", with a distance of 28.

let home = "Huilongguan";

let elevations = {
    "Huilongguan": 5,
    "Chaoyang Park": 25, 
    "National Stadium": 15, 
    "Olympic Park": 20, 
    "Tsinghua University": 10
};

let paths = {
    "Huilongguan":{
        "Chaoyang Park":10,
        "National Stadium":8,
        "Olympic Park" :15
    },

    "Chaoyang Park":{
        "Olympic Park": 12
    },

    "National Stadium":{
        "Tsinghua University":10
    },
    "Olympic Park":{
        "Tsinghua University" :5,
        "Huilongguan" : 17
    },
    "Tsinghua University":{
        "Huilongguan" : 10
    }
};

/**
 * 
 * @param {String} start 
 * @param {Array} nodes - ['p1' , 'p2' ...]
 * @param {Object} edges - {'p1':{"p2":dis,"p3":dis}, "p2:{}..."}
 * @return {Object} 
 *    - nodeName : preNodeName and distance
 */
function dijkstra(start ,nodes,  edges){
    let s = [{
        node:start,
        pre:null
    }];
    let u = nodes.filter(ele=>{
        return ele!=start;
    });
    let pre = start;
    while(u.length){
        let min = Infinity;
        let node = null;
        let idx ;
        //find min
        for(let i=0;i<u.length ;i++){
            if(edges[start][u[i]] && edges[start][u[i]] <min){
                min = edges[start][u[i]];
                node = u[i];
                idx = i;
            }
        }
        if(!node)break;
        s.push({
            node:node,
            pre:pre
        });
        // if(start == pre)edges[start][node] = min;
        // else edges[start][node] = min + edges[start][pre];
        u.splice(idx,1);
        //update min of the rest 
        u.forEach(ele=>{
            if(!edges[start][ele])edges[start][ele] = Infinity;

            if(edges[start][ele] > (edges[node][ele]+min)){
                edges[start][ele] = edges[node][ele]+min;
            }
        })
        //update pre node
        pre = node;


    }
    return {
        pres:s,
        distances: edges[start]
    }

}

//深拷贝
function copy(obj){
    return JSON.parse(JSON.stringify(obj) );
}

//单层拓扑
function doTopo(obj){
    let res = {};

    Object.keys(obj).forEach(outerEle=>{
        Object.keys(obj[outerEle]).forEach(innerEle=>{
            if(! (res[innerEle] instanceof Object))res[innerEle] = {};

            res[innerEle][outerEle] = obj[outerEle][innerEle];
        })
    })

    return res;
}


function findMinPath( beginNode,elevations , paths){
    let upperPath = copy(paths);

    let nodes = Object.keys(elevations);

    nodes.forEach(startEle=>{
        if(!upperPath[startEle])return;

        Object.keys(upperPath[startEle]).forEach(endEle=>{
            if(elevations[startEle] > elevations[endEle]){
                // not uphill
                upperPath[startEle][endEle] = Infinity;
            }
        })
    });

    let downPath = copy(paths);
    // let downPath = doTopo(paths);
    // console.log(downPath);
    nodes.forEach(startEle=>{
        if(!downPath[startEle])return;

        Object.keys(downPath[startEle]).forEach(endEle=>{
            if(elevations[startEle] < elevations[endEle]){
                // not uphill
                downPath[startEle][endEle] = Infinity;
            }
        })
    });
    downPath = doTopo(downPath);

    let uphillMin = dijkstra(beginNode , nodes, upperPath);

    let downhillMin = dijkstra(beginNode  ,nodes, downPath);

    // let downhillMin;
    let min = Infinity;
    // console.log("up", uphillMin);

    nodes.forEach(transNode=>{
        // downhillMin = dijkstra(transNode ,nodes, downPath);

        if(transNode ==beginNode)return;
        if(uphillMin.distances[transNode] + downhillMin.distances[transNode] <min ){
            // console.log("down",transNode,downhillMin);

            min = uphillMin.distances[transNode] + downhillMin.distances[transNode]
        }
    });

    return min;
}

console.log(findMinPath("Huilongguan" ,elevations  , paths ) );


