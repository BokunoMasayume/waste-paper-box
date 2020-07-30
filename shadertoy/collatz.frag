// Created by inigo quilez - iq/2016
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.


// The visuals for the third part of my video "Collatz and Self Similarity": 
//
// https://www.youtube.com/watch?v=GJDz4kQqTV4
//
// (minus the text overlays, which cannot do in the online version of Shadertoy


//------------------------------------------------------
// global
//------------------------------------------------------

#define AA 3 // supersampling level. Make higher for more quality.

const float pi = 3.1415926535897932384626433832795; // should be pronounced "pee" not "pie", dear english speakers!



//------------------------------------------------------
// complex numbers
//------------------------------------------------------

vec2 cadd( vec2 a, float s ) { return vec2( a.x+s, a.y ); }
vec2 cmul( vec2 a, vec2 b )  { return vec2( a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x ); }
vec2 cdiv( vec2 a, vec2 b )  { float d = dot(b,b); return vec2( dot(a,b), a.y*b.x - a.x*b.y ) / d; }
vec2 cmulj( vec2 z ) { return vec2(-z.y,z.x); }
vec3 cexp( vec2 z ) { return vec3( exp(z.x), vec2( cos(z.y), sin(z.y) ) ); }
vec3 cexpj( vec2 z ) { return vec3( exp(-z.y), vec2( cos(z.x), sin(z.x) ) ); }



//------------------------------------------------------
// signed distance functions
//------------------------------------------------------

float sdSegment( vec2 p, vec2 a, vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

float smin( float a, float b, float k )
{
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}

float sdCurveb( in vec2 p, vec2 k0, vec2 k1, vec2 k2, float h)
{
    h = smoothstep(0.0,0.8,h);
    vec2 c = k0;
    vec2 b = (4.0*k1 - k2 - 3.0*k0);
    vec2 a = 2.0*k0 - 4.0*k1 + 2.0*k2;
    float res = length(p-k0);
    for( int i=0; i<50; i++ )
    {
        float t1 = float(i+0)/50.0;
        float t2 = float(i+1)/50.0;
        if( t1>=h ) break;
        t2 = min(t2,h);
        
        vec2 p1 = a*t1*t1 + b*t1 + c;
        vec2 p2 = a*t2*t2 + b*t2 + c;
        
        res = min( res, sdSegment( p, p1, p2 ) );
    }
    
    return res;    
}



//------------------------------------------------------
// Visualization
//------------------------------------------------------

const vec2 fp4 = vec2(-4.001318,0.1870178);
const vec2 fp3 = vec2(-2.008426,0.2190410);
const vec2 fp2 = vec2(-0.5185009860894,0.124974296258);
const vec2 fp1 = vec2( 0.0);
const vec2 fp5 = vec2( 1.9982895,0.1291284);

vec3 render( in vec2 fragCoord, float time )
{
    float sc = 4.5;
    vec2 ce = vec2(0.0,0.0);    

    if( time>0.0 )
    {
        sc = 4.5 * pow( 0.9, 0.2*time );
    }
    if( time>43.0 )
    {
        sc = 4.5 * pow( 0.9, 0.2*time ) * pow( 0.9, 88.0*smoothstep( 43.0, 60.0, time ) );
    }
    if( time>60.0 )
    {
        float f = smoothstep( 60.0, 75.0, time );
    	sc = mix( sc, 2.5, 1.0-exp(-0.001*pow(time-60.0,3.0)) );
    	ce = mix( ce, vec2(3.0,0.0), pow(smoothstep(60.0,75.0,time), 3.0 ) );
    }
    if( time>75.0 )
    {
        sc = mix( sc, 3.5 * pow( 0.9, 6.3*smin(time-75.0,15.0,5.0) ), smoothstep(75.0,80.0,time) );
    }
    if( time>96.0 )
    {
	float f = smin(time-96.0,5.0,0.5)/5.0;
        sc = mix( sc, 2.5, pow( f, 6.0 ) );
        sc = mix( sc, 2.5/pow(0.9, 0.08*smin(time-100.0,35.0,2.0) ), smoothstep(100.0,103.0,time) );
    }
    if( time>157.5 )
    {
        sc = mix( sc, 2.5*pow(0.9, 1.4*smin(time-157.5,5.5,0.5) ), pow(smoothstep(157.5,162.5,time),2.0) );
    }
    if( time>187.0 )
    {
        sc = mix( sc, sc*pow(0.9, 8.2*smin(time-187.5,5.5,0.5) ), pow(smoothstep(187.0,192.5,time),2.0) );
    }
    if( time>212.0 )
    {
        sc = mix( sc, sc*pow(0.9, 2.4*smin(time-212.0,6.0,0.2) ), pow(smoothstep(212.0,218.0,time),2.0) );
    }


    if( time>268.0 )
    {
        sc = mix( sc, sc/pow(0.9, 3.5*smin(time-268.0,19.0,0.2) ), pow(smoothstep(268.0,268.0+19.0,time),2.0) );
    }

    vec2 p = ce + sc*(-iResolution.xy+2.0*fragCoord) / iResolution.x;
    float e = sc*2.0/iResolution.x;
    
    vec2 z = p;
    //n = vec2(n.x,0.0);
    
    const float th = 10000000000.0;
    
    vec2 lz = z;
    float d = 0.0;
    float f = 0.0;
    float rmin = th;
    vec2 dz = vec2(1.0,0.0);
    vec2 ldz = dz;
    for( int i=0; i<64; i++ )
    {
        vec3 k = cexpj( pi*z );
        
        lz = z;
        ldz = dz;

        dz = cmul( (vec2(7.0,0.0) - k.x*cmul(k.yz,vec2(5.0-5.0*pi*z.y, pi*(5.0*z.x+2.0))))/4.0, dz );
        
        //rmin = min( rmin, length(cdiv( cadd(7.0*z,2.0) , cadd(5.0*z,2.0) ) - k.x*k.yz) );
        
        z = ( cadd(7.0*z,2.0) - k.x*cmul(k.yz,cadd(5.0*z,2.0)) )/4.0;


        float r = length(z);
        rmin = min( rmin, r );
        if( r>th ) { d=1.0; break; }
        f += 1.0;
    }
    
    vec3 col = vec3(0.0);
    if( d<0.5 )
    {
        col = vec3(0.0,0.0,0.0);
    }
    else if( d<1.5 )
    {
        col = vec3(1.0,0.6,0.2);
        
        f += clamp( log(th/length(lz))*1.8, 0.0, 1.0 ) - 1.0;
        col = 0.5 + 0.5*cos(0.15*f + 1.5 + vec3(0.2,0.9,1.0));
        col *= 0.027*f;
        
        //col += 0.1*sin(40.0*atan(lz.x,lz.y));
        
        float dis = log(length(lz))*length(lz)/length(ldz);
        col += 0.025*sqrt(dis/sc) - 0.1;
        col *= 1.1;
    }
    else //if( d<0.5 )
    {
        col = vec3(1.0,1.0,0.0);
    }

    
    // anchor
    #if 1
    float ra = 1.0*sqrt(abs(p.x))/5.0;
    col = mix( col, vec3(1.0,1.0,0.0), (1.0 - smoothstep( ra, ra+0.01, rmin ))*smoothstep(100.0,103.0,time)*(1.0-smoothstep(268.0,273.0,time )) );
    #endif

    // fixed point
    #if 1
    {
    float show = smoothstep( 21.0, 22.0, time ) - smoothstep( 32.0, 33.0, time );
    col = mix( col, vec3(1.0,0.9,0.4), show*(1.0 - smoothstep( sc*0.002, sc*0.004, abs(length(p-fp1)-0.03*sc) )) );
    col = mix( col, vec3(1.0,0.9,0.4), show*(1.0 - smoothstep( sc*0.002, sc*0.004, abs(length(p-fp2)-0.03*sc) )) );
    col = mix( col, vec3(1.0,0.9,0.4), show*(1.0 - smoothstep( sc*0.002, sc*0.004, abs(length(p-fp3)-0.03*sc) )) );
    col = mix( col, vec3(1.0,0.9,0.4), show*(1.0 - smoothstep( sc*0.002, sc*0.004, abs(length(p-fp4)-0.03*sc) )) );
    col = mix( col, vec3(1.0,0.9,0.4), show*(1.0 - smoothstep( sc*0.002, sc*0.004, abs(length(p-fp5)-0.03*sc) )) );
    }
    #endif

    // integers
    #if 1
    {
    float show = smoothstep( 16.0, 17.0, time ) - smoothstep( 19.0, 20.0, time );
    if( abs(p.y)<0.5 )
    {
    float f = length( fract(p+0.5) - 0.5 );
    col = mix( col, vec3(1.0,1.0,0.0), (1.0 - smoothstep( sc*0.002, sc*0.004, abs(f-0.03*sc) ))*show );
    }
    }
    #endif



    // first preimages of 0
    #if 0
    {
    vec2 z = p;
    vec3 k = cexpj( pi*z );
    vec2 dz = cdiv( cadd(7.0*z,2.0) , cadd(5.0*z,2.0) ) - k.x*k.yz;
    float f = length(dz);
    col = mix( col, vec3(1.0,1.0,0.0), 1.0 - smoothstep( 0.15,0.2,f) );
    }
    #endif
    
    col = clamp( col, 0.0, 1.0 );
    
    // axis
    #if 1
    float show = 1.0 - smoothstep(268.0,273.0,time );
    float g  = smoothstep( 0.0, 1.0*e, abs( fract(p.y+0.5)-0.5 ) );
          g *= smoothstep( 0.0, 1.0*e, abs( fract(p.x+0.5)-0.5) );
    col = mix( col, vec3(0.0,0.0,0.0), (1.0-g)*show );

          g  = smoothstep( 0.5*e, 2.0*e, abs(p.y) );
          g *= smoothstep( 0.5*e, 2.0*e, abs(p.x) );
    col = mix( col, vec3(0.0,0.0,0.0), (1.0-g)*show );
   
    #endif

    // zoom point
    #if 1
    {
    float show = smoothstep(142.0,143.0,time ) - smoothstep(268.0,273.0,time );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0-smoothstep( 17.0*e, 18.0*e, length(p - ce)))*show );
    }
    #endif


    // fingers
    #if 1
    {
    float d1 = sdSegment( p, vec2(0.4,-2.0), vec2(-0.0,1.0) );
    float d2 = sdSegment( p, vec2(1.32,-2.0), vec2(0.95,1.0) );
    float d3 = sdSegment( p, vec2(2.2,-2.0), vec2(1.9,1.0) );
    float d4 = sdSegment( p, vec2(3.2,-2.0), vec2(2.9,1.0) );
    float ct = smoothstep( 156.0, 158.0, time );
    col = mix( col, vec3(1.0,1.0,0.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d1 ))*(smoothstep(150.0,151.0,time)-ct) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d2 ))*(smoothstep(151.0,152.0,time)-ct) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d3 ))*(smoothstep(152.0,153.0,time)-ct) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d4 ))*(smoothstep(153.0,154.0,time)-ct) );
    }
    #endif

    // fingers2
    #if 1
    {
    float show = smoothstep( 172.5, 173.0, time ) - smoothstep( 185.0, 187.0, time );

    float f0 = smoothstep(173.0,174.5,time);
    float f1 = smoothstep(174.9,175.4,time);
    float f2 = smoothstep(175.3,175.8,time);
    float f3 = smoothstep(175.7,176.2,time);
    float f4 = smoothstep(176.8,177.3,time);
    float f5 = smoothstep(177.1,177.6,time);
    float f6 = smoothstep(177.4,177.9,time);
    float f7 = smoothstep(178.0,178.5,time);
    float f8 = smoothstep(178.3,178.8,time);
    float f9 = smoothstep(178.6,179.1,time);
    float f10 = smoothstep(179.1,179.6,time);

    float d0 = sdCurveb( p, vec2(2.28,-0.17), vec2(2.12,-0.08), vec2(1.92,-0.08), f0 );
    float d1 = sdCurveb( p, vec2(2.32,-0.14), vec2(2.12,-0.01), vec2(1.92,0.05), f1 );
    float d2 = sdCurveb( p, vec2(2.36,-0.10), vec2(2.20,0.05), vec2(1.95,0.15), f2 );
    float d3 = sdCurveb( p, vec2(2.41,-0.08), vec2(2.20,0.22), vec2(2.0,0.35), f3 );
    float d4 = sdCurveb( p, vec2(2.46,-0.05), vec2(2.37,0.22), vec2(2.2,0.5), f4 );
    float d5 = sdCurveb( p, vec2(2.53,-0.04), vec2(2.50,0.30), vec2(2.5,0.6), f5 );
    float d6 = sdCurveb( p, vec2(2.59,-0.04), vec2(2.65,0.30), vec2(2.76,0.55), f6 );
    float d7 = sdCurveb( p, vec2(2.65,-0.05), vec2(2.81,0.25), vec2(3.1,0.5), f7 );
    float d8 = sdCurveb( p, vec2(2.70,-0.06), vec2(2.84,0.12), vec2(3.0,0.25), f8 );
    float d9 = sdCurveb( p, vec2(2.76,-0.09), vec2(2.93,0.06), vec2(3.1,0.12), f9 );
    float d10 = sdCurveb( p, vec2(2.8,-0.12), vec2(2.95,-0.01), vec2(3.1,0.02), f10 );

    col = mix( col, vec3(1.0,1.0,0.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d0 ))*show*step(0.0001,f0) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d1 ))*show*step(0.0001,f1) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d2 ))*show*step(0.0001,f2) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d3 ))*show*step(0.0001,f3) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d4 ))*show*step(0.0001,f4) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d5 ))*show*step(0.0001,f5) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d6 ))*show*step(0.0001,f6) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d7 ))*show*step(0.0001,f7) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d8 ))*show*step(0.0001,f8) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d9 ))*show*step(0.0001,f9) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d10 ))*show*step(0.0001,f10) );
    
    }
    #endif

    // fingers3
    #if 1
    {
    float show = smoothstep( 197.5, 198.0, time ) - smoothstep( 210.0, 212.0, time );

    float f0 = smoothstep(198.0,198.5,time);
    float f1 = smoothstep(202.2,202.7,time);
    float f2 = smoothstep(202.6,203.1,time);
    float f3 = smoothstep(203.0,203.5,time);
    float f4 = smoothstep(203.9,204.4,time);
    float f5 = smoothstep(204.5,205.0,time);

    float d0 = sdCurveb( p, vec2(2.9936,-0.004), vec2(2.9926,-0.001), vec2(2.9915,0.0005), f0 );
    float d1 = sdCurveb( p, vec2(2.9948,-0.004), vec2(2.994,-0.001), vec2(2.993,0.001), f1 );
    float d2 = sdCurveb( p, vec2(2.9959,-0.003), vec2(2.9953,-0.001), vec2(2.9941,0.0015), f2 );
    float d3 = sdCurveb( p, vec2(2.9973,-0.0027), vec2(2.9967,0.0), vec2(2.996,0.002), f3 );
    float d4 = sdCurveb( p, vec2(2.9988,-0.0024), vec2(2.9983,0.0), vec2(2.9975,0.0028), f4 );
    float d5 = sdCurveb( p, vec2(3.00045,-0.0021), vec2(3.00005,0.0), vec2(2.9994,0.0031), f5 );

    col = mix( col, vec3(1.0,1.0,0.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d0 ))*show*step(0.0001,f0) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d1 ))*show*step(0.0001,f1) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d2 ))*show*step(0.0001,f2) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d3 ))*show*step(0.0001,f3) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d4 ))*show*step(0.0001,f4) );
    col = mix( col, vec3(1.0,1.0,1.0), (1.0 - smoothstep( sc*0.005, sc*0.006, d5 ))*show*step(0.0001,f5) );
    }
    #endif
    
    return col;

}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec3 col = vec3(0.0);
    
    int ZERO = min(iFrame,0);
    
#if AA>1
    for( int m=ZERO; m<AA; m++ )
    for( int n=ZERO; n<AA; n++ )
    {
        vec2 px = fragCoord + vec2(float(m),float(n))/float(AA);
    	col += render( px, iTime );    
    }
    col /= float(AA*AA);
#else
        
    col = render( fragCoord, iTime );
#endif            
    
	fragColor = vec4( col, 1.0 );
}