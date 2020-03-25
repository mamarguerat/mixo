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
using System.Xml;
using System.Xml.Serialization;

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
            version.Text = "v1.0.0.42";
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

                using (XmlWriter writer = XmlWriter.Create(path + "\\settings.xml"))
                {
                    writer.WriteStartElement("devices");
                    writer.WriteStartElement("device");
                    writer.WriteElementString("type", newProject.console);
                    writer.WriteElementString("locked", "true");
                    writer.WriteElementString("name", "local inputs");
                    writer.WriteStartElement("connexion");
                    writer.WriteElementString("first", "local 1-8");
                    writer.WriteElementString("second", "local 9-16");
                    if (newProject.console == "Behringer X32" || newProject.console == "Midas M32")
                    {
                        writer.WriteElementString("third", "local 17-24");
                        writer.WriteElementString("fourth", "local 25-32");
                    }
                    writer.WriteEndElement();
                    writer.WriteEndElement();
                    writer.WriteEndElement();
                    writer.Flush();
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
