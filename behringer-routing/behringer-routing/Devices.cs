using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace behringer_routing
{
    class Devices
    {
        private DeviceTypes deviceType;
        private string n;
        private string desc;
        private Inputs[] input;
        private Outputs[] output;
        private bool locked;
        private bool mast;
        private Devices AES50_A;
        private Devices AES50_B;

        public bool master
        {
            set { mast = value;  }
        }
        public string name
        {
            get { return n; }
            set { n = value; }
        }
        public string description
        {
            get { return desc; }
            set { desc = value; }
        }
        public DeviceTypes type
        {
            get { return deviceType; }
            set { deviceType = value; }
        }

        public Devices aes50_A
        {
            get { return AES50_A; }
            set { AES50_A = value; }
        }
        public Devices aes50_B
        {
            get { return AES50_B; }
            set { AES50_B = value; }
        }

        public Devices(DeviceTypes type)
        {
            deviceType = type;
            input = new Inputs[deviceType.nbrInputs];
            output = new Outputs[deviceType.nbrOutputs];
            n = deviceType.name;
            master = false;
        }
    }
}
