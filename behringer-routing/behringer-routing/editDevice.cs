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
    public partial class editDevice : Form
    {
        public string deviceType
        {
            get
            {
                return comboBoxType.Text;
            }
            set
            {
                comboBoxType.Text = value;
            }
        }
        public string connection
        {
            get
            {
                return comboBoxConnection.Text;
            }
            set
            {
                comboBoxConnection.Text = value;
            }
        }

        public editDevice()
        {
            InitializeComponent();

            comboBoxType.Items.Add("SD8");
            comboBoxType.Items.Add("SD16");

            comboBoxConnection.Items.Add("AES50 A1-8");
            comboBoxConnection.Items.Add("AES50 A9-16");
            comboBoxConnection.Items.Add("AES50 A17-24");
            comboBoxConnection.Items.Add("AES50 A25-32");
            comboBoxConnection.Items.Add("AES50 A33-40");
            comboBoxConnection.Items.Add("AES50 A41-48");
            comboBoxConnection.Items.Add("AES50 B1-8");
            comboBoxConnection.Items.Add("AES50 B9-16");
            comboBoxConnection.Items.Add("AES50 B17-24");
            comboBoxConnection.Items.Add("AES50 B25-32");
            comboBoxConnection.Items.Add("AES50 B33-40");
            comboBoxConnection.Items.Add("AES50 B41-48");
        }

        private void buttonOK_Click(object sender, EventArgs e)
        {
            this.DialogResult = DialogResult.OK;
            this.Close();
        }

        private void buttonCancel_Click(object sender, EventArgs e)
        {
            this.DialogResult = DialogResult.Cancel;
            this.Close();
        }
    }
}
