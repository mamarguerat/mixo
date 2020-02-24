using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using System.IO;

namespace behringer_routing
{
    public partial class OpeningForm : Form
    {
        public OpeningForm()
        {
            InitializeComponent();
        }

        string path;

        public string workingPath
        {
            get
            {
                return path;
            }
        }

        private void OpeningForm_Load(object sender, EventArgs e)
        {
            version.Text = "v1.0.0";
        }

        private void btnNewProject_Click(object sender, EventArgs e)
        {
            newProjectForm newProject = new newProjectForm();
            if (newProject.ShowDialog() == DialogResult.OK)
            {
                path = newProject.path;
                // If directory does not exist, create it. 
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                using (StreamWriter outputFile = new StreamWriter(Path.Combine(path, "settings.brt"), false))
                {
                    outputFile.WriteLine(newProject.console);
                }
                this.Close();
            }
        }

        private void btnOpenProject_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog folderBrowser = new FolderBrowserDialog();
            if (folderBrowser.ShowDialog() == DialogResult.OK)
            {
                path = folderBrowser.SelectedPath;
                this.Close();
            }
        }
    }
}
