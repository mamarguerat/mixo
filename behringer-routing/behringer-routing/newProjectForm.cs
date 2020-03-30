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
    public partial class newProjectForm : Form
    {
        public newProjectForm()
        {
            InitializeComponent();
        }

        public string path
        {
            get
            {
                return tbxLocation.Text + "\\" + tbxName.Text;
            }
        }
        public string console
        {
            get
            {
                return cbxConsole.Text;
            }
        }

        private void btnOK_Click(object sender, EventArgs e)
        {
            if (cbxConsole.Text != "")
            {
                this.DialogResult = DialogResult.OK;
                this.Close();
            }
            else
            {
                cbxConsole.Text = "Please select a console";
                label3.ForeColor = Color.Orange;
            }
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            this.DialogResult = DialogResult.Cancel;
            this.Close();
        }

        private void btnBrowse_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog folderBrowser = new FolderBrowserDialog();
            if (folderBrowser.ShowDialog() == DialogResult.OK)
            {
                tbxLocation.Text = folderBrowser.SelectedPath;
            }
        }

        private void newProjectForm_Load(object sender, EventArgs e)
        {
            cbxConsole.Items.Add("Behringer X32 Compact");
            //cbxConsole.Items.Add("(Behringer X32)");
            //cbxConsole.Items.Add("(Behringer X32 Producer)");
            //cbxConsole.Items.Add("(Behringer X32 Rack)");
            //cbxConsole.Items.Add("(Midas M32)");
            //cbxConsole.Items.Add("(Midas M32 Rack)");
            //cbxConsole.Items.Add("(Behringer Wing)");
        }
    }
}
