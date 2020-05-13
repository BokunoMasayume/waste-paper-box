const genCallback = (function(){
    let currentIdx = 0;

    let nowIdx = -1;
    return function(success_cb , fail_cb){
        let idx = ++ currentIdx;
        return function(){
            if(idx>nowIdx){
                //newer result

                nowIdx = idx;
                success_cb(idx,currentIdx , nowIdx);
            }else{
                //not newer result
                fail_cb(idx,currentIdx , nowIdx);
            }
        }
    }
 
})();

module.exports = genCallback;

//test 
function test(){
    cb1 = genCallback((idx,currentIdx , nowIdx)=>{
        console.log('1 success' , idx, currentIdx , nowIdx);
    },(idx, currentIdx , nowIdx)=>{
        console.log('1 fail',idx, currentIdx , nowIdx);
    });

    cb2 = genCallback((idx,currentIdx , nowIdx)=>{
        console.log('2 success' , idx, currentIdx , nowIdx);
    },(idx, currentIdx , nowIdx)=>{
        console.log('2 fail',idx, currentIdx , nowIdx);
    });

    //模拟乱序
    cb2();
    cb1();

}
//测试
test();

//实际使用

// axiosInstance.get().then(
//     genCallback((arguments)=>{
//         /**success call back */
//     },()=>{
//             /**fail call back */
// })
// );