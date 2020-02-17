---
layout: post
title:  "Cut Reinforcement Test"
date:   2019-11-27
categories: Basic Test
comments_id: 3
--- 

<div style="float: right; width: 40%; text-align: center; margin-left: 1em;  margin-bottom: 0.5em;">
    <img width="100%" src="/img/3/failed_cutout.jpg" alt="failed cutout" class="zoomable"/>
    This cut perpendicular to layers did not work at all - or rather it did work as it did cut, but both sides of the cut did not fuse together as intended
</div>

The idea was, to add reinforcements to 3d printed parts by making minimally thin cuts into the part. This technique works quite well with thick parts, I did that. By making a small slice into the 3d part, the slicer then obviously sees walls and adds wall lines accordingly - adding structure to the part without interfering with infill. This also worked for me here, but ONLY with the horizontal cuts to create ribs in the wing. Structural reinforcements in the wing around the spar did not work at all, but created exactly what I constructed in CAD - a cut. In hindsight this sounds obvious, but again - it works for parts with thicker walls, but I only want one wall line due to weight. 


[Wing Segment](https://github.com/mpsdskd/3D-Print-Plane/blob/master/3d-test/4_Test_wing_with_cutouts.obj)
<!--more-->

Well, this looks quite nice, but did not work at all. 


<dl>
    {% include 3dscript.html %}
    <div id="mycanvas1" style="position:absolute; background-color:#000000; left:0; height:50vh; min-height:400px; width:100%"> </div>
    <div style="position:relative; height:50vh; min-height:400px; width:0px"></div>
    <script>
        makeScene("mycanvas1", "https://raw.githubusercontent.com/mpsdskd/3D-Print-Plane/master/3d-test/4_Test_wing_with_cutouts.obj", 0.01, -1,-1.42,0, -Math.PI/2,0,0); 
        render();
    </script>
</dl>

So I need a new solution :(

Google to the help! (And it did help :) )


Also: Example to where it worked


<div style="float: center; width: 100%; text-align: center; margin-left: 0.5em;  margin-bottom: 0.5em;">
    <img width="100%" src="/img/3/working_cutout.jpg" alt="successful cutout" class="zoomable"/>
    The cut nearly parallel to layers did work. "neary", to ensure printability.
</div>
