'reinit'
'set background 1'
'c'
'open ../run/cm1out_parcel.ctl'

;* load fonts from another script
'myfonts'

;* define some colors
'set rgb 48 175 0 130'
'set rgb 49 215 0 130'
'set rgb 50 255 65 130'
'set rgb 51 255 115 130'
'set rgb 52 255 165 130'
'set rgb 53 255 215 130'
'set rgb 54 150 215 170'
'set rgb 55 150 175 255'
'set rgb 56 125 125 255'
'set rgb 57 100 75 200'

pi=3.1415926;

;* plotting window dimensions and coordinates (XY)
w=6.5;
h=w;
xi=2.25;
xf=xi+w;
yi=1;
yf=yi+h;

;* axes limits (km)
xmin=-250;
xmax=-xmin;
ymin=xmin;
ymax=xmax;


;* Parcel/trajectory info for this example:
;* In the CM1 simulation, there are 4960 trajectories released 
;* every hour starting at 12 h, which are distributed among 10 vertical levels
;* (i.e., there are 496 trajectories released on each of the 10 levels each hour). 
;* The parcel list given to CM1 is structured in this way:
;*   [header line]
;*   [parcel initializations at 12 h, z=200 m]
;*   [parcel initializations at 12 h, z=400 m]
;*   [parcel initializations at 12 h, z=600 m]
;*   [ ... ]
;*   [parcel initializations at 13 h, z=200 m]
;*   [parcel initializations at 13 h, z=400 m]
;*   [parcel initializations at 13 h, z=600 m]
;*   [ ... ]
;*   [parcel initializations at 24 h, z=2000 m]
;*
;* We will henceforth refer to 12 h in the CM1 simulation 
;* as o=0 or the "first timestep."


;* this mask will be used to plot only the trajectories
;* we want to show.
;* this mask is defined for trajectories that are:
;*  1. within 250 km in the meridional direction from the domain center
;*  2. within 250 km in the zonal  direction from the domain center
;*  3. within the 40-50 deg azimuthal range relative to the domain center at t=0
;*  4. at least 95 km from the domain center at t=0
mvar='maskout(maskout(maskout(maskout(maskout(x,ri>95000),ai<50),ai>40),250000-abs(x)),250000-abs(y))';

;* these are the initial horizontal positions in CM1 space
;* of the trajectories we will show, which also fall within
;* the mask defined by mvar. We will draw these initial positions.
i=0;
x.i=-73305.2; y.i=-68017.3; i=i+1;
x.i=-82837.9; y.i=-72373.3; i=i+1;
x.i=-88286.9; y.i=-81273.8; i=i+1;
x.i=-81273.8; y.i=-88286.9; i=i+1;
x.i=-76016.9; y.i=-79507.4; i=i+1;
x.i=-66168.6; y.i=-74978.1; i=i+1;
np=i;

;* calculate polygon XY coordinates
i=0; while(i<np)
  px.i=xi+(((x.i-(xmin*1000))/(1000*(xmax-xmin)))*w);
  py.i=yi+(((y.i-(ymin*1000))/(1000*(ymax-ymin)))*h);
  i=i+1;
endwhile

;* construct polyf input
s=''
i=0; while(i<np)
  s=s' 'px.i' 'py.i
  i=i+1;
endwhile



tmin=721  ;* t in GrADS when o=0 (12 h in CM1)
tmax=1441 ;* maximum t in GrADS for the animation 
dt=15;    ;* time between timesteps (min) 
tracet=45 ;* drawn trace time (min)

nz=10           ;* number of levels
nt=12           ;* number of release timesteps
pperz=496       ;* parcels per level per hour
ppert=pperz*nz  ;* percels per hour

o=0 ;* timestep number

t=tmin; while(t<=tmax)
  'set mproj scaled'
  'set parea 2.25 8.75 1 7.5'
  'c'
  'set frame on'
  'set grads off'
  'set xlab on'
  'set ylab on'
  'set xlopts 1 3 0.18'
  'set ylopts 1 3 0.18'
  
  if (o=0)
    k=nt-1; while (k>=0)
      'set X '1+(ppert*k)' 'pperz+(ppert*k)''
      'set T 'tmin
      
      ;* radius field at first timestep for parcels released at 12+k hr in CM1
      'define ri'k'=mag(x,y)'
      
      ;* azimuth field at first timestep for parcels released at 12+k hr in CM1
      'define ai'k'=(atan2(x,y)+'pi')*360/(2*'pi')'
      
      k=k-1;
    endwhile
  else
    'set X 1 'pperz
  endif

  'set gxout scatter'
  'set T 't-tracet' 't
  
  'set vrange 'xmin' 'xmax
  'set vrange2 'ymin' 'ymax
  
  'set cmark 3'
  'set digsiz 0.05'
  'set clevs 1 2 3 4 5 6 8 10 12'
  'set ccols 57 56 55 54 53 52 51 50 49 48'
  
  'set line 1'
  'draw polyf 's

  ;* prepare trajectory mask for parcels released at 12 h
  'ri=ri0'
  'ai=ai0'
  'define xmask='mvar
 
  ;* draw parcel trajectories released at 12 h
  'd xmask/1000;y/1000;z/1000'
  
  ;* colorbar
  'xcbar 'xf+0.1' 'xf+0.25' 'yi' 'yf' -fw 0.17 -fh 0.18 -line -levcol 57 1 56 2 55 3 54 4 53 5 52 6 51 8 50 10 49 12 48'
  
  ;* turn off label annotations and draw parcel trajectories
  ;* released at all hours after 12 h
  'set xlab off'
  'set ylab off'
  rt=1; while(rt<nt)
    'set X '1+(ppert*rt)' 'pperz+(ppert*rt)''
    'set T 'tmin

    'ri=ri'rt
    'ai=ai'rt

    'set gxout scatter'
    'set T 't-tracet' 't

    'define xmask='mvar
    'set cmark 3'
    'set digsiz 0.05'
    'set clevs 1 2 3 4 5 6 8 10 12'
    'set ccols 57 56 55 54 53 52 51 50 49 48'
    'd xmask/1000;y/1000;z/1000'

    rt=rt+1;
  endwhile

  ;* patch a graphical bug
  'set cmark 0'
  'set ccolor 1'
  'd xmask*0;y'
 
  ;* draw timeline
  frac=(t-tmin)/(tmax-tmin);
  bxi=xi+0.25;
  bxf=xf-0.25;
  byi=yf+0.3;
  byf=yf+0.33;
  'draw recf 'bxi' 'byi' 'bxf' 'byf
  dx=(bxf-bxi)/12;
  tw=0.02;
  i=0; while(i<=12)
    txi=bxi-tw+(dx*i);
    txf=bxi+tw+(dx*i);
    m=math_mod(i,3);
    if (m=0)
      'draw recf 'txi' 'byi-0.1' 'txf' 'byf+0.1
      tx=bxi+(dx*i);
      'set string 1 bc'
      'draw string 'tx' 'byf+0.15' 'i+12' h'
    else
      'draw recf 'txi' 'byi-0.06' 'txf' 'byf+0.06
    endif
    i=i+1;
  endwhile
  fx=bxi+((bxf-bxi)*frac);
  fy=(byf+byi)/2;
  
  c=math_mod(t-1,60);
  if (c=0 & t!=tmax)
    'set line 2 1 6'
  else
    'set line 0 1 6'
  endif
  'draw mark 3 'fx' 'fy' 0.12'
  'set line 1 1 6'
  'draw mark 2 'fx' 'fy' 0.12'
  'set line 1 1 3'

  ;* labels
  'set string 1 bc 3 270'
  yc=(yf+yi)/2;
  'draw string 'xf+0.75' 'yc' z position [km]'
  'draw xlab x position [km]'
  'draw ylab y position [km]'
  
  ;* skip some steps: we know that the first 4 timesteps
  ;* at t=0, 15, 30, and 45 min will have no parcels to show.
  ;* just reprint the 0-min image and skip to the 5th timestep.
  if (o=0)
    'gxprint 00.png'
    'gxprint 01.png'
    'gxprint 02.png'
    'gxprint 03.png'
    o=4;
  else
    if (o<10)
      oname='0'o'.png';
    else
      oname=o'.png';
    endif
    'gxprint 'oname
    o=o+1;
  endif

  t=t+dt;
endwhile

;* reprint the last timestep a few times to add a loop delay.
'gxprint 'o'.png'; o=o+1;
'gxprint 'o'.png'; o=o+1;
'gxprint 'o'.png'; o=o+1;
'gxprint 'o'.png'; o=o+1;

* woohoo
