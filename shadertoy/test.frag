// #version 300 es



#define PI_TWO			1.570796326794897
#define PI				3.141592653589793
#define TWO_PI			6.283185307179586
#define PHI             1.6180339887498948482045868343656

#define MAX_STEPS 400
#define MAX_DIST 100.
#define SURFACE_DIST .00001

//all these premitives are centered at origin

//p : the position to render
//b: the hemi-width height and length
float sdBox(vec3 p  , vec3 b){
    vec3 q = abs(p) - b;
    return length( max(q , 0.) ) + min( max(q.x , max(q.y , q.z)) , 0.);
}

float sdRoundBox( vec3 p , vec3 b , float r ){
    vec3 q = abs(p) - b;
    return length( max(q , 0.) ) + min( max(q.x , max(q.y , q.z)) , 0.) - r;
}

//p: position to be rendered
//b: outside rect 's hemi-size
//e: bar width
float sdBoundingBox(vec3 p , vec3 b , float e){
    // 距离为正的点可分为3种 
    // 1. 在外侧盒子之外的点
    // 2. 在内侧盒子之内的点
    // 3. 在被掏空的墙壁中的点
    //对1.中的点，p和q相等，距离求法就是length(p/q)
    //对2.中的点，其距离为到bar的距离，即length(vec3(0 , q.yz) | vec3(q.x  ,0,q.z) | vec3(q.xy ,0))中最短的那个（q.xyz若小于零取0）
    //对3.中的点，其距离为q.x|y|z中大于0的最小的那个
    //这些组合起来，得到下面的公式
    p = abs(p) - b;
    //this q ,对于在外侧盒子之外的点，等于p； 
    vec3 q = abs(p+e) - e ;
    return min(
        min(
            length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),
            length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)
        ),
      length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0)
    );
}

float sdSphere(vec3 p , float r){
    return length(p) - r;
}

float sdPlane(vec3 p , float h){
    return p.y - h;
}


//圆环
//p:position
//t.x: 圆环的半径
//t.y: 围成圆环的圆柱的半径
float sdTorus(vec3 p  ,vec2 t){
    //q是p到圆柱截面圆心线的距离
    vec2 q = vec2(length(p.xz ) - t.x , p.y); 
    return length(q) - t.y;
}

//sc: 圆环终点的方向(normalized)
//ra: 圆环的半径
//rb: 围成圆环的圆柱的半径
//两种情况：
//1. p在圆环存在的方向上，这时sdf计算方式同普通圆环
//2. p在圆环缺口方向上，这时sdf为到圆环终点的位置的距离 - 围成圆环的圆半径，
//其圆环的终点位置为sc*ra , 故sdf为 length（p - sc*ra）
//两者化简后为sqrt(dot(p) + ra*ra - 2*ra*(length(p.xy)|dot(p,vec3(sc,0.) ))) - rb
float sdCappedTorus(vec3 p , vec2 sc , float ra , float rb){
    p.x = abs(p.x);
    sc = normalize(sc);
    //this is cross(p , vec3(sc,0.) ).z , 根据右手定则 ， 指向屏幕内，p在sc下，p在缺口方向；p在sc上，p在圆环方向
  float k = (sc.y*p.x>sc.x*p.y) ? dot(p.xy,sc) : length(p.xy);
  return sqrt( dot(p,p) + ra*ra - 2.0*ra*k ) - rb;
}

//r1: 圆环部分半径
//r2: 圆柱的横截面半径
//le: 伸长部分hemi-length
//两种情况：
//1. 在圆的范围（两个半圆以及向外的辐射区域），同torus
//2. 在矩形范围，同p点在x或y轴上时的sdf（当圆环平行于视图的时候，垂直于视图的时候就是x轴和z轴）
//abs(p.y)-le>0 说明在情况一，<0,说明在情况2，p.y设为0，使其在轴上，然后按照torus计算
float sdLink(vec3 p , float le , float r1 , float r2) {
    vec3 q = vec3( p.x, max(abs(p.y)-le,0.0), p.z );
    return length(vec2(length(q.xy)-r1,q.z)) - r2;
}

//本函数描述的圆锥，其顶点在原点，并向下延伸
// c : 圆锥斜面的单位向量
// h: 圆锥的高度
float sdCone( in vec3 p, in vec2 c, float h )
{
  // c is the sin/cos of the angle, h is height
  // Alternatively pass q instead of (c,h),
  // which is the point at the base in 2D
  //圆锥斜面的实际向量，圆锥在x-y轴平面上的三角投影的右下点位置向量
  vec2 q = h*vec2(c.x/c.y,-1.0);
    
  //p转2维
  vec2 w = vec2( length(p.xz), p.y );
  //a: 距离斜面的距离向量
  vec2 a = w - q*clamp( dot(w,q)/dot(q,q), 0.0, 1.0 );
  //b: 距离底面的距离向量
  vec2 b = w - q*vec2( clamp( w.x/q.x, 0.0, 1.0 ), 1.0 );
  //距离底面和斜面那个近选哪个
  float d = min(dot( a, a ),dot(b, b));
  //确认距离符号
  float s = min( (w.x*q.y-w.y*q.x),(w.y-q.y)  );
  return -1.*sqrt(d)*sign(s);
}



float sdInfiniteCone( vec3 p, vec2 c )
{
    // c is the sin/cos of the angle
    vec2 q = vec2( length(p.xz), -p.y );
    float d = length(q-c*max(dot(q,c), 0.0));
    return d * ((q.x*c.y-q.y*c.x<0.0)?-1.0:1.0);
}

float sdPlane(vec3 p , vec3 n , float h){
    return dot(p,n) + h;
}

//brilliant!!
float sdHexPrism( vec3 p, vec2 h )
{  //   tan 30d度 = cot 60度 = .57735
  const vec3 k = vec3(-0.8660254, 0.5, 0.57735);
  p = abs(p);
  //对称p
  p.xy -= 2.0*min(dot(k.xy, p.xy), 0.0)*k.xy;
  vec2 d = vec2(
       length(p.xy-vec2(clamp(p.x,-k.z*h.x,k.z*h.x), h.x))*sign(p.y-h.x),
       p.z-h.y );
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}

float sdTriPrism( vec3 p, vec2 h )
{
  vec3 q = abs(p);
  return max(q.z-h.y,max(q.x*0.866025+p.y*0.5,-p.y)-h.x*0.5);
}

float sdCapsule( vec3 p, float h, float r )
{
  p.y -= clamp( p.y, 0.0, h );
  return length( p ) - r;
}

float sdCappedCylinder( vec3 p, float h, float r )
{
  vec2 d = abs(vec2(length(p.xz),p.y)) - vec2(h,r);
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}

float sdRoundedCylinder( vec3 p, float ra, float rb, float h )
{
  vec2 d = vec2( length(p.xz)-2.0*ra+rb, abs(p.y) - h );
  return min(max(d.x,d.y),0.0) + length(max(d,0.0)) - rb;
}

//c.z: 圆柱半径
//c.xz :圆柱中心（c.x, * , c.z）
float sdCylinder(vec3 p , vec3 c){
    return length(p.xz - c.xy) - c.z;
}

//cp: camera position
//la : look at position
vec3 setCameraAndGetViewdirection(vec3 cp , vec3 la , vec3 vd) {
    

    vec3 ww = normalize( la - cp );
    vec3 uu = normalize( cross( vec3(0. , 1. , 0.) ,ww) );
    vec3 vv = normalize( cross(ww , uu) );

    mat3 cameraTransform = mat3(uu, vv, ww);

    return normalize( cameraTransform * vd ) ;
}
//because camera 's position is reset...
// vec3 getViewdirection(vec3 vd){
//     return normalize( cameraTransform * vd ) ;
// }

float random (float seed) {
    return fract(sin(seed) *  43758.5453123 );
}

vec2 getDist(vec3 p){
    // position xyz and radius
    // vec4 sphere = vec4(0. , 1.+sin(iTime) , 6. , 1.);
    // p *= 100.;
    vec2 res = vec2(0.);

    vec4 sphere = vec4(0. , 14. , .0 , 10.);
    float dPlane = sdPlane(p , 0.);
    float dSphere ;
    // dSphere = sdSphere(p-sphere.xyz , sphere.w ) ;

    vec3 boxCenter = vec3(0.,2.,0.);
    // float dBox = sdBox(p - boxCenter , vec3(1.) );
    // float dRoundBox = sdRoundBox(p - boxCenter , vec3(1.) ,.1);
    // float dBoundingBox = sdBoundingBox(p - boxCenter , vec3(1.) , .1);
    // float dTorus = sdTorus(p - boxCenter , vec2(1.,.2));
    // float dCappedTorus = sdCappedTorus(p-boxCenter , vec2(1.0 , -1.) , .4, .1);
    // float dCone = sdCone( p-boxCenter , vec2(sin(1.),cos(1.)) , 1. );
    // float dPlane1 = sdPlane(p - boxCenter ,vec3(1.,1.,1.)  , .0);
    // float dHex = sdHexPrism(p - boxCenter , vec2(.5,.3));
    // float dTri = sdTriPrism(p - boxCenter , vec2(.7,.3));
    // float dCaps = sdCapsule(p - boxCenter , .2,.2);
    float dCaps = sdCappedCylinder(p - boxCenter , .2,.2);

    dSphere = dCaps;
    // dSphere /= 3.;
    if(dPlane > dSphere){
        res.x = dSphere ; 
        res.y = 1.;
    }else {
        res.x = dPlane ; 
        res.y = 2.;
    }

    // res.x /= 100.;
    return res;
}

vec3 getNormal(vec3 p){
    vec2 e = vec2(.01 , 0.);
    float d = getDist(p).x;
    vec3 n = vec3(
        getDist(p + e.xyy).x -d,
        getDist(p + e.yxy).x -d,
        getDist(p + e.yyx).x -d
        // getDist(p + e.xyy).x - getDist(p - e.xyy).x,
        // getDist(p + e.yxy).x - getDist(p - e.yxy).x ,
        // getDist(p + e.yyx).x - getDist(p - e.yyx).x 
    );

    return normalize(n);
}




vec2 rayMarch(vec3 ro , vec3 rd){
    float doo = 0.;
    vec2 res = vec2(0.);

    for(int i=0 ; i<MAX_STEPS ;i++){
        vec3 p = ro + doo * rd;
        res = getDist(p);
        float ds = res.x;
        doo += ds;
        res.x = doo;
        if(ds < SURFACE_DIST || doo > MAX_DIST){
            break;
        }
    }
    if(doo > MAX_DIST){
        res = vec2(-1.);
    }
    return res;
}

//采样范围是一个单位半径的球体，后续要根据法线方向转换为半球
vec3 getAOKernelSample(float i , float n){
    float xzDir = TWO_PI * fract(i / PHI);

    float zz = 1. - (2. * i )/n;

    float xzDis = sqrt(1. - zz*zz);

    return vec3( cos(xzDir) * xzDis, sin(xzDir) * xzDis, zz );
}

float getAO(vec3 p , vec3 nor){

    float res = 0.;

    for(int i=0 ; i < 64 ; i++){
        //random sample
        vec3 rs = getAOKernelSample(float(i) , 64.);
        //set to hemisphere and set random distance from origin
        rs *= sign(dot(rs, nor)) * random(float(i));
        // rs = sqrt(rs);
        //
        res += clamp(getDist(p + nor * .01 +  rs * .2).x*20. , 0. , 1.);
    }
    res /= 64.;
    return clamp(res,0.,1.);
}

float getLight(vec3 p){
    vec3 lightPos = vec3(0. , 5., 6.);
    lightPos.xz += vec2(sin(iTime*2.) , cos(iTime*2.));
    vec3 l = normalize(lightPos - p);
    vec3 n = getNormal(p);
    

    //multiply this small .02 is for avoid the surface which the p belong to 
    float d = rayMarch(p +.02*n, l).x;
    if(d<length(lightPos - p))return 0.;
    //usually said as dif
    return clamp(dot(l , n) , 0. , 1.);
}



// p is the coord of the screen space 
// reuturn color 
vec3 render(vec2 p){
    vec3 cp = vec3(4. * sin(iTime * .1) , 2.5 , 4. * cos(iTime * .1));
    // vec3 cp = vec3(0.,1.,0.);
    vec3 la = vec3(.0, .15, .0);
    // setCamera(cp , la);

    //ray direction
    // vec3 rd = getViewdirection( vec3(p , 1.7) );
    vec3 rd = setCameraAndGetViewdirection(cp , la , vec3(p,1.7));
    // vec3 rd = vec3(p , 1.);

    vec2 tmp = rayMarch(cp , rd);
    float d = tmp.x;
    float type = tmp.y;

    vec3 color = vec3(1.0, 1.0, 1.0);

    if(d > 0.){
        
    
        //intersect position
        vec3 pos = cp + d * rd;
        //normal direction
        vec3 nor = getNormal(pos);
        //reflect direction
        // vec3 ref = reflect( rd , nor );
        
        //light intensity
        float lin = clamp(1.+dot(nor ,rd) , 0.,1.);
        //ambient occlusion,bigger ,brighter
        float occ = getAO(pos , nor);
        occ *= occ;
        if( type < 1.5 ){

        
            color = vec3(.9 , .02, .01);

            //add light
            color = color *.72 + vec3(1. , .8 , .2) * lin * .2;
            //add shadow
            color *= (.4+occ);
            //add reflect
            // color += 4.*vec3(0.8, 0.9, 1.) * smoothstep(.3, .8, ref.y)*occ*(.06 + .94*pow(lin , 5.));
            color = pow(color,vec3(0.4545));
        } else {
            color *= clamp( sqrt(occ*1.8 ), 0.,1.);
        }
        color = clamp(color , 0. , 1.);

    } 
    return color;

}

void main() {
    vec2 uv = 2.*(gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;

    // vec3 color = vec3(0.);

    // //ro camera position
    // vec3 ro = vec3(0.,1.,0.);
    // //the point ray pass through, this means the ray come from 0,1,0 and point to uv.x uv.y 1
    // vec3 rd = normalize(vec3(uv , 1.));

    // float d = rayMarch(ro , rd);
    // vec3 p = ro + rd*d;


    // color = vec3(d)/10.;
    // color = vec3( getLight(p) );
    vec3 color = render(uv);
    // vec2 q = gl_FragCoord.xy / iResolution.xy;

    // color *= 0.2 + 0.8*pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),0.2);
    gl_FragColor = vec4(color , 1.);
}