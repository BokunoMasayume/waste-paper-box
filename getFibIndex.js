// 函数签名：function getFibIndex(value: number): number; 假定参数value大于1。
// 调用效果：
// getFibIndex(4) => -1
// getFibIndex(21) => 8

function warpper(){
    let arr = [1 ,1 ];

    function dimidiate(value){
        let start = 0;
        let end = arr.length -1;
        let mid = ~~((start + end)/2);

        while(start <= end){
            if(arr[mid] < value ){
                start = mid +1;
            }else if(arr[mid] > value ){
                end = mid - 1;
            }else{
                return mid;
            }

            mid = ~~((start + end)/2);
        }

        return -1;
    }

    return function(value){
        let curIdx = arr.length - 1;

        if(arr[curIdx] <= value){

        
            while(arr[curIdx] < value ){
                curIdx ++;
                arr[curIdx ] = arr[curIdx -1] + arr[curIdx -2]; 
            }

            if(value == arr[curIdx]){
                return curIdx;
            }else {
                return -1;
            }

        }


        return dimidiate(value);
    }
}

//1 1 2 3 5 8 13 21 34

module.exports = warpper;


//time wait 

