using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace behringer_routing
{
    class DeviceTypes
    {
        private string n;
        private string t;
        private uint nbrI;
        private uint nbrO;

        public string name
        {
            get { return n; }
        }
        public string type
        {
            get { return t; }
        }
        public uint nbrInputs
        {
            get { return nbrI; }
        }
        public uint nbrOutputs
        {
            get { return nbrO; }
        }

        public DeviceTypes(string deviceName, string type, uint deviceInputs, uint deviceOutputs)
        {
            n = deviceName;
            t = type;
            nbrI = deviceInputs;
            nbrO = deviceOutputs;
        }
    }
}
