---
layout: post
title:  "Aerodynamic & Flight Dynamic Design"
date:   2019-11-30
categories: Aerodynamics
comments_id: 5
--- 
<div style="float: right; width: 100%; text-align: center; margin-bottom: 0.5em;">
    <img width="100%" src="/img/xflr5_profiles.png" alt="Profiles"/>
</div>
Disclaimer: This one is quite long and I cannot guarantee factual accuracy.
For naming conventions of variables/symbols I try to adhere to DIN 9300-1 1990 (I think the eqivalent ISO standard is ISO 1151-1).

### Airfoil Profile Choice

An obviously important choice for a flying wing is the wing's airfoil.  
Unfortunately there is no perfect choice here.
<!--more--><sub><sub><sub><sub>As for everything...</sub></sub></sub></sub> 

There are several important factors to consider:
- Aerodynamic factors:
    - __Lift-to-Drag-Ratio__ - $$\frac{c_l}{c_w}$$ respectively $$ \epsilon $$ or its reciprocal value $$ E $$
        - Well, there are very few engineers, who are not interested in Efficiency. For a model airplane efficiency impacts flight duration, glide path angle, "Eigensinken" (true descent - if anybody knows the correct English term? -> slowest possible descent rate without external influences & motors)
    - __Maximum Coefficient of Lift__ $$ c_{l, max} $$
        - Important for the slowest possible flight speed - important for hand launch
    - Ideally __no sharp drop off in $$ c_l $$ beyond $$ \alpha_{max} $$__ - don't want to suddenly lose all lift
    - __Low $$ c_w $$ in an $$ \alpha $$ range__ rather than a little spike as sometimes seen with laminar profiles
    - Rather guesswork:
        - Do little disturbances in profile shape/surface quality impact aerodynamic properties more or less? - less is preferably due to imperfections through FDM process
        - Do flaps work well with respective airfoils?
        - Can the airfoil be printed well? (Constant curves preferably)
- Practical considerations:
    - "Fuselage" part must be thick enough to provide space for battery & electronics. There will be a small fuselage kind of part, as I want a replaceable nose part and I need space for a motor. Close to that fuselage I want a really thick airfoil (around $$ 15 \%   d/l $$) for aesthetic reasons. 
    - Thick enough for a metal or carbon spar
    - Doable in FreeCAD
    - Flap will be printed with a flat bottom surface, thus trailing edge should not be curved
    - Form stability - round-ish forms are a bit more form stable (mostly was not considered)

### Flight Dynamics
- For stable flight __the sum of all moments of force must be zero__
- Longitudinal Stability.
    - Generally, for planes the center of gravity should be located in front of the wing's center of pressure. Thus, without further influences the plane would pitch down (German Wikipedia has a nice longer explanation [de.wikipedia.org/wiki/Weight_and_Balance](https://de.wikipedia.org/wiki/Weight_and_Balance), but I did not find an English equivalent). To counteract this pitching moment, the horizontal stabilizer creates a downwards force, also counteracting a bit of the wing's lift and creating drag. In a stable condition, with a change in pitch $$ \phi $$ (and Angle of Attack __AoA__) a counteraction moment is produced $$\frac{\partial C_m}{\partial C_\alpha} < 0 $$. See [en.wikipedia.org/wiki/Longitudinal_static_stability.](https://en.wikipedia.org/wiki/Longitudinal_static_stability).
    - With flying wings there is no tailplane, thus there are potential problems with longitudinal stability. 
    - Solutions: 
        -Wing Swept back, Angle of Incidence __AoI__ lower in the outer regions of the wing (-> in the back), acting like a tailplane. See [en.wikipedia.org/wiki/Tailless_aircraft](https://en.wikipedia.org/wiki/Tailless_aircraft) - IMHO a really good article.
        - Airfoils with low pitching moments
- Yaw stability.
    - Similar problem as for longitudinal stability - neither is there a vertical stabilizer. Not directly given as a graph of partial derivatives in XFLR5 so it's a bit of guesswork.
    - Solutions: See [en.wikipedia.org/wiki/Flying_wing](https://en.wikipedia.org/wiki/Flying_wing)
        - Wing Sweep
        - Reduced AoI at the tip is supposed to help
        - Fins at the tip
- A Good read on stability, which I saw too late: [http://www.xflr5.tech/docs/XFLR5_and_Stability_analysis.pdf](http://www.xflr5.tech/docs/XFLR5_and_Stability_analysis.pdf)

### Flight Characteristics
- Gentle stalling characteristics - no tip stall - stall first in the middle of the wing
    - Lower AoI at wing tips & profile stalling at higher $$\alpha$$
- No adverse Yaw
    - Wing twist is supposed to help?
    - Different deflection angles for elevons up/down for roll might also help?
    
<dl>
<div style="float: right; width: 100%; text-align: center; margin-bottom: 0.5em;">
    {% include 3dscript.html %}
    <div id="xflr5stl" style="position:absolute; background-color:#000000; left:0; height:50vh; min-height:400px; width:100%"> </div> 
    <div style="position:relative; height:50vh; min-height:400px; width:0px"></div>
    <script>
        makeScene("xflr5stl", "https://raw.githubusercontent.com/mpsdskd/3D-Print-Plane/master/3d-test/11_XFLR5_export.stl", 0.005, 0,0.2,0, -Math.PI/2,0,-Math.PI/2); 
        render();
    </script>
    XFLR5's STL does not really work well with my THREE.JS script
    </div>
</dl>

### Useful things
- [Airfoil Database](https://m-selig.ae.illinois.edu/ads/coord_database.html)
- [Another Airfoil Database](https://www.aerodesign.de/english/profile/profile_s.htm)
- [SHORT XFLR5 Walkthrough](https://www.youtube.com/watch?v=P6AZTxZkojo)
- [Flying Wing Design Help - Really good, but __GERMAN__](https://www.aerodesign.de/modelle/HS/hs63x_d.htm)

### Proposed Solution
- Airfoil Choice
    - [According to aerodesign.de](https://www.aerodesign.de/profile/profile_s.htm) I chose a thicker profile (S5010) and modified it regarding thickness (even thicker) in the inner wing parts, which should work according to XFLR5
        - Should be good regarding moments
        - I put quite a bit of thought into the profile choice and then still ended up using the one suggested by [aerodesign.de](https://aerodesign.de)... Well, I'm an engineer, I should be okay with just believing literature ¯\\\_(ツ)\_/¯
    - For comparison I also took the Clark-Y profile & S5020
        - You can see profile data at:
            - [CLARK-Y](http://airfoiltools.com/airfoil/details?airfoil=clarky-il)
            <div style="float: center; width: 100%; text-align: center; margin-bottom: 0.5em;">
                <img width="100%" src="/img/CLARKY.png" alt="Profiles" class="zoomable"/>
            </div>
            - [S5010](http://airfoiltools.com/airfoil/details?airfoil=s5010-il)
            <div style="float: center; width: 100%; text-align: center; margin-bottom: 0.5em;">
                <img width="100%" src="/img/S5010.png" alt="Profiles" class="zoomable"/>
            </div>
            - [S5020](http://airfoiltools.com/airfoil/details?airfoil=s5020-il)
            <div style="float: center; width: 100%; text-align: center; margin-bottom: 0.5em;">
                <img width="100%" src="/img/S5020.png" alt="Profiles" class="zoomable"/>
            </div>
        - What can be seen in that comparison:
            - $$ \mid C_m \mid $$ a lot lower for S5010
            - $$ C_{L, max} $$ better for CLARK-Y -> thicker
            - As CLARK-Y is thicker, the drop off for $$ C_a $$, when stalling, is more gentle
                - Here the data provided by [airfoiltools.com](http://airfoiltools.com) is more in concordance with what I learned at university - XFLR5 still shows a lot of lift beyond stalling - maybe this is calculated with a lift vector rotating with the airfoil?
            - $$\frac{C_L}{C_D}$$ plateaus for CLARK-Y, has more of a peak for S5010 - generally I would like that plateau better, but as explained before, moments are more important for a flying wing
            - $$ C_m $$ for S5010 lowering beyond stalling - pitch down, when stalling, should be nice
    
    




[XFLR5 file](https://github.com/mpsdskd/3D-Print-Plane/blob/master/FlyingWing.xfl)
