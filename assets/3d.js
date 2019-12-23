var container, stat, stats;

var cameras, cameraTarget, sceneInfos, renderers, renderer, controls, mesh, loader, wf, canvas;

var testing = false;

var start = Date.now();
var rate = 10; // Hz
var lastFrameNumber;

// var width = 1;
// var height = 0.5;


var createRenderer = function(){
    var canvas = document.getElementById( "renderCanvas" );
    if (!(canvas)){
        console.log("Renderer not found, creating new one");
        canvas = document.createElement( 'canvas' );
        canvas.setAttribute("id", "renderCanvas");
        canvas.style.cssText = "position: fixed; left: 0; top: 0; width: 100vw; height: 100vh; display: block; z-index: -1;"
        document.body.appendChild( canvas );
    }
    else {console.log("Renderer already existing");}
    
}

createRenderer();

var resizeRendererToDisplaySize = function(renderer) {
    const thisCanvas = renderer.domElement;
    const width = thisCanvas.clientWidth;
    const height = thisCanvas.clientHeight;
    const needResize = thisCanvas.width !== width || thisCanvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}

var makeScene = function(div_name, filename, s, x, y, z, phi, theta, psi) {
    
//     if (!(controls)){controls = [];}    
//     if (!(scenes)){scenes = [];}    
//     if (!(renderers)){renderers = [];}
//     if (!(cameras)){cameras = [];}    
     
    if (!(sceneInfos)){sceneInfos = [];}   
    
    sceneInfos.push({"scene": undefined, "meshes": [], "camera":undefined, "htmlElement":undefined, "controls":undefined});
    
    sceneInfos[sceneInfos.length - 1].htmlElement =  document.getElementById( div_name );
    
//     container = document.createElement( 'div' );
//     document.body.appendChild( container );
    if (testing == true) {
    stats = new Stats();
    sceneInfos[sceneInfos.length - 1].htmlElement.appendChild( stats.dom );
    }
    
    console.log(sceneInfos[sceneInfos.length - 1].htmlElement.offsetWidth,sceneInfos[sceneInfos.length - 1].htmlElement.offsetHeight);
    width = sceneInfos[sceneInfos.length - 1].htmlElement.offsetWidth;
    height = sceneInfos[sceneInfos.length - 1].htmlElement.offsetHeight;

    sceneInfos[sceneInfos.length - 1].camera = new THREE.PerspectiveCamera( 45, width/height, 1, 10000); 
    // window.innerWidth*width / (window.innerHeight*height), 1, 10000 );
    sceneInfos[sceneInfos.length - 1].camera.position.set( 3.5, 1.2, 0 );

    sceneInfos[sceneInfos.length - 1].scene = new THREE.Scene();
    sceneInfos[sceneInfos.length - 1].scene.background = new THREE.Color( 0xff0000);//0x080808 );
//     if (testing==false){
//         scenes[scenes.length - 1].fog = new THREE.Fog( 0x000000, 2, 15 );
//     }

    // Ground
    var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 10000, 10000 ),
        new THREE.MeshPhongMaterial( { color: 0x00ff00, specular: 0x101010 } ) //0x050505
    );
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = - 0.5;
    sceneInfos[sceneInfos.length - 1].scene.add( plane );

    plane.receiveShadow = true;

    // Lights
    var HL = new THREE.HemisphereLight( 0x222222, 0xffffff, 1.5 )
    HL.castShadow = false;
    sceneInfos[sceneInfos.length - 1].scene.add( HL );
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

    sceneInfos[sceneInfos.length - 1].htmlElement.appendChild( renderer.domElement );

    // stats
    // stats = new Stats();
    // container.appendChild( stats.dom );

    // resize
    window.addEventListener( 'resize', onWindowResize, false );
    
    sceneInfos[sceneInfos.length - 1].controls = new THREE.OrbitControls( sceneInfos[sceneInfos.length - 1].camera, renderer.domElement, sceneInfos[sceneInfos.length - 1].htmlElement
    );

    sceneInfos[sceneInfos.length - 1].controls.addEventListener( 'change', render );
//     sceneInfos[sceneInfos.length - 1].controls.update();
    sceneInfos[sceneInfos.length - 1].controls.autoRotate = true;
//     sceneInfos[sceneInfos.length - 1].controls.autoRotateSpeed = 1;
//     sceneInfos[sceneInfos.length - 1].controls.target.set( 0, 0, 0 );  
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

        sceneInfos[sceneInfos.length - 1].scene.add( wf );
        sceneInfos[sceneInfos.length - 1].scene.add( mesh );

        sceneInfos[sceneInfos.length - 1].meshes.push( wf );
        sceneInfos[sceneInfos.length - 1].meshes.push( mesh );

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

        sceneInfos[sceneInfos.length - 1].scene.add( wf );
        sceneInfos[sceneInfos.length - 1].scene.add( mesh );

        sceneInfos[sceneInfos.length - 1].meshes.push( wf );
        sceneInfos[sceneInfos.length - 1].meshes.push( mesh );
        
        
        } );
    };
}

function addShadowedLight( x, y, z, color, intensity ) {

    var directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    sceneInfos[sceneInfos.length - 1].scene.add( directionalLight );

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
//     console.log(container.offsetWidth,container.offsetHeight);
// //     width = container.offsetWidth;
// //     height = container.offsetHeight;
// // 
// //     camera.aspect = width / height;
// //     camera.updateProjectionMatrix();
// //     renderer.setSize( width, height);
// 				x = window.innerWidth *width;
//                 console.log(x);
// 				y = window.innerHeight *height;
//                 console.log(y);
// 
// 				camera.aspect = window.innerWidth*width / (window.innerHeight*height);
// 				camera.updateProjectionMatrix();
// 
// 				renderer.setSize( x, y);
    resizeRendererToDisplaySize(renderer);

			}
			
function renderScene(sceneInfo){
//     console.log("Scene Info", sceneInfo);
    const {left, right, top, bottom, width, height} = sceneInfo.htmlElement.getBoundingClientRect();
    if (testing==true){
        console.log(left, right, top, bottom, width, height);
    }
//     console.log(sceneInfo.htmlElement.getBoundingClientRect());
    const isOffscreen =
        bottom < 0 ||
        top > renderer.domElement.clientHeight ||
        right < 0 ||
        left > renderer.domElement.clientWidth;
 
    if (isOffscreen) { return; }
    
    sceneInfo.camera.aspect = width / height;
    sceneInfo.camera.updateProjectionMatrix();
 
    const positiveYUpBottom = bottom - height; //canvasRect.height - bottom;
    renderer.setScissor(left, positiveYUpBottom, width, height);
    renderer.setViewport(left, positiveYUpBottom, width, height);
    renderer.render(sceneInfo.scene, sceneInfo.camera);
    sceneInfo.controls.update();
};

function render(time) {
//     time *= 0.001;
//     const transform = `translateY(${window.scrollY}px)`;
//     renderer.domElement.style.transform = transform;

    var elapsed = Date.now() - start;
    var frameNumber = Math.round(elapsed/(1000/rate));
    
    setTimeout(function(){
    }, 10);
    if (frameNumber == lastFrameNumber){
        requestAnimationFrame(render);
        return;
    }
    lastFrameNumber = frameNumber;
    
    resizeRendererToDisplaySize(renderer);
    
    renderer.setScissorTest(false);
    renderer.clear(true, true);
    renderer.setScissorTest(true);
    for (sceneInfo of sceneInfos){
        renderScene(sceneInfo);
    }
    requestAnimationFrame(render);
    stats.update();
}

// function animate() {    
//     if (testing == true) {
//     stats.update();
//     };
//     for (i=0; i<sceneInfos.length; i++){
//         render(sceneInfos[i]);
// //         requestAnimationFrame( animate );
// 
// //         renderer.render( sceneInfos[i].scene, sceneInfos[i].camera );
// //     controls[i].update()
//     }
// 
// }
