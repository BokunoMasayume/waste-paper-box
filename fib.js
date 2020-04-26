// 问题：
// 斐波那契数列示例： 
// 1，1，2，3，5，8，13，21，34 。。。。
// 实现这样一个函数，得到指定位置上数列的值。
// 函数签名：function fib(index: number): number;
// 调用效果：
// fib(2) => 1
// fib(4) => 3

function genFib(){
    let arr = [1,1];

    return function(idx){
        
        //when idx < arr.length ,this for-loop will not be fired
        for(let i = arr.length ; i<=idx ;i++){
            arr[i] = arr[i-1] + arr[i-2]
        }

        return arr[idx];
       
    }
}

module.exports = genFib;