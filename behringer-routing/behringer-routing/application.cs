using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace behringer_routing
{
    public partial class application : Form
    {
        Scene scene;
        string workingPath;

        public application()
        {
            InitializeComponent();
        }

        private void application_Load(object sender, EventArgs e)
        {
            OpeningForm openingForm = new OpeningForm();
            openingForm.ShowDialog();
            workingPath = openingForm.workingPath;

            this.Text = workingPath;
            if (this.Text == "")
            {
                this.Close();
            }

            scene = new Scene(workingPath);
        }

        private void application_Shown(object sender, EventArgs e)
        {
            
        }
    }
}
