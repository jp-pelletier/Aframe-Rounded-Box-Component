# THREE.JS - Aframe Rounded Angles Box Component

Light component for some rounded effects on A-FRAME boxes.

Click the cover below for a live demo... and look behind !

<a href="https://jp-pelletier.github.io/roundedanglesbox/" target="_blank"><img src="https://github.com/jp-pelletier/Aframe-Rounded-Box-Component/blob/master/cover/repository-open-graph-template.jpg"></a>

## Usage

Example of code of the Wooden Cube :
```yaml
<a-entity
    roundedanglesbox = "
    width: 1;
    height: 1;
    depth: 1;
    radius: 0.2;
    roughness: 0;
    metalness: 0;
    src: img/Wood.jpg;
    repeat: 4 4;"
    position = "-4 0.6 -0.5"
    rotation = "0 40 0">
</a-entity>
```


 PROPERTY | COMPONENT MAPPING <BR> DESCRIPTION | DEFAULT VALUE |
--- | --- | --- |
Width | geometry.width | 1 |
Height | geometry.height | 1 |
Depth | geometry.depth | 1 |
Radius | Determines the radius of the rounded angles.<br>Value "1" produces a sphere for an equirectangular box. | 0.05 |
Segments | Determines the number of vertices for THREE.BoxBufferGeometry segments x, y, z. | 9 9 9 |
Color | material.color | #AAA |
Roughness | material.roughness<br>How rough the material is from 0 to 1. A rougher material will scatter reflected light in more directions than a smooth material. | 0 |
Metalness | material.metalness<br>How metallic the material is from 0 to 1. | 0.2 |
Transparent | Whether material is transparent. Transparent entities are rendered after non-transparent entities. | false |
Opacity | Extent of transparency. If the transparent property is not true, then the material will remain opaque and opacity will only affect color. | 1 |
Src | material.src<br>Image texture map. Requires an inline URL.<br>This simple texture map produces a very cool effect on edges ! | None |
Repeat | material.repeat<br>How many times a texture (defined by src) repeats in the X and Y direction. | 1 1 |
cubeMap | Unlike textures, the envMap property takes a cubemap, six images put together to form a cube. The cubemap wraps around the mesh and applied as a texture.<br>Requires six images loaded with parameters :<br>cubeMap_negx<br>cubeMap_posz<br>cubeMap_posx<br>cubeMap_negz<br>cubeMap_posy<br>cubeMap_negy<br><br>Textures directory has to be configured in roundedanglesbox.js.<br><br>Using cubeMap switches the material from MeshStandardMaterial to MeshPhongMaterial and doesn't support metalness and roughness. | None |

For porting @Fyrestar’s approach to JavaScript, look here : https://discourse.threejs.org/t/cheap-round-edged-box-vertex-shader/8066/21