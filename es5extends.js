function animal(){
    //do something

}

animal.prototype.methodName = function(){

}

function cat(){
   
    animal.apply(this,argus);

     //do something;
    
    
}
cat.prototype = new animal();
cat.prototype.constructor = cat;

cat.prototype.methodName = function (){}