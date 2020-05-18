function quickSort(arr ,start , end){
    
    if(!arr || !(arr instanceof Array) || !arr.length || end<=start)return arr;
    start = start?start:0;
    end = end?end: arr.length-1;
    let anchor = arr[start];
    let left = start;
    let right = end;
    while(left < right){
        if(arr[right]>anchor)right --;
        else if(arr[left]<=anchor)left ++ ;
        else {
            [arr[left], arr[right]] = [arr[right],arr[left]];
            left ++;
            right --;
        }
        
        
    }
    [arr[start], arr[left]] = [arr[left] , arr[start]]
    //if(left ==end || right == start)return arr;
    quickSort(arr ,start, left-1);
    quickSort(arr, left+1 , end);
    
    return arr;
}

module.exports.quick = quickSort;


