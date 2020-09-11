#version 300 es

in vec3 a_position ; 
out vec2 v_texturePosition;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
// uniform float iTime;
// uniform vec2 u_textureSize;
// out float time;
out vec2 resolution;
out float order;
// out int imageIdx;
// out vec2 mouse;
// out vec2 texturesize;

/* 
cp : camera postion
la : look at 
vd : origin position 
*/
vec3 getTransformedPosition(vec3 cp , vec3 la , vec3 vd) {
    

    vec3 ww = normalize( la - cp );
    vec3 uu = normalize( cross(vec3(0. , 1. , 0.) , ww  ) );
    vec3 vv = normalize( cross(ww , uu ) );

    mat3 cameraTransform = mat3(uu, vv, ww);

    return cameraTransform *  vd  ;
}

void main(){
    vec3 position = vec3(1. - a_position.x*2., a_position.y*2. - 1., a_position.z);
    // 会造成形变
    // gl_Position = vec4(getTransformedPosition(vec3(u_mouse*2.,1.), vec3(0.,0.,0.), position), 1.);

    // 无形变
    if( a_position.z != 0. ){
        gl_Position = vec4( position.xy + (u_mouse.xy)*.02, position.z, 1.);
    }
    else {
        gl_Position = vec4(position, 1.);
    }

    v_texturePosition = a_position.xy  ;

    resolution = u_resolution;

    float idx = mod(float(gl_VertexID), 12.);
    idx = floor(idx / 3.);
    order = idx;

    

}