#iChannel0 "file://Users/yashanzhang/codes/waste-paper-box/assets/videos/dance.mp4"


void main () {
    vec2 texCoor = gl_FragCoord.xy / iResolution.xy;

    gl_FragColor = texture(iChannel0, texCoor);
}