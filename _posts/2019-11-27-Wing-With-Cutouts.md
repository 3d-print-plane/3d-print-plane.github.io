---
layout: post
title:  "Cutouts Test"
date:   2019-11-27
categories: Basic Test
--- 




[Wing Segment](https://raw.githubusercontent.com/mpsdskd/3D-Print-Plane/master/3d-test/1_Test_wing.obj)
<dl>
    <div id="mycanvas1" style="position:absolute; background-color:#000; left:0; height:50vh; width:100%"> </div>
   <div style="position:relative; height:50vh; width:0px"></div>
    <script src = "/assets/3js/three.js"></script>
    <script src = "/assets/3d.js"></script> 
    <script src = "/assets/3js/OrbitControls.js"></script>
    <script src = "/assets/3js/PLYLoader.js"></script>
    <script src = "/assets/3js/AMFLoader.js"></script>
    <script src = "/assets/3js/OBJLoader.js"></script>
    <script src = "/assets/3js/stats.js"></script>
    <script>
        init_function("mycanvas1", "https://raw.githubusercontent.com/mpsdskd/3D-Print-Plane/master/3d-test/4_Test_wing_with_cutouts.obj", 0.008, -1,-1.2,0, -Math.PI/2,0,0); 
        animate();
    </script>
</dl>



<sub><sub><sub> Also I wanted to test/show off my 3D part visualization
