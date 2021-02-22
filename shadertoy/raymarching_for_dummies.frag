#iChannel0 "file:///Users/yashanzhang/codes/waste-paper-box/assets/imgs/templechannel0.jpg"
#iChannel1 "file:///Users/yashanzhang/codes/waste-paper-box/assets/imgs/noise.png"
#iChannel2 "file:///Users/yashanzhang/codes/waste-paper-box/assets/imgs/templechannel2.jpg"

// 癫痫勿入
// void main() {
//     float rChannel = abs(sin(1. + iTime));
//     float gChannel = abs(sin(1. + iTime * .2));
//     float bChannel = abs(sin(1. + iTime * 3.));
//     gl_FragColor = vec4(rChannel, gChannel, bChannel,1.);
// }

#define MAX_STEPS 100
#define MAX_DIST 100.
// surf_dist is the value , that if distance less than it means hit the surface
#define SURF_DIST 0.01 

// noise function
float hash1( vec2 p )
{
    p  = 50.0*fract( p*0.3183099 );
    return fract( p.x*p.y*(p.x+p.y) );
}

float hash( uint n )
{
	n = (n << 13U) ^ n;
    n = n * (n * n * 15731U + 789221U) + 1376312589U;
    return uintBitsToFloat( (n>>9U) | 0x3f800000U ) - 1.0;
}

vec2 hash2( float n ) { return fract(sin(vec2(n,n+1.0))*vec2(43758.5453123,22578.1459123)); }

float noise( vec2 x )
{
    ivec2 p = ivec2(floor(x));
    vec2 f = fract(x);
	f = f*f*(3.0-2.0*f);
	ivec2 uv = p.xy;
	float rgA = texelFetch( iChannel1, (uv+ivec2(0,0))&255, 0 ).x;
    float rgB = texelFetch( iChannel1, (uv+ivec2(1,0))&255, 0 ).x;
    float rgC = texelFetch( iChannel1, (uv+ivec2(0,1))&255, 0 ).x;
    float rgD = texelFetch( iChannel1, (uv+ivec2(1,1))&255, 0 ).x;
    return mix( mix( rgA, rgB, f.x ),
                mix( rgC, rgD, f.x ), f.y );
}

float noise( vec3 x )
{
    vec3 p = floor(x);
    vec3 f = fract(x);
	f = f*f*(3.0-2.0*f);
	vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
	vec2 rg = textureLod( iChannel1, (uv+0.5)/256.0, 0.0).yx;
	return mix( rg.x, rg.y, f.z );
}

// volum distance function,  distance form one point to the volume
float sphere(vec3 center , float radius) {
    return length(center) - radius;
}
float sphere(vec3 start, vec3 center, float radius) {
    return length(center - start) - radius;
}

// @param {normal} 平面法线
// @param {point} 点坐标
float plane(vec3 normal, vec3 point) {
    return dot(normalize(normal), point);
}
float plane(vec3 normal, vec3 inplanepoint, vec3 point) {
    return dot (normalize(normal), point - inplanepoint);
}

float landscape(vec3 point) {
    return point.y - noise(point.xz);
}

// step distance from intra point to objects in the scene
float getDistance(vec3 point) {
    // float p1 = sphere(point, vec3(0., 1., 2.), .5);
    // float p2 = plane(vec3(0., 1., 0.), point);
    // return min(p1, p2);
    // return p1;
    return landscape(point);
}

// calc normal for ordinary sdf volume combined by all objects in the scene
vec3 getNormal(vec3 point ) {
    vec2 e = vec2(0.01, 0.) ;
    float d = getDistance(point);
    return normalize(vec3(
        d - getDistance(point - e.xyy),
        d - getDistance(point - e.yxy),
        d - getDistance(point - e.yyx)
    ));
}



// get light direction
vec3 getLightDir(vec3 lightPos, vec3 point) {
    return normalize(lightPos - point);
}

// get light Density
float getLightDen(vec3 normal, vec3 lightDir) {
    return dot(normal, lightDir);

}

// ray marching
// @returns the final distance
float rayMarch (vec3 ro, vec3 rd) {
    float dis = 0.; 
    rd= normalize(rd);
    for (int i = 0 ; i < MAX_STEPS ; i++ ) {
        float disStep = getDistance(ro + rd * dis);
        dis += disStep;
        if (dis > MAX_DIST || disStep < SURF_DIST) {
            break;
        }
    }
    return dis;
}

bool ifInShadow(vec3 lightPos, vec3 point) {
    vec3 normal = getNormal(point);
    float dis = rayMarch(point + normal * SURF_DIST * 5., getLightDir(lightPos, point));
    if (dis  < length(lightPos - point)) {
        return true;
    }
    return false;
}

bool ifInShadow(vec3 lightPos, vec3 point, float loose) {
    vec3 normal = getNormal(point);
    float dis = rayMarch(point + normal * SURF_DIST * loose, getLightDir(lightPos, point));
    if (dis  < length(lightPos - point)) {
        return true;
    }
    return false;
}

// ray marching
// @returns intersection point and the final distance
// vec4 rayMarchDis (vec3 ro, vec3 rd) {
//     float dis = 0.; 
//     rd= normalize(rd);
//     for (int i = 0 ; i < MAX_STEPS ; i++ ) {
//         float disStep = getDistance(ro + rd * dis);
//         dis += disStep;
//         if (dis > MAX_DIST || disStep < SURF_DIST) {
//             break;
//         }
//     }
//     return dis;
// }
float rayMarchHeight(vec3 ro, vec3 rd) {
    float dt = 0.03;
    rd = normalize(rd);
    float dis = 0.;
    for ( dis = 0.; dis < 25. ; dis += dt ) {
        vec3 p = ro + rd * dis;
        if ( p.y <= noise(p.xz) ) break;
    }
    return dis;
}

// vec3 getNormalHeight() {
//     return vec3(0.);
// }

void main () {
    // point position, normalized
    vec2 uv = 2. * (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.xy;

    vec3 col = vec3(0);

    // ro is camera position, in other words ray origin
    vec3 ro = vec3(0., 1., iTime) ;
    // here by set rd , i set z positive direction to inner direction 
    // rd is ray direction, in other words camera direction 
    vec3 rd = normalize(vec3(uv.x, uv.y -0.3, 1.));
    vec3 lightPos = vec3(-.3, 2.,0.);
    float d = rayMarch(ro, rd);
    vec3 point = ro + rd * d;
    

    // d /= 6.;
    // col = vec3(d);
    if (ifInShadow(lightPos, point)) {
        col = vec3(0.);
    }
    else {
        col = vec3(getLightDen(getNormal(point), getLightDir(lightPos, point) ));
    }

    if (d >= MAX_DIST) col = vec3(0.);

    // float d = rayMarchHeight(ro, rd);
    // vec3 point = ro + rd * d;
    // col = vec3(point.y / 2.);
    gl_FragColor = vec4(col, 1.);
}