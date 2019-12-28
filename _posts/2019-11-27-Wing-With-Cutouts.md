---
layout: post
title:  "Cut Reinforcement Test"
date:   2019-11-27
categories: Basic Test
--- 

The idea was, to add reinforcements to 3d printed parts by making minimally thin cuts into the part. This technique works quite well with thick parts, I did that. By making a small slice into the 3d part, the slicer then obviously sees walls and adds wall lines accordingly - adding structure to the part without interfering with infill. This also worked for me here, but ONLY with the horizontal cuts to create ribs in the wing. Structural reinforcements in the wing around the spar did not work at all, but created exactly what I constructed in CAD - a cut. In hindsight this sounds obvious, but again - it works for parts with thicker walls, but I only want one wall line due to weight. 


[Wing Segment](https://github.com/mpsdskd/3D-Print-Plane/blob/master/3d-test/4_Test_wing_with_cutouts.obj)

Well, this looks quite nice, but did not work at all. 


<dl>
    <div id="mycanvas1" style="position:absolute; background-color:#000000; left:0; height:50vh; min-height:400px; width:100%"> </div>
    <div style="position:relative; height:50vh; min-height:400px; width:0px"></div>
    <script src = "/assets/3js/three.js"></script>
    <script src = "/assets/3d.js"></script> 
    <script src = "/assets/3js/OrbitControls.js"></script>
    <script src = "/assets/3js/PLYLoader.js"></script>
    <script src = "/assets/3js/AMFLoader.js"></script>
    <script src = "/assets/3js/OBJLoader.js"></script>
    <script src = "/assets/3js/stats.js"></script>
    <script>
        makeScene("mycanvas1", "https://raw.githubusercontent.com/mpsdskd/3D-Print-Plane/master/3d-test/4_Test_wing_with_cutouts.obj", 0.01, -1,-1.42,0, -Math.PI/2,0,0); 
        render();
    </script>
</dl>

TODO IMAGE

So I need a new solution :(

Google to the help! (And it did help :) )


