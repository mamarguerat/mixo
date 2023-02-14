using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace behringer_routing
{
    class Inputs
    {
        private string n;
        private string desc;
        private Icons icon;
        private Colors color;
        private bool phPower;
        private bool lc;

        public Inputs()
        {
            n = "";
            desc = "";
            phPower = false;
            lc = false;
        }
    }
}
