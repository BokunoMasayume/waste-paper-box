class Node{
    constructor(left, right){
        this.left = left;
        this.right = right;
    }
}

function findParent(root, c1, c2){
    if(!root) return false;
    if(root ==c1 || root ==c2)return true;
    
    let res1 = findParent(root.left , c1,c2);
    let res2 = findParent(root.right , c1, c2);
    if(res1!==true && res1!==false)return res1;
    if(res2!=true && res2!==false)return res2;
    if(res1===true && res2===true){
        return root;
    }
    if(res1 === false || res2===false){
        if(res1===true)return true;
        else if(res2===true)return true;
        else return false;
    }

}





arr=[1,2,2,1,,6,,9,10,1,3]
idx = 0;
map = {};
arr.forEach((v)=>{
    if(  v!==undefined && map[`idx${v}`]===undefined){
        map[`idx${v}`]=idx;
        map[idx++]=v;
    }
})
map.length = idx;
brr = Array.from(map)

