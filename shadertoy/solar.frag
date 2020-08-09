#iChannel0 "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_earth_daymap.jpg"
#iChannel1 "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_earth_normal_map.jpg"
#iChannel2  "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_stars.jpg"
#define PHI             3.141592653589793
#define MAX_STEPS 400
#define MAX_DIST 100.
#define SURFACE_DIST .00001

float sdSphere(vec3 p , float r){
    return length(p) - r;
}

vec2 ballcoord(vec3 p){
    p = normalize(p);
    vec2 pxy_z = vec2( length(p.xy) ,p.z);

    // float theta = asin(length (cross( vec3(0.,1. ,0.) , p) ) );
    // float theta = acos( dot(p , vec3(0.,1.,0.)) );
    float theta = acos( p.y );
    // if(theta< 0.){
    // }
    // float theta = acos(p.y) ;


    vec2 pxz = normalize(p.xz);
    float fai = acos(dot( vec2(1.,0.) , pxz ));
    if(p.z <0.){
        fai = 2.*PHI - fai;
    }

// return p.xy *.5+.5;
    // return vec2(p.x*.5+.5  , theta/(PHI)   );
    return vec2(1. -fai/(2.*PHI)   , 1.- theta/(PHI)   );
    // return vec2(  theta/PHI ,fai/(PHI));
}

vec2 getDist(vec3 p){
    vec2 res = vec2(0.);

    vec3 sphereCenter = vec3(0.,0.,0.);
    float radius = 1.;

    float dis = sdSphere( p - sphereCenter , radius );
    res.x = dis;
    return res;
}

//cp: camera position
//la : look at position
vec3 setCameraAndGetViewdirection(vec3 cp , vec3 la , vec3 vd) {
    

    vec3 ww = normalize( la - cp );
    vec3 uu = normalize( cross(ww, vec3(0. , 1. , 0.)) );
    vec3 vv = normalize( cross(uu ,ww) );

    mat3 cameraTransform = mat3(uu, vv, ww);

    return normalize( cameraTransform * vd ) ;
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



vec3 render (vec2 p ){
    vec3 cp = vec3(4.5 * sin(iTime * .2)  , 0. + 6.* (iMouse.y/iResolution.y - .5) , 4.5 * cos(iTime * .2));
    vec3 la = vec3( 0.,0.,0. );
    vec3 rd = setCameraAndGetViewdirection(cp , la , vec3(p,1.7));
    // vec3 rd =  vec3(p,1.7);
    // vec3 cp = vec3(0.,0.,-3.);

    vec2 tmp = rayMarch(cp , rd);
    if(tmp.y<0.){
        return texture(iChannel2 , .5*(p+1.)).xyz;
    }

    vec3 pos = cp + rd * tmp.x;

    vec2 ballcor = ballcoord(pos);

    vec3 nor = texture(iChannel1 , ballcor).xyz  ;
    nor = normalize(nor);

    vec3 light =  normalize( vec3(1.,-1.,1.) ); 
    

    return  dot(pos , light)*smoothstep(.35,.5 , dot(nor , light)) * texture(iChannel0 , ballcor).xyz;
}

void main(){

    vec2 uv = 2.*(gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.x;
    // vec2 uv = (gl_FragCoord.xy ) / iResolution.x;

    // uv = uv+1.;

    // vec2 uv = gl_FragCoord.xy / iResolution.xy;
    // gl_FragColor = vec4(smoothstep(asin(uv.x)/PHI , asin(uv.x)/PHI+0.001, uv.y));
    // gl_FragColor = vec4(smoothstep(acos(uv.x)/PHI , acos(uv.x)/PHI+0.001, uv.y));
    gl_FragColor = vec4( render(uv)  ,1.);
}