#iChannel0 "file:///Users/yashanzhang/codes/waste-paper-box/assets/imgs/nightcity1.jpeg"


vec3 hsv2rgb(vec3 hsv) {
    float c, x, m;
    float r,g,b = 0.;
    c = hsv.z * hsv.y;
    x = c * ( 1. - abs(mod(hsv.x / 60., 2.) - 1.) );
    m = hsv.z - c;
    if (hsv.x < 60.) {
        r = c;
        g = x;
        b = 0.;
    } else if ( hsv.x < 120. ) {
        r = x;
        g = c;
        b = 0.;
    } else if ( hsv.x < 180. ) {
        r = 0.;
        g = c; 
        b = x;
    } else if ( hsv.x < 240. ) {
        r = 0.;
        g = x;
        b = c;
    } else if ( hsv.x < 300. ) {
        r = x;
        g = 0.;
        b = c;
    } else {
        r = c;
        g = 0.;
        b = x;
    }

    return vec3(r, g, b) + m ;
    // return (vec3(r, g, b) + m ) * 255.;
}

vec3 rgb2hsv(vec3 rgb) {
    float r, g, b, cmax, cmin, delta, h, s, v;
    // r = rgb.x / 255.;
    // g = rgb.y / 255.;
    // b = rgb.z / 255.;
    r = rgb.x ;
    g = rgb.y ;
    b = rgb.z ;
    
    cmax = max( max(r, g), b );
    cmin = min( min(r, g), b );

    delta = cmax - cmin;

    v = cmax;

    s = 0.;
    if (cmax > 0.) {
        s = delta / cmax;
    }

    h = 0.;
    if (delta == 0.) {
        h = 0.;
    } else if (cmax == r) {
        h = 60. * mod((g - b) / delta , 6.);
    } else if (cmax == g) {
        h = 60. * ((b-r)/delta + 2.);
    } else {
        h = 60. * ((r - g)/delta + 4.);
    }

    return vec3(h, s, v);
}

void main () {
    vec3 col = vec3(1., 0.5, 1.);
    col = texture(iChannel0, gl_FragCoord.xy / iResolution.xy).xyz;
    vec3 col2 = rgb2hsv(col );
    col2.x = mod(col2.x + iTime * 300., 360.);
    col = hsv2rgb(col2) ;
    gl_FragColor = vec4(col, 1.);
}