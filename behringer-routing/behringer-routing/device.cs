using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace behringer_routing
{
    class device
    {
        public string type { get; set; }
        public string[] connection { get; set; }
        public bool locked { get; set; }
        public string name { get; set; }
    }
}
