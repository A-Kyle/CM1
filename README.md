# Customized CM1 Numerical Model
#### Sourced from Release 21.0 (cm1r21.0)
#### Release date: 20 April 2022

> [!IMPORTANT] 
> Please read the "CHANGES" file for a summary of changes in this release.  

---

## What is this?

This is a repository for a customized Cloud Model 1 (CM1). 
This custom version of CM1 was originally sourced from version 21.0
and downloaded at https://www2.mmm.ucar.edu/people/bryan/cm1/. 
The customizations included here are available in case anyone
might find them useful. 

## File-based initialization of timed parcel trajectories

With the help of a new file `parcel_list.dat`, the user can specify
the locations and times from which to release passively traced
parcels during model integration. 
In the output parcel file, a new field representing the time of parcel release, 
`rtime`, has been added.

### How to use

A new file in the `run` directory, `parcel_list.dat`, can be used to 
specify initial positions (x, y, and z) and release times (t) for a list of parcels. 
The file should be structured in this way,
with a header (first) line followed by lines describing each parcel's initial
position and release time:
```
  x(m)      y(m)      z(m)      t(s)
  1000.0    1000.0    200.0     0.0
  1000.0    1000.0    200.0     3600.0
  12345.0   0.0       111.0     7200.0
  [ ... more (x,y,z,t) lines here ... ]
```
The subroutine that reads the `parcel_list.dat` file will
skip past the header line, and then read the rest of the
file line-by-line, with each line describing a parcel's initial
position and time of release.

Aside from setting up the `parcel_list.dat` file in the `run` directory, 
the user must go into the `namelist.input` file and set `iprcl=2` in the `&param2` block.
The user should make additional adjustments to `namelist.input` as
would be done normally, including setting `nparcels` equal to the number 
of parcels to track (i.e., the number of parcels described in the `parcel_list.dat` file).

Note that the user can still use the original method to initialize parcel trajectories 
by setting `iprcl=1` in `namelist.input`.

#### Example

Below is an animation of parcel trajectories released hourly between 12 and 24 hours (h) 
from the same spatial coordinates (enclosed in a black polygon in quadrant 3) in a low-resolution hurricane simulation. 
Released parcel paths from the previous 45 minutes are shown and shaded by elevation.  
A timeline is shown at the top, and the circle on the timeline marks the time in the simulation. 
The circle on the timeline flickers dark red when parcels are released. The run directory used
for this simulation can be found in the [`example_01` branch](https://github.com/A-Kyle/CM1/tree/example_01).

![an example](https://raw.githubusercontent.com/A-Kyle/CM1/refs/heads/ALLMODS/examples/traj_0.gif)

#### Found issues

- Output failures occur when setting `ipbl=5` and `prcl_tke=1` in `namelist.input`.
Note that these failures occur whether `iprcl=1` (original design) or `iprcl=2` (new design).

---

## Disclaimer, copyright, licensing

©2022 - University Corporation for Atmospheric Research 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights 
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom the Software is furnished 
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
