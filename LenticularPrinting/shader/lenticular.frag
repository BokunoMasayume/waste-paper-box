#version 300 es /* Easing Sine In equation */

precision mediump float;

in vec2  v_texturePosition;
in float order;
out vec4  outColor ;

uniform sampler2D u_video1;
uniform sampler2D u_video2;


/* Adapted from Robert Penner easing equations */
#define PI_TWO			1.570796326794897




void main (){
    vec4 color  = texture(u_video1 , v_texturePosition);

    if(order <= 1.){
        color  = texture(u_video2 , v_texturePosition);
    }else {
        color  = texture(u_video1 , v_texturePosition);
    }

    outColor =color;

}
