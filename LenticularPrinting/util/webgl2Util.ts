export function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
  
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(type == gl.FRAGMENT_SHADER ? 'frag' : 'vert', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return shader;
  }
  
  export function createProgram(
    gl: WebGL2RenderingContext,
    vertexShader: WebGLShader | null,
    fragmentShader: WebGLShader | null
  ): WebGLShader | null {
    const program = gl.createProgram();
    if (!program || !vertexShader || !fragmentShader) return null;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
  
    gl.linkProgram(program);
  
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return program;
  }

 
  
  export default {
    createProgram,
    createShader,
  };
  