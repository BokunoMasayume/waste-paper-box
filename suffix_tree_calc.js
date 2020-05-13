// 输入: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
// 输出: 22
// 解释: 
//   ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
// = ((10 * (6 / (12 * -11))) + 17) + 5
// = ((10 * (6 / -132)) + 17) + 5
// = ((10 * 0) + 17) + 5
// = (0 + 17) + 5
// = 17 + 5
// = 22

class SuffixTree{
    constructor(arr){
        if( ! ( arr instanceof Array )  )
        this._arr = arr;



        //this._nodeLis = [];// node cache ,not-have-full-children nodes
        //this.tree = null;//the root node reference
       // genTree();
    }

    genTree(){
        if(! this._arr || this._arr.length)return false;

        //the root node reference
        this.tree = new Node(this._arr[this._arr.length -1]);
        // node cache, not-have-full-children(2) nodes
        this._nodeLis = [this.tree];
        //currentNode is always the 'this._nodeLis.pop()' one
        this.currentNode= this.tree;

        for(let i= this._arr.length -2;  i >=0 ; i--){
            let val = this._arr[i];
            if(operators.includes(val)){
                //is an operator 
                let node = new Node(val);

                if(! this.currentNode.rchild){
                    //rchild is empty, add to rchild
                    this.currentNode.rchild = node
                }else{
                    //lchild is empty, add to lchild
                    this.currentNode.lchild = node;
                    //currentNode is full of children, pop it
                    this._nodeLis.pop();
                }

                this._nodeLis.push(node);
                this.currentNode = node;
            }
            else{
                // is a prime number
                let leaf = new Leaf(val);

                if(! this.currentNode.rchild){
                    //rchild is empty, add to rchild
                    this.currentNode.rchild = leaf;
                }else{
                    //lchild is empty , add to lchild
                    this.currentNode.lchild = leaf;
                    //currentNode now is full of 2 children, pop it
                    this._nodeLis.pop();
                    // and change the currentNode to the new last one of _nodeLis
                    this.currentNode = this._nodeLis[this._nodeLis.length - 1];
                }
            }
        }

        //now , all operators and numbers have been parsed
        //if only support binary(2) operation , _nodeLis should be empty
        //if also support unary(1) operation, _nodeLis may not be empty
        

    }
}

module.exports = SuffixTree;

let operators = "+-*/";

class Node{
    constructor(val){
        if( !(val instanceof String || typeof val === "string") || !operators.includes(val) ){
            throw new Error(`Node: not legal operator '${val}'`);
        }
        this.val = val;

        this.rchild = null;
        this.lchild = null;
    }
}

class Leaf{
    constructor(val){
        
        this.val = parseFloat(val);

        if(isNaN(this.val)){
            throw new Error(`Leaf: '${val}' cannot covert to number`);
        }
        
    }
}

