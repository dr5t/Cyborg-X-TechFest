export const particleVertexShader = `
  attribute float aSize;
  attribute float aSpeed;
  attribute vec3 aColor;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  uniform float uTime;
  uniform float uPixelRatio;
  
  void main() {
    vColor = aColor;
    
    vec3 pos = position;
    pos.y += sin(uTime * aSpeed + pos.x * 0.5) * 0.5;
    pos.x += cos(uTime * aSpeed * 0.7 + pos.z * 0.3) * 0.3;
    pos.z += sin(uTime * aSpeed * 0.5 + pos.y * 0.4) * 0.2;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mvPosition.z;
    vAlpha = smoothstep(50.0, 5.0, dist);
    
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (80.0 / dist);
  }
`;

export const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    float strength = 1.0 - (dist * 2.0);
    strength = pow(strength, 3.0);
    
    vec3 color = vColor * strength;
    float alpha = strength * vAlpha * 0.8;
    
    gl_FragColor = vec4(color, alpha);
  }
`;
