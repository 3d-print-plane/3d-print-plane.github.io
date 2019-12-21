var container, stat, stats;

var cameras, cameras, cameraTarget, scene, scenes, renderers, renderer, controls, control, mesh, loader, wf;

var testing = false;

var width = 1;
var height = 0.5;

var init_function = function(div_name, filename, s, x, y, z, phi, theta, psi) {
    
    container = document.getElementById( div_name );
    
//     container = document.createElement( 'div' );
//     document.body.appendChild( container );
    if (testing == true) {
    stats = new Stats();
    container.appendChild( stats.dom );
    }
    
    console.log(container.offsetWidth,container.offsetHeight);
    width = container.offsetWidth;
    height = container.offsetHeight;

    camera = new THREE.PerspectiveCamera( 45, width/height, 1, 10000); 
    // window.innerWidth*width / (window.innerHeight*height), 1, 10000 );
    camera.position.set( 3.5, 1.2, 0 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x080808 );
    if (testing==false){
        scene.fog = new THREE.Fog( 0x000000, 2, 15 );
    }

    // Ground
    var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 10000, 10000 ),
        new THREE.MeshPhongMaterial( { color: 0x050505, specular: 0x101010 } )
    );
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = - 0.5;
    scene.add( plane );

    plane.receiveShadow = true;

    // Lights
    var HL = new THREE.HemisphereLight( 0x222222, 0xffffff, 1.5 )
    HL.castShadow = false;
    scene.add( HL );
    addShadowedLight( 1.5, 1, 1, 0xffffff, 0.5 );
    addShadowedLight( 1.5, 1, - 1, 0xffffff, .5 );
    addShadowedLight( -2, 1, 0, 0xffffff, .5 );

    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true, powerPreference: "low-power", } );
    
    // PLY file
    load(filename, s, x, y, z, phi, theta, psi);
    
    
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height); // window.innerWidth*width, window.innerHeight*height );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.autoUpdate = true;

    container.appendChild( renderer.domElement );

    // stats
    // stats = new Stats();
    // container.appendChild( stats.dom );

    // resize
    window.addEventListener( 'resize', onWindowResize, false );
    
    control = new THREE.OrbitControls( camera, renderer.domElement );
    control.addEventListener( 'change', animate );

    control.update();
    control.autoRotate = true;
    control.autoRotateSpeed = 1;
    control.target.set( 0, 0, 0 );  
    
    if (!(controls)){controls = [];}
    controls.push(control);
    
    if (!(scenes)){scenes = [];}
    scenes.push(scene);
    
    if (!(renderers)){renderers = [];}
    renderers.push(renderer);
    
    if (!(cameras)){cameras = [];}
    cameras.push(cameras);
};

function load(filename, s, x,y,z, phi, theta, psi) {
    
    var filetype = filename.split('.').pop().toLowerCase();
    console.log(filetype);
    console.log("Loading "+filename);
    console.log(x,y,z);
    if (filetype == "ply"){
    loader = new THREE.PLYLoader();
    loader.load( filename, function ( geometry ) {
        console.log("PLY");
        geometry.computeVertexNormals();
//         var material = new THREE.MeshStandardMaterial( { color: 0x0055ff, flatShading: true } );
        var material = new THREE.MeshPhongMaterial( {specular: 0x111111, shininess: 0, vertexColors: THREE.VertexColors, opacity: 0.8, transparent: true,} );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.x = x;// - 0.2;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.x = phi;
        mesh.rotation.y = theta;
        mesh.rotation.z = psi;
        mesh.scale.multiplyScalar(s);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        var wf_material = new THREE.MeshStandardMaterial( { color: 0x111111, flatShading: true, wireframe: true, wireframeLinewidth: 1, opacity: 0.2, transparent: true,} );
        var wf = new THREE.Mesh( geometry, wf_material );
        
        wf.position.x = x;// - 0.2;
        wf.position.y = y;
        wf.position.z = z;
        wf.rotation.x = phi;
        wf.rotation.y = theta;
        wf.rotation.z = psi;
        wf.scale.multiplyScalar( s*(1+0.00001) );
        wf.castShadow = false;
        wf.receiveShadow = false;

        scene.add( wf );
        scene.add( mesh );

    } );
    };
    if (filetype == "obj"){
        console.log("OBJ");
        var loader = new THREE.OBJLoader();
        loader.load( filename, function ( mesh ) {
            console.log(mesh);
//             var material = new THREE.MeshStandardMaterial( { color: 0x0055ff, flatShading: true } );
            var material = new THREE.MeshPhongMaterial( {specular: 0x888888, shininess: 0, opacity: 0.8, transparent: true,} );
            mesh.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                mesh = child;
                wf = mesh.clone();
            }
        } );
        mesh.material = material;
        mesh.position.x = x;// - 0.2;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.x = phi;
        mesh.rotation.y = theta;
        mesh.rotation.z = psi;
        mesh.scale.multiplyScalar(s);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        scene.add( mesh );
        
        wf.material = new THREE.MeshStandardMaterial( { color: 0x111111, flatShading: true, wireframe: true, wireframeLinewidth: 1, opacity: 0.1, transparent: true,} );
        wf.position.x = x;// - 0.2;
        wf.position.y = y;
        wf.position.z = z;
        wf.rotation.x = phi;
        wf.rotation.y = theta;
        wf.rotation.z = psi;
        wf.scale.multiplyScalar( s*(1+0.00001) );
        wf.castShadow = false;
        wf.receiveShadow = false;

        scene.add( wf );
        
        
        } );
    };
}

function addShadowedLight( x, y, z, color, intensity ) {

    var directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    scene.add( directionalLight );

    directionalLight.castShadow = true;

    var d = 1;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;

    directionalLight.shadow.bias = - 0.001;

}


function onWindowResize() {
    console.log(container.offsetWidth,container.offsetHeight);
    width = container.offsetWidth;
    height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height);
// 				x = window.innerWidth *width;
//                 console.log(x);
// 				y = window.innerHeight *height;
//                 console.log(y);
// 
// 				camera.aspect = window.innerWidth*width / (window.innerHeight*height);
// 				camera.updateProjectionMatrix();
// 
// 				renderer.setSize( x, y);

			}

function animate() {
//     for (i=0; i<renderer.length; i++){
     requestAnimationFrame( animate );

    renderers[0].render( scene, camera );
//     if (testing == true) {
//     stats.update();
//     };
//     controls[i].update()

}
