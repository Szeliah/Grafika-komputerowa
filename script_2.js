
const vertexShaderTxt = `
    precision mediump float;

    attribute vec2 vertPosition;
    attribute vec3 vertColor;

    varying vec3 fragColor;

    void main() {
        fragColor = vertColor;
        gl_Position = vec4(vertPosition, 0.0, 1.0);
    }
`
const fragmentShaderTxt = `
    precision mediump float;

    varying vec3 fragColor;

    void main() {
        gl_FragColor = vec4(fragColor, 1.0);
    }
`

const RandomTriangle = function () {

    console.log('Working');

    const canvas = document.getElementById('main-canvas');
    const gl = canvas.getContext('webgl');
    const button = document.getElementById('btn-action');
    button.addEventListener("click", click_detect);

    const color_1 = [ 1.0, 0.0, 0.0 ]; 
    const color_2 = [ 0.0, 1.0, 0.0 ]; 
    const color_3 = [ 0.0, 0.0, 1.0 ]; 
    const color_4 = [ 1.0, 1.0, 0.0 ]; 
    const color_5 = [ 0.0, 1.0, 1.0 ]; 

    const arrayOfColors = [ color_1, color_2, color_3, color_4, color_5 ];
    
    let canvasColor = [0.3, 0.5, 0.8];

    let triangleVerts = [
//        X,   Y          R    G    B
        -0.8, -0.5,      0.0, 0.0, 1.0,
        0.8, -0.5,       0.0, 1.0, 0.0,
        0.0, 0.9,        1.0, 0.0, 0.0,
    ];



    checkGl(gl);

    gl.clearColor(...canvasColor, 1.0); 
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderTxt);
    gl.shaderSource(fragmentShader, fragmentShaderTxt);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    checkShaderCompile(gl, vertexShader);
    checkShaderCompile(gl, fragmentShader);

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    checkLink(gl, program);

    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);

    gl.validateProgram(program);
    
    const traingleVertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, traingleVertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerts), gl.STATIC_DRAW);


    const posAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
        posAttribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(posAttribLocation);

    const colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        colorAttribLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT,
    );
    gl.enableVertexAttribArray(colorAttribLocation);
    
    // render time

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    function click_detect() {

        gl.clearColor(...canvasColor, 1.0); 
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        const color = Math.random();
        const color2 = Math.random();
        const color3 = Math.random();
        
        let triangleVertsx = [
//             X,   Y          R      G      B
            -0.8, -0.5,      color, color2, color3,
            0.8, -0.5,       color, color2, color3,
            0.0, 0.9,        color, color2, color3, 
        ];
        
        const trainglexVertBuffer = gl.createBuffer();
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertsx), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      
      }



} 





function random(array) {
    return array[Math.floor(Math.random() * 5)];
}


function checkGl(gl) {
    if (!gl) {
        console.log('WebGL not suppoerted, use another browser');
    }
}

function checkShaderCompile(gl, shader) {
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('shader not compiled', gl.getShaderInfoLog(shader));
    }
}

function checkLink(gl, program) {
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('linking error', gl.getProgramInfoLog(program));
    }
}