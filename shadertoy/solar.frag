#iChannel0 "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_earth_daymap.jpg"
#iChannel1 "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_earth_normal_map.jpg"
#iChannel2  "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_stars.jpg"
#iChannel3 "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_earth_nightmap.jpg"
#iChannel4 "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_earth_clouds.jpg"
#iChannel5 "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_earth_specular_map.jpg"

// #iChannel0 "file://Users/yashanzhang/Downloads/waste-paper-box-master/shadertoy/textures/solar/2k_earth_daymap.jpg"
// #iChannel1 "file://Users/yashanzhang/Downloads/waste-paper-box-master/shadertoy/textures/solar/2k_earth_normal_map.jpg"
// #iChannel2  "file://Users/yashanzhang/Downloads/waste-paper-box-master/shadertoy/textures/solar/2k_stars.jpg"
// #iChannel3 "file://Users/yashanzhang/Downloads/waste-paper-box-master/shadertoy/textures/solar/2k_earth_nightmap.jpg"
// #iChannel4 "file://Users/yashanzhang/Downloads/waste-paper-box-master/shadertoy/textures/solar/2k_earth_clouds.jpg"




#define PHI             3.141592653589793
#define MAX_STEPS 400
#define MAX_DIST 100.
#define SURFACE_DIST .00001

float sdSphere(vec3 p , float r){
    return length(p) - r;
}


float hash(float seed){
    return fract(  sin(seed) * 10000. );
}

// grandient noise
float noise(float seed){
    float i = floor(seed);
    float f = fract(seed);

    float t = f*f*(3.-2.*f);

    return mix(  
        hash(i),
        hash(i+1.),
        t
    );
}

vec2 ballcoord(vec3 p){
    p = normalize(p);
    vec2 pxy_z = vec2( length(p.xy) ,p.z);

    float theta = acos( p.y );
  

    vec2 pxz = normalize(p.xz);
    float fai = acos(dot( vec2(1.,0.) , pxz ));
    if(p.z <0.){
        fai = 2.*PHI - fai;
    }

    return vec2(1. -fai/(2.*PHI)   , 1.- theta/(PHI)   );
}


//bias.x is theta bias
//bias.y  is fai bias
vec2 ballcoord(vec3 p , vec2 bias ){
    p = normalize(p);
    vec2 pxy_z = vec2( length(p.xy) ,p.z);

    float theta = acos( p.y ) + bias.x;
    if(theta > PHI){
        theta -= PHI;
    }
  

    vec2 pxz = normalize(p.xz);
    float fai = acos(dot( vec2(1.,0.) , pxz )) ;
    
    if(p.z <0.){
        fai = 2.*PHI - fai;
    }
    fai = fai + bias.y;
    if(fai> 2.*PHI){
        fai -= 2.*PHI;
    }

    return vec2(1. -fai/(2.*PHI)   , 1.- theta/(PHI)   );
}

vec3 getEarthCenter(){
    return vec3(.0,0.,.0) ;
    // return vec3(.10,0.,.5) + vec3(4.*sin(iTime*.4) , 0., 4.*cos(iTime*.4));
}

vec3 getSunCenter(){
    return vec3(20.,3.,0.);
}



vec2 getDist(vec3 p){
    vec2 res = vec2(0.);

    vec3 sphereCenter = getEarthCenter();
    float radius = 1.;

    float dis = sdSphere( p - sphereCenter , radius );
    res.x = dis;
    return res;
}

vec2 getDist(vec3 p , float radius){
    vec2 res = vec2(0.);

    vec3 sphereCenter = getEarthCenter();

    float dis = sdSphere(p - sphereCenter , radius);
    res.x = dis;

    return res;
}

//cp: camera position
//la : look at position
vec3 setCameraAndGetViewdirection(vec3 cp , vec3 la , vec3 vd) {
    

    vec3 ww = normalize( la - cp );
    vec3 uu = normalize( cross(vec3(0. , 1. , 0.) , ww  ) );
    vec3 vv = normalize( cross(ww , uu ) );

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

vec2 rayMarch(vec3 ro , vec3 rd , float radius){
    float doo = 0.;
    vec2 res = vec2(0.);

    for(int i=0 ; i<MAX_STEPS ;i++){
        vec3 p = ro + doo * rd;
        res = getDist(p , radius);
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
    // vec3 cp = vec3(5.8  , 0. + 6.* (iMouse.y/iResolution.y - .5) , 0.);
    vec3 cp = vec3(0.  , 0. + 6.* (iMouse.y/iResolution.y - .5) , -5.);
    // vec3 cp = vec3(4.5 * sin(iTime * .4)  , 0. + 6.* (iMouse.y/iResolution.y - .5) , 4.5 * cos(iTime * .4));
    vec3 la = vec3( 0.,0.,0. );
    vec3 rd = setCameraAndGetViewdirection(cp , la , vec3(p,1.7));
    // vec3 rd =  vec3(p,1.7);
    // vec3 cp = vec3(0.,0.,-3.);

    //earth
    vec2 tmp = rayMarch(cp , rd);

    //cloud
    vec2 tmp_cloud = rayMarch(cp , rd , 1.02);

    if(tmp_cloud.y<0.){
        return texture(iChannel2 , .5*(p+1.)).xyz;
    }

    vec3 pos = cp + rd * tmp.x;

    vec3 pos_cloud = cp + rd * tmp_cloud.x;
    vec2 ballcor_cloud = ballcoord(pos_cloud - getEarthCenter() , vec2(0.,mod(iTime *.2, 2.*PHI) ));

    vec2 ballcor = ballcoord(pos - getEarthCenter() , vec2( 0.,mod(iTime *.1, 2.*PHI)  )  );

    vec3 nor = texture(iChannel1 , ballcor).xyz  ;
    nor = normalize(nor);

    // vec3 light =  normalize( vec3(sin(iTime*1.5),-.3,cos(iTime*1.5)) ); 
    vec3 light = normalize( getSunCenter()  - pos );
    // vec3 light =  normalize( vec3( 1.,1.,1. ) ); 

    float sphereShadow = dot(normalize(pos - getEarthCenter() ), light);
    
    
    float landShadow = smoothstep(.35,.5 , dot(nor , light));

    return mix(
        .3*dot(texture(iChannel5 , ballcor).xyz , normalize(pos- getEarthCenter()) ) +
         mix( landShadow *  texture(iChannel0 , ballcor).xyz , texture(iChannel3 , ballcor).xyz  , 1. - sphereShadow ),
    //  return  mix(texture(iChannel0 , ballcor).xyz , texture(iChannel3 , ballcor).xyz  , 1.-sphereShadow );
         min(1.,sphereShadow+.6) * texture(iChannel4 , ballcor_cloud).xyz,
         texture(iChannel4  , ballcor_cloud).x
    );
    // return  dot(pos , light)*smoothstep(.35,.5 , dot(nor , light)) * texture(iChannel0 , ballcor).xyz;
}

void main(){

    vec2 uv = 2.*(gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.x;
    // vec2 uv = (gl_FragCoord.xy ) / iResolution.x;

    vec2 sunCenter = vec2(.8,.9);
    float sunDist = max(0.0,  1.0 - length(uv - sunCenter));
    vec3 sunColor = vec3(15., 9., 6.) * (pow(sunDist, 12.0) * (1.0 + 0.25 * noise( sin(iTime)+ iTime *.1+ 28.0 * atan( (uv-sunCenter).x, - (uv-sunCenter).y))  ));
    
    // float sunDis = 
    // uv = uv+1.;

    // vec2 uv = gl_FragCoord.xy / iResolution.xy;
    // gl_FragColor = vec4(smoothstep(asin(uv.x)/PHI , asin(uv.x)/PHI+0.001, uv.y));
    // gl_FragColor = vec4(smoothstep(acos(uv.x)/PHI , acos(uv.x)/PHI+0.001, uv.y));
    gl_FragColor = vec4( render(uv)  ,1.);
    gl_FragColor = vec4( sunColor  ,1.);

    gl_FragColor = mix (   
        vec4( render(uv)  ,1.),
        vec4( sunColor  ,1.),
        sunColor.x
    );
}