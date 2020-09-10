import { createShader, createProgram } from './util/webgl2Util';

import lenFrag from './shader/lenticular.frag';
import lenVert from './shader/lenticular.vert';
const row = 200;
const col = 200;
const depth = -.05;
let positions = new Float32Array(row * col * 4 * 3 * 3);
for(let i=0 ; i <  col ; i++){
    for(let j=0 ; j < row ; j++){
        let idx = j * col + i;
        let centerX = i / col ;
        let centerY = j / row;
        let centerZ = depth;

        let leftTopX = centerX - .5/col;
        let leftTopY = centerY - .5/row;
        let leftTopZ = 0;

        let rightTopX = centerX + .5/col;
        let rightTopY = centerY - .5/row;
        let rightTopZ = 0;

        let rightBottomX = centerX + .5/col;
        let rightBottomY = centerY + .5/row;
        let rightBottomZ = 0;

        let leftBottomX = centerX - .5/col;
        let leftBottomY = centerY + .5/row;
        let leftBottomZ = 0;

        console.log(centerX, centerY, centerZ , leftTopX, leftTopY, leftTopZ);
        //top triangle
        positions[idx * 36] = centerX;
        positions[idx * 36 + 1] = centerY;
        positions[idx * 36 + 2] = centerZ;

        positions[idx * 36 + 3] = leftTopX;
        positions[idx * 36 + 4] = leftTopY;
        positions[idx * 36 + 5] = leftTopZ;

        positions[idx * 36 + 6] = rightTopX;
        positions[idx * 36 + 7] = rightTopY;
        positions[idx * 36 + 8] = rightTopZ;

        //right triangle
        positions[idx * 36 + 9] = centerX;
        positions[idx * 36 + 10] = centerY;
        positions[idx * 36 + 11] = centerZ;

        positions[idx * 36 + 12] = rightTopX;
        positions[idx * 36 + 13] = rightTopY;
        positions[idx * 36 + 14] = rightTopZ;

        positions[idx * 36 + 15] = rightBottomX;
        positions[idx * 36 + 16] = rightBottomY;
        positions[idx * 36 + 17] = rightBottomZ;

        //bottom triangle
        positions[idx * 36 + 18] = centerX;
        positions[idx * 36 + 19] = centerY;
        positions[idx * 36 + 20] = centerZ;

        positions[idx * 36 + 21] = rightBottomX;
        positions[idx * 36 + 22] = rightBottomY;
        positions[idx * 36 + 23] = rightBottomZ;

        positions[idx * 36 + 24] = leftBottomX;
        positions[idx * 36 + 25] = leftBottomY;
        positions[idx * 36 + 26] = leftBottomZ;

        // left triangle
        positions[idx * 36 + 27] = centerX;
        positions[idx * 36 + 28] = centerY;
        positions[idx * 36 + 29] = centerZ;

        positions[idx * 36 + 30] = leftTopX;
        positions[idx * 36 + 31] = leftTopY;
        positions[idx * 36 + 32] = leftTopZ;

        positions[idx * 36 + 33] = leftBottomX;
        positions[idx * 36 + 34] = leftBottomY;
        positions[idx * 36 + 35] = leftBottomZ;


    }
}

let canvas = document.querySelector('#lenticular') as HTMLCanvasElement;
let video1 = document.querySelector('#source1') as HTMLVideoElement;
let video2 = document.querySelector('#source2') as HTMLVideoElement;

setTimeout(()=>{

canvas.width = 800;
canvas.height = 700;

let gl = canvas.getContext('webgl2');

let program = createProgram(
    gl,
    createShader(gl, gl.VERTEX_SHADER, lenVert),
    createShader(gl, gl.FRAGMENT_SHADER, lenFrag)
);
gl.useProgram(program);

gl.viewport(0 , 0,  canvas.width , canvas.height);

const position1 = gl.getUniformLocation(program, 'u_video1');
const position2 = gl.getUniformLocation(program, 'u_video2');
gl.uniform1i(position1, 0);
gl.uniform1i(position2, 1);

(gl as WebGL2RenderingContext & { MousePosition?:WebGLUniformLocation}).MousePosition =  gl.getUniformLocation(program, 'u_mouse')


canvas.addEventListener('mousemove', (e)=>{
   gl.uniform2fv( (gl as WebGL2RenderingContext & { MousePosition?:WebGLUniformLocation}).MousePosition, [e.offsetX / canvas.clientWidth - .5, - e.offsetY / canvas.clientHeight + .5]);
});

// video 1
gl.activeTexture( gl.TEXTURE0);
const videoTex1 = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, videoTex1);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL , true);

gl.texImage2D(
    gl.TEXTURE_2D , 
    0 , 
    gl.RGBA, 
    video1.videoWidth,
    video1.videoHeight,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    video1
);

gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

// video 2
gl.activeTexture( gl.TEXTURE1);
const videoTex2 = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, videoTex2);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL , true);

gl.texImage2D(
    gl.TEXTURE_2D , 
    0 , 
    gl.RGBA, 
    video2.videoWidth,
    video2.videoHeight,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    video2
);

gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

const positionAttributeLocation = gl.getAttribLocation(program , 'a_position');

const positionUnifResolution = gl.getUniformLocation(program , 'u_resolution');
gl.uniform2f( positionUnifResolution , canvas.width , canvas.height );


const positionbuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER , positionbuffer);

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

gl.enableVertexAttribArray(positionAttributeLocation);

const size = 3;
const type = gl.FLOAT;
const normalize = false;
const stride = 0;
const offset = 0;

gl.vertexAttribPointer(positionAttributeLocation , size , type , normalize , stride , offset);

gl.bindVertexArray(vao);


// gl.bufferData(gl.ARRAY_BUFFER , new Float32Array([
//     0, 0,1,
//     0, 1,1,
//     1, 0,1,
//     1, 0,1,
//     0, 1,1,
//     1, 1, 1]), gl.STATIC_DRAW);
gl.bufferData(gl.ARRAY_BUFFER ,positions ,gl.STATIC_DRAW);


const primitiveType = gl.TRIANGLES;
const doffset = 0;
const count = row * col * 4 * 3;
// const count = 2* 3;
gl.drawArrays(primitiveType, doffset, count);


function tick(){
    gl.activeTexture( gl.TEXTURE0);
    gl.texImage2D(
        gl.TEXTURE_2D , 
        0 , 
        gl.RGBA, 
        video1.videoWidth,
        video1.videoHeight,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        video1
    );
    gl.activeTexture( gl.TEXTURE1);
    gl.texImage2D(
        gl.TEXTURE_2D , 
        0 , 
        gl.RGBA, 
        video2.videoWidth,
        video2.videoHeight,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        video2
    );

    const primitiveType = gl.TRIANGLES;
    const doffset = 0;
    const count = row * col * 4 * 3;
    // const count = 2* 3;
    gl.drawArrays(primitiveType, doffset, count);
    // console.log('tick');
    requestAnimationFrame(tick);
}

tick();

},2000);