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
        private uint nbrI;
        private uint nbrO;

        public string name
        {
            get { return n; }
        }
        public uint nbrInputs
        {
            get { return nbrI; }
        }
        public uint nbrOutputs
        {
            get { return nbrO; }
        }

        public DeviceTypes(string deviceName, uint deviceInputs, uint deviceOutputs)
        {
            n = deviceName;
            nbrI = deviceInputs;
            nbrO = deviceOutputs;
        }
    }
}
