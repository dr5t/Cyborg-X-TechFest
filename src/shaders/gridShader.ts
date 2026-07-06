export const gridVertexShader = `
  varying vec2 vUv;
  varying float vDistance;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    float dist = length(pos.xz);
    vDistance = dist;
    pos.y += sin(dist * 0.5 - uTime * 0.8) * 0.3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const gridFragmentShader = `
  varying vec2 vUv;
  varying float vDistance;
  uniform float uTime;
  uniform vec3 uColor;
  
  void main() {
    vec2 grid = abs(fract(vUv * 40.0 - 0.5) - 0.5) / fwidth(vUv * 40.0);
    float line = min(grid.x, grid.y);
    float gridLine = 1.0 - min(line, 1.0);
    
    float fade = smoothstep(25.0, 5.0, vDistance);
    float pulse = sin(uTime * 0.5 + vDistance * 0.3) * 0.3 + 0.7;
    
    vec3 color = uColor * gridLine * fade * pulse;
    float alpha = gridLine * fade * 0.5 * pulse;
    
    gl_FragColor = vec4(color, alpha);
  }
`;
