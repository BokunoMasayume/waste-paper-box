

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

// step distance from intra point to objects in the scene
float getDistance(vec3 point) {
    float p1 = sphere(point, vec3(0., 1., 2.), .5);
    float p2 = plane(vec3(0., 1., 0.), point);
    return min(p1, p2);
    // return p1;
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
    float dis = rayMarch(point + normal * SURF_DIST * 2., getLightDir(lightPos, point));
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

void main () {
    // point position, normalized
    vec2 uv = 2. * (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.xy;

    vec3 col = vec3(0);

    // ro is camera position, in other words ray origin
    vec3 ro = vec3(0., 1., 0.) ;
    // here by set rd , i set z positive direction to inner direction 
    // rd is ray direction, in other words camera direction 
    vec3 rd = normalize(vec3(uv.x, uv.y, 1.));
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
    gl_FragColor = vec4(col, 1.);
}