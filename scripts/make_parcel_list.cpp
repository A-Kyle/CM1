#include <cstdio>
#include <fstream>
#include <iostream>
#include <string>
#include <cmath>
#include <fstream>
#include <iomanip>
#include <vector>

/* This (hastily written) program makes an example parcel_list.dat file
 * for CM1 and timed parcel releases. 
 * Compile with version >= c++11.
 */

static const double pi = acos(-1.0);

int main(int argc, char *argv[]) {
  std::string fparcels = "parcel_list.dat";
  std::ofstream fout(fparcels, std::ios::out);


  if (fout.is_open()) {
    std::string lin;
    lin = "   X(m)   "; fout << lin;
    lin = "   Y(m)   "; fout << lin;
    lin = "   Z(m)   "; fout << lin;
    lin = "   T(s)   "; fout << lin; 
    fout << std::endl;
  } else {
    return 1;
  }
  
  // radial range and grid spacing
  int minr = 10000;
  int maxr = 120000;
  int dr   = 10000;

  // vertical range and grid spacing
  int minz = 200;
  int maxz = 2000;
  int dz   = 200;

  // time span and dt
  int mint = 43200;
  int maxt = 86400;
  int dt   = 3600;

  double targetdL=10000.0;  // target distance along a circular path
                            // between parcels released at the same r
  
  std::vector<double> xlist;
  std::vector<double> ylist;
  
  for (int r=minr; r<=maxr; r+=dr) {
    double cir   = 2.0*pi*r;        // circumference at r
    double parts = cir/targetdL;    // how many times can dL go into cir
    int nparcel  = int(parts)+1;    // round the number of parts up to nearest whole number
                                    // ...this is the number of parcels to release at this r
    
    // difference in radians between parcels along the same r
    double da = 2.0*pi/double(nparcel); 
    for (int n=0; n<nparcel; n++) {
      double a  = double(n)*da;
      double x  = double(r)*cos(a);
      double y  = double(r)*sin(a);
      xlist.push_back(x);
      ylist.push_back(y);
    }
  }
 
  // write all the parcel inits to the file
  for (int t=mint; t<=maxt; t+=dt) { 
    float to=t;
    for (int z=minz; z<=maxz; z+=dz) {
      float zo=z;
      for (int i=0; i < xlist.size(); i++) {
        fout << std::left << std::setw(10) << std::fixed << std::setprecision(1) << xlist[i];
        fout << std::left << std::setw(10) << std::fixed << std::setprecision(1) << ylist[i];
        fout << std::left << std::setw(10) << std::fixed << std::setprecision(1) << zo;
        fout << std::left << std::setw(10) << std::fixed << std::setprecision(1) << to << std::endl;
      }
    }
  }

  fout.close();
  
  return 0;
}

