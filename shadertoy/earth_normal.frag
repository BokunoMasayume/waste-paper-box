// #iChannel0 "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_earth_daymap.jpg"
// #iChannel1 "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_earth_normal_map.jpg"
// #iChannel2  "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_stars.jpg"
// #iChannel3 "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_earth_nightmap.jpg"
// #iChannel4 "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_earth_clouds.jpg"
// #iChannel5 "file://D:/VSCodeProject/waste-paper-box/shadertoy/textures/solar/2k_earth_specular_map.jpg"

#iChannel0 "file://Users/yashanzhang/codes/waste-paper-box/shadertoy/textures/solar/2k_earth_daymap.jpg"
#iChannel1 "file://Users/yashanzhang/codes/waste-paper-box/shadertoy/textures/solar/2k_earth_normal_map.jpg"
#iChannel2  "file://Users/yashanzhang/codes/waste-paper-box/shadertoy/textures/solar/2k_stars.jpg"
#iChannel3 "file://Users/yashanzhang/codes/waste-paper-box/shadertoy/textures/solar/2k_earth_nightmap.jpg"
#iChannel4 "file://Users/yashanzhang/codes/waste-paper-box/shadertoy/textures/solar/2k_earth_clouds.jpg"
#iChannel5 "file://Users/yashanzhang/codes/waste-paper-box/shadertoy/textures/solar/2k_earth_specular_map.jpg"




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
    // return vec3(.10,0.,1.5) + vec3(4.*sin(iTime*.4) , 0., 4.*cos(iTime*.4));
}

vec3 getSunCenter(){
    return vec3(.0+ 16.* (iMouse.x/iResolution.x - .5)  , .0+ 16.* (iMouse.y/iResolution.y - .5)  , -20. );
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

    return cameraTransform * normalize( vd ) ;
}

vec3 qie2objspace(vec3 surface_nor , vec3 texture_nor ){
    vec3 ww = normalize(surface_nor);

    vec3 uu = normalize( cross( vec3(0.,1.,0.) , ww ) );

    vec3 vv = normalize( cross( ww , uu ) );

    mat3 matrix = mat3(uu , vv , ww);

    return matrix * normalize(texture_nor);
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
    vec3 earth_col = texture(iChannel0 , p).xyz;
    vec3 earth_nor = texture(iChannel1 , p).xyz;
    earth_nor = (earth_nor - .5)*2.;
    vec3 light  = vec3(0. + 5.* (iMouse.x/iResolution.x - .5) ,0. + 5.* (iMouse.y/iResolution.y - .5),1.);
    
    light = normalize(light);

    return earth_col * pow(smoothstep(0.,.8,dot(light , earth_nor) ) , 10.);

}

void main(){

    vec2 uv = gl_FragCoord.xy / iResolution.x;
    // vec2 uv = 2.*(gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.x;
   
   gl_FragColor = vec4( render(uv)  ,1.);
    
}