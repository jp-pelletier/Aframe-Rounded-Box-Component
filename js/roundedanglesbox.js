//*********************************************
// AFRAME ROUNDED ANGLES BOX LIGHT COMPONENT
//*********************************************

AFRAME.registerComponent('roundedanglesbox', {
    schema:
    {
        width:        { type: 'number',  default: 1 },
        height:       { type: 'number',  default: 1 },
        depth:        { type: 'number',  default: 1 },
        radius:       { type: 'number',  default: 0.05 },
        segments:     { type: 'vec3',    default: { x: 9, y: 9, z: 9 } },
        color:        { type: 'color',   default: '#AAA' },
        roughness:    { type: 'number',  default: 0 },
        metalness:    { type: 'number',  default: 0.2 },
        transparent:  { type: 'boolean', default: false },
        opacity:      { type: 'number',  default: 1 },
        src:          { type: 'asset',   default: '' },
        repeat:       { type: 'vec2',    default: { x: 1, y: 1 } },
        cubeMap_negx: { type: 'asset',   default: '' },
        cubeMap_posz: { type: 'asset',   default: '' },
        cubeMap_posx: { type: 'asset',   default: '' },
        cubeMap_negz: { type: 'asset',   default: '' },
        cubeMap_posy: { type: 'asset',   default: '' },
        cubeMap_negy: { type: 'asset',   default: '' }
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxGeometry(1, 1, 1, data.segments.x, data.segments.y, data.segments.z);

        this.material = new THREE.MeshStandardMaterial({
            color: data.color,
            roughness: data.roughness,
            metalness: data.metalness,
            transparent: data.transparent,
            opacity: data.opacity,
        });

        if (data.src != '') {
            const textureBox = new THREE.TextureLoader().load(data.src);
            textureBox.wrapS = THREE.RepeatWrapping;
            textureBox.wrapT = THREE.RepeatWrapping;
            textureBox.repeat = data.repeat;
            this.material.map = textureBox;
        }

        if (data.cubeMap_negx != '' && data.cubeMap_posx != '' && data.cubeMap_negy != '' && data.cubeMap_posy != '' && data.cubeMap_negz != '' && data.cubeMap_posz != '') {
            this.material = new THREE.MeshPhongMaterial({
                color: data.color,
                transparent: data.transparent,
                opacity: data.opacity,
            });
            const loader = new THREE.CubeTextureLoader();
            loader.setCrossOrigin("");
            loader.setPath('img/textures/');

            var cubeTexture = loader.load([
                data.cubeMap_negx, data.cubeMap_posz,
                data.cubeMap_posx, data.cubeMap_negz,
                data.cubeMap_posy, data.cubeMap_negy
            ]);
            this.material.envMap = cubeTexture
        }

        var boxMat = this.material;

        const settings = {
            radius: { value: data.radius },
            size: {
                value: new THREE.Vector3(data.width, data.height, data.depth)
            }
        }

        boxMat.onBeforeCompile = shader => {

            shader.uniforms.boxSize = settings.size;
            shader.uniforms.radius = settings.radius;

            shader.vertexShader = `
            uniform vec3 boxSize;
            uniform float radius;
            ` + shader.vertexShader;

            shader.vertexShader = shader.vertexShader.replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>

            vec3 signs = sign(position);
            vec3 box = boxSize - vec3(radius);
            box = vec3(max(0.0, box.x), max(0.0, box.y), max(0.0, box.z));
            vec3 p = signs * box;
  
            transformed = signs * box * 0.5 + normalize(position) * radius;
      
            objectNormal = all(equal(p, transformed)) ? normal : normalize(position); 
            transformedNormal = normalize(normalMatrix * objectNormal);
            vNormal = transformedNormal;`
            );
        };
        this.mesh = new THREE.Mesh(this.geometry, boxMat);
        el.setObject3D('mesh', this.mesh);
        this.mesh.frustumCulled = false;
    }
});