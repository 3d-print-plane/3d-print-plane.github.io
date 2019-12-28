---
layout: post
title:  "Aerodynamic & Flight Dynamic Design"
date:   2019-11-30
categories: Aerodynamics
--- 
Disclaimer: This one is quite long and I cannot guarantee factual accuracy.
For naming conventions of variables/symbols I try to adhere to DIN 9300-1 1990 (I think the eqivalent ISO standard is ISO 1151-1).

### Airfoil Profile Choice

An obviously important choice for a flying wing is the wing's airfoil. Unfortnuately there is no perfect choice here. 
<sub><sub><sub><sub>As for everything...</sub></sub></sub></sub> 

There are several important factors to consider:
- Aerodynamic factors:
    - $$\frac{c_l}{c_w}$$ respectively $$ \epsilon $$ or its reciprocal value $$ E $$
        - Well, there are very few engineers, who are not interested in Efficiency. For a model airplane efficiency impacts flight duration, glide path angle, "Eigensinken" (true descent - if anybody knows the correct English term? -> slowest possible descent rate without external influences & motors)
    - $$ c_{l, max} $$ maximum coefficient of lift
        - Important for the slowest possible flight speed - important for hand launch
    - Ideally no sharp drop off in $$ c_l $$ beyond $ \alpha_max $$ - don't want to suddenly lose all lift
    - low $$ c_w $$ in an $$ \alpha $$ range rather than a little spike as sometimes seen with laminar profiles
    - Rather guesswork:
        - Do little disturbances in profile shape/surface quality impact aerodynamic properties more or less? - less is preferably due to imperfections through FDM process
        - Do flaps work well with respective airfoils?
        - Can the airfoil be printed well? (Constant curves preferably)
- Practical considerations:
    - "Fuselage" part must be thick enough to providde space for battery & electronics. There will be a small fuselage kind of part, as I want a replaceable nose part and I need space for a motor. Close to that fuselage I want a really thick airfoil (around $$ 15 \%   d/l $$) for aesthetic reasons. 

[XFLR5 file](https://github.com/mpsdskd/3D-Print-Plane/blob/master/FlyingWing.xfl)
