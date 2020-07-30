// #version 300 es



#define PI_TWO			1.570796326794897
#define PI				3.141592653589793
#define TWO_PI			6.283185307179586
#define PHI             1.6180339887498948482045868343656

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURFACE_DIST .01

//cp: camera position
//la : look at position
vec3 setCameraAndGetViewdirection(vec3 cp , vec3 la , vec3 vd) {
    vec3 cameraPosition = cp;
    vec3 lookAt = la;

    vec3 ww = normalize( la - cp );
    vec3 uu = normalize( cross(ww, vec3(0. , 1. , 0.)) );
    vec3 vv = normalize( cross(uu ,ww) );

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
    p *= 100.;
    vec2 res = vec2(0.);

    vec4 sphere = vec4(0. , 14. , .0 , 10.);
    float dPlane = abs(p.y);
    float dSphere = length( p - sphere.xyz ) - sphere.w;
    // dSphere /= 3.;
    if(dPlane > dSphere){
        res.x = dSphere ; 
        res.y = 1.;
    }else {
        res.x = dPlane ; 
        res.y = 2.;
    }

    res.x /= 100.;
    return res;
}

vec3 getNormal(vec3 p){
    vec2 e = vec2(.01 , 0.);
    float d = getDist(p).x;
    vec3 n = vec3(
        // getDist(p + e.xyy).x -d,
        // getDist(p + e.yxy).x -d,
        // getDist(p + e.yyx).x -d
        getDist(p + e.xyy).x - getDist(p - e.xyy).x,
        getDist(p + e.yxy).x - getDist(p - e.yxy).x ,
        getDist(p + e.yyx).x - getDist(p - e.yyx).x 
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
        res += clamp(getDist(p + nor * .01 +  rs * .25).x*20. , 0. , 1.);
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
    vec3 cp = vec3(.8 * sin(iTime * .1) , .25 , 1. * cos(iTime * .1));
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

    vec3 color = vec3(1.0,0.9,0.7);

    if(d > 0.){
        
    
        //intersect position
        vec3 pos = cp + d * rd;
        //normal direction
        vec3 nor = getNormal(pos);
        //reflect direction
        vec3 ref = reflect( rd , nor );
        //light intensity
        float lin = clamp(1.+dot(nor ,rd) , 0.,1.);
        //ambient occlusion,bigger ,brighter
        float occ = getAO(pos , nor);
        occ *= occ;
        if( type < 1.5 ){

        
            color = vec3(.9 , .02, .01);

            //add light
            color = color *.72 + vec3(0.9686, 0.8824, 0.8824) * lin * .2;
            //add shadow
            color *= (.4+occ);
            //add reflect
            color += 2.*vec3(0.9451, 0.9216, 0.9216) * smoothstep(.3, .8, ref.y)*occ*(.06 + .94*lin*lin);
            color = pow(color,vec3(0.4545));
        } else {
            color *= clamp( sqrt(occ*1.8 ), 0.,1.);
        }
        color = clamp(color , 0. , 1.);

    } 
    return color;

}

void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;

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
    vec2 q = gl_FragColor / iResolution.xy;

    color *= 0.2 + 0.8*pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),0.2);
    gl_FragColor = vec4(color , 1.);
}