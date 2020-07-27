#version 300 es



#define PI_TWO			1.570796326794897
#define PI				3.141592653589793
#define TWO_PI			6.283185307179586


#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURFACE_DIST .01

float getDist(vec3 p){
    // position xyz and radius
    // vec4 sphere = vec4(0. , 1.+sin(iTime) , 6. , 1.);
    vec4 sphere = vec4(0. , 1. , 6. , 1.);
    float dPlane = abs(p.y);
    float dSphere = length( p - sphere.xyz ) - sphere.w;
    return min(dPlane , dSphere);
}

vec3 getNormal(vec3 p){
    vec2 e = vec2(.01 , 0.);
    float d = getDist(p);
    vec3 n = vec3(
        getDist(p + e.xyy) -d,
        getDist(p + e.yxy) -d,
        getDist(p + e.yyx) -d
    );

    return normalize(n);
}



float rayMarch(vec3 ro , vec3 rd){
    float doo = 0.;
    for(int i=0 ; i<MAX_STEPS ;i++){
        vec3 p = ro + doo * rd;
        float ds = getDist(p);
        doo += ds;
        if(ds < SURFACE_DIST || doo > MAX_DIST){
            break;
        }
    }
    
    return doo;
}

float getLight(vec3 p){
    vec3 lightPos = vec3(0. , 5., 6.);
    lightPos.xz += vec2(sin(iTime*2.) , cos(iTime*2.));
    vec3 l = normalize(lightPos - p);
    vec3 n = getNormal(p);
    

    //multiply this small .02 is for avoid the surface which the p belong to 
    float d = rayMarch(p +.02*n, l);
    if(d<length(lightPos - p))return 0.;
    //usually said as dif
    return clamp(dot(l , n) , 0. , 1.);
}



void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;

    vec3 color = vec3(0.);

    //ro camera position
    vec3 ro = vec3(0.,1.,0.);
    //the point ray pass through, this means the ray come from 0,1,0 and point to uv.x uv.y 1
    vec3 rd = normalize(vec3(uv , 1.));

    float d = rayMarch(ro , rd);
    vec3 p = ro + rd*d;


    // color = vec3(d)/10.;
    color = vec3( getLight(p) );
    gl_FragColor = vec4(color , 1.);
}