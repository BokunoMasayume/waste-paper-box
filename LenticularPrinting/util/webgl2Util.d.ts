export declare function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null;
export declare function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader | null, fragmentShader: WebGLShader | null): WebGLShader | null;
declare const _default: {
    createProgram: typeof createProgram;
    createShader: typeof createShader;
};
export default _default;
