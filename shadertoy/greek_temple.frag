float hash1 ( vec2 p ) {
    p = 50. * fract(p * 0.3183099);
    return fract( p.x * p.y * (p.x + p.y) );
}

float hash (uint n) {
    n = (n << 13U) ^ n;
    n = n * ( n * n * 15731U + 789221U ) + 1376312589U;
    return uintBitsToFloat( (n >> 9U) | 0x3f800000U ) - 1.;
}

vec2 hash2( float n ) { return fract(sin(vec2(n,n+1.0))*vec2(43758.5453123,22578.1459123)); }

float noise (vec2 x) {
    ivec2 p = ivec2(floor(x));
    vec2 f = fract(x);
    
}

void main () {
    vec3 col = vec3(1., 0., 0.);
    gl_FragColor = vec4(col, 1.);
}