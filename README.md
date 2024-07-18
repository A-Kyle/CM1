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
might find them useful. However, the customizations may (perhaps "likely" is a better word)
introduce bugs and problems that a user would not encounter
in the unmodified version of CM1. 

## Active customizations

### External initialization of timed parcel trajectories

With the help of a new file `parcel_list.dat`, a user can specify
the locations and times from which to release passively traced
parcels during model integration. 
The user must set up the `namelist.input` file as before when tracking parcels. 
In the output parcel file, a new field representing the time of parcel release, 
`rtime`, has been added.

#### Known bugs

- An issue related to tracking turbulent kinetic energy (TKE) leads to model crashes when using certain planetary boundary layer schemes.

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
