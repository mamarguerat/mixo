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

namespace behringer_routing
{
    public partial class application : Form
    {
        // X32scene x32;
        string workingPath;

        device mainConsole = new device();
        private List<device> devicesA = new List<device>();
        private List<device> devicesB = new List<device>();

        public application()
        {
            InitializeComponent();
        }

        private void initDevices()
        {
            device device = new device();

            using (XmlReader reader = XmlReader.Create(workingPath + "\\settings.xml"))
            {
                while (reader.Read())
                {
                    if (reader.NodeType == XmlNodeType.Element && reader.Name == "device")
                    {
                        do
                        {
                            reader.Read();
                            switch (reader.Name)
                            {
                                case "type":
                                    device.type = reader.ReadString();
                                    break;
                                case "locked":
                                    string read = reader.ReadString();
                                    if (read == "True" || read == "true")
                                    {
                                        device.locked = true;
                                    }
                                    else if (read == "False" || read == "false")
                                    {
                                        device.locked = false;
                                    }
                                    break;
                                case "name":
                                    device.name = reader.ReadString();
                                    break;
                                case "connection":
                                    device.connection = reader.ReadString();
                                    break;
                                case "output":
                                    device.output = reader.ReadString();
                                    break;
                            }
                        } while (reader.NodeType != XmlNodeType.EndElement || reader.Name != "device");

                        if (reader.NodeType == XmlNodeType.EndElement && reader.Name == "device")
                        {
                            switch (device.connection)
                            {
                                case "local":
                                    mainConsole = device;
                                    break;
                                case "A":
                                    devicesA.Add(device);
                                    break;
                                case "B":
                                    devicesB.Add(device);
                                    break;
                            }
                            device = new device();
                        }
                    }
                }
            }
        }

        private List<device> saveDevices()
        {
            List<device> list = new List<device>();

            for (int i = 0; i < dataGridViewDevices.Rows.Count - 1; i++)
            {
                device device = new device();
                try
                {
                    //device.connection = new string[4];
                    if (dataGridViewDevices.Rows[i].Cells["locked"].Value.ToString() == "True")
                    {
                        device.locked = true;
                    }
                    else
                    {
                        device.locked = false;
                    }
                    device.type = dataGridViewDevices.Rows[i].Cells["Device"].Value.ToString();
                    if (device.locked)
                    {
                        //for (int j = 0; j < 4; j++)
                        device.connection = dataGridViewDevices.Rows[i].Cells[0 + 1].Value.ToString();
                    }
                    else
                    {
                        //for (int j = 0; j < 4; j++)
                        device.connection = (dataGridViewDevices.Rows[i].Cells[0 + 1] as DataGridViewComboBoxCell).Value.ToString();
                    }
                    device.name = dataGridViewDevices.Rows[i].Cells["Name"].Value.ToString();
                }
                catch { }
                list.Add(device);
            }
            return list;
        }

        private void saveXML()
        {
            using (XmlWriter writer = XmlWriter.Create(workingPath + "\\settings.xml"))
            {
                writer.WriteStartElement("devices"); writer.WriteStartElement("device");
                writer.WriteElementString("type", mainConsole.type);
                writer.WriteElementString("locked", mainConsole.locked.ToString());
                writer.WriteElementString("name", mainConsole.name);
                writer.WriteStartElement("connection");
                writer.WriteElementString("first", mainConsole.connection);
                writer.WriteEndElement();
                writer.WriteEndElement();
                foreach (device device in devicesA)
                {
                    writer.WriteStartElement("device");
                    writer.WriteElementString("type", device.type);
                    writer.WriteElementString("locked", device.locked.ToString());
                    writer.WriteElementString("name", device.name);
                    writer.WriteStartElement("connection");
                    writer.WriteElementString("first", device.connection);
                    writer.WriteEndElement();
                    writer.WriteEndElement();
                }
                foreach (device device in devicesB)
                {
                    writer.WriteStartElement("device");
                    writer.WriteElementString("type", device.type);
                    writer.WriteElementString("locked", device.locked.ToString());
                    writer.WriteElementString("name", device.name);
                    writer.WriteStartElement("connection");
                    writer.WriteElementString("first", device.connection);
                    writer.WriteEndElement();
                    writer.WriteEndElement();
                }
                writer.WriteEndElement();
                writer.Flush();
            }
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
                return;
            }

            initDevices();
            dataGridUpdate();
            // x32 = new X32scene(workingPath);

            string[] connexions = { "1-8", "9-16", "17-24" };
            string[] AES50 = { "A", "B" };
            string[] device = { "SD16", "SD8" };

            comboBoxAES50.Items.AddRange(AES50);
            comboBoxDevice.Items.AddRange(device);
            comboBoxOutput.Items.AddRange(connexions);
        }

        private void application_Shown(object sender, EventArgs e)
        {

        }

        private void dataGridViewDevices_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void dataGridUpdate()
        {
            dataGridViewDevices.Rows.Clear();

            dataGridViewDevices.ColumnCount = 9;
            dataGridViewDevices.Columns[0].Name = "Device";
            dataGridViewDevices.Columns[1].Name = "1-8";
            dataGridViewDevices.Columns[2].Name = "9-16";
            dataGridViewDevices.Columns[3].Name = "17-24";
            dataGridViewDevices.Columns[4].Name = "25-32";
            dataGridViewDevices.Columns[5].Name = "Output";
            dataGridViewDevices.Columns[6].Name = "Name";
            dataGridViewDevices.Columns[7].Name = "locked";
            dataGridViewDevices.Columns[8].Name = "AES50";
            dataGridViewDevices.Columns["Device"].ReadOnly = true;
            dataGridViewDevices.Columns["Device"].FillWeight = 150;
            dataGridViewDevices.Columns["AES50"].ReadOnly = true;
            dataGridViewDevices.Columns["Output"].ReadOnly = true;
            dataGridViewDevices.Columns["Name"].AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
            dataGridViewDevices.Columns["Name"].ReadOnly = true;
            dataGridViewDevices.Columns["locked"].Visible = true;
            dataGridViewDevices.Columns["AES50"].Visible = true;

            foreach (DataGridViewColumn column in dataGridViewDevices.Columns)
            {
                column.SortMode = DataGridViewColumnSortMode.NotSortable;
            }

            dataGridViewDevices.Rows.Add();
            dataGridViewDevices["Device", 0].Value = mainConsole.type;
            dataGridViewDevices["locked", 0].Value = mainConsole.locked.ToString();
            dataGridViewDevices["name", 0].Value = mainConsole.name;
            fillAES50(0, mainConsole);

            for (int i = 0; i < devicesA.Count; i++)
            {
                int row = i + 1;
                dataGridViewDevices.Rows.Add();
                dataGridViewDevices["Device", row].Value = devicesA[i].type;
                dataGridViewDevices["locked", row].Value = devicesA[i].locked.ToString();
                dataGridViewDevices["name", row].Value = devicesA[i].name;
                fillAES50(row, devicesA[i]);
                dataGridViewDevices["Output", row].Value = devicesA[i].output;
                dataGridViewDevices["AES50", row].Value = devicesA[i].connection;
            }

            for (int i = 0; i < devicesB.Count; i++)
            {
                int row = i + 1 + devicesA.Count();
                dataGridViewDevices.Rows.Add();
                dataGridViewDevices["Device", row].Value = devicesB[i].type;
                dataGridViewDevices["locked", row].Value = devicesB[i].locked.ToString();
                dataGridViewDevices["name", row].Value = devicesB[i].name;
                fillAES50(row, devicesB[i]);
                dataGridViewDevices["Output", row].Value = devicesB[i].output;
                dataGridViewDevices["AES50", row].Value = devicesB[i].connection;
            }

            dataGridViewDevices.AllowUserToAddRows = false;
            dataGridViewDevices.ClearSelection();
        }

        private void fillAES50(int row, device device)
        {
            string[] values = { "", "", "", "" };
            switch (device.connection)
            {
                case "local":
                    switch (device.type)
                    {
                        case "Behringer X32 Compact":
                            values[0] = "local 1-8";
                            values[1] = "local 9-16";
                            break;
                    }
                    break;
                case "A":
                    switch (device.type)
                    {
                        case "SD8":

                            break;
                        case "SD16":

                            break;
                    }
                    break;
                case "B":
                    switch (device.type)
                    {
                        case "SD8":

                            break;
                        case "SD16":

                            break;
                    }
                    break;

            }
            dataGridViewDevices["1-8", row].Value = values[0];
            dataGridViewDevices["9-16", row].Value = values[1];
            dataGridViewDevices["17-24", row].Value = values[2];
            dataGridViewDevices["25-32", row].Value = values[3];
        }

        private void dataGridViewDevices_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            device device = new device();
            try
            {
                //device.connection = new string[4];
                int i = dataGridViewDevices.CurrentCell.RowIndex;
                if (dataGridViewDevices.Rows[i].Cells["locked"].Value.ToString() == "True")
                {
                    device.locked = true;
                }
                else
                {
                    device.locked = false;
                }
                device.type = dataGridViewDevices.Rows[i].Cells["Device"].Value.ToString();
                device.connection = dataGridViewDevices.Rows[i].Cells["AES50"].Value.ToString();
                device.name = dataGridViewDevices.Rows[i].Cells["Name"].Value.ToString();
                device.output = dataGridViewDevices.Rows[i].Cells["Output"].Value.ToString();
            }
            catch { }

            if (device.locked)
            {
                buttonRemove.Enabled = false;
                buttonDown.Enabled = false;
                buttonUp.Enabled = false;
                comboBoxDevice.Text = device.type;
                comboBoxDevice.Enabled = false;
                comboBoxAES50.Text = "local";
                comboBoxAES50.Enabled = false;
                comboBoxOutput.Text = "local";
                comboBoxOutput.Enabled = false;
                tbxName.Text = device.name;
            }
            else
            {
                buttonRemove.Enabled = true;
                buttonDown.Enabled = true;
                buttonUp.Enabled = true;
                comboBoxDevice.Text = device.type;
                comboBoxDevice.Enabled = true;
                comboBoxAES50.Text = device.connection;
                comboBoxAES50.Enabled = true;
                comboBoxOutput.Text = device.output;
                comboBoxOutput.Enabled = true;
                tbxName.Text = device.name;
            }
            tbxName.Text = device.name;
        }

        private void dataGridViewDevices_CellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            //devices = saveDevices();
        }

        private void saveToolStripMenuItem_Click(object sender, EventArgs e)
        {
            //devices = saveDevices();
            saveXML();
        }

        private void buttonDown_Click(object sender, EventArgs e)
        {
            //int index = dataGridViewDevices.CurrentCell.RowIndex;
            //if (!devices[index].locked)
            //{
            //    if (index + 1 < devices.Count() && devices[index + 1].locked != true)
            //    {
            //        device device = new device();
            //        device = devices[index + 1];
            //        devices[index + 1] = devices[index];
            //        devices[index] = device;
            //        dataGridUpdate();
            //        dataGridViewDevices.Rows[index +
            //            1].Cells[0].Selected = true;
            //    }
            //}
            //else
            //    MessageBox.Show("ERROR\nThis row can't be moved", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }

        private void buttonUp_Click(object sender, EventArgs e)
        {
            //int index = dataGridViewDevices.CurrentCell.RowIndex;
            //if (!devices[index].locked)
            //{
            //    if (index - 1 >= 0 && devices[index - 1].locked != true)
            //    {
            //        device device = new device();
            //        device = devices[index - 1];
            //        devices[index - 1] = devices[index];
            //        devices[index] = device;
            //        dataGridUpdate();
            //        dataGridViewDevices.Rows[index - 1].Cells[0].Selected = true;
            //    }
            //}
            //else
            //    MessageBox.Show("ERROR\nThis row can't be moved", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }

        private void buttonRemove_Click(object sender, EventArgs e)
        {
            //if (!devices[dataGridViewDevices.CurrentCell.RowIndex].locked)
            //    devices.RemoveAt(dataGridViewDevices.CurrentCell.RowIndex);
            //else
            //    MessageBox.Show("ERROR\nThis row can't be deleted", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            //dataGridUpdate();
        }

        private void buttonAdd_Click(object sender, EventArgs e)
        {
            //device device = new device();
            ////device.connection = new string[4];
            //device.locked = false;
            //devices.Add(device);
            //dataGridUpdate();
        }

        private void buttonSaveSettings_Click(object sender, EventArgs e)
        {
            int i = dataGridViewDevices.CurrentCell.RowIndex;
            try
            {
                if (dataGridViewDevices.Rows[i].Cells["locked"].Value.ToString() == "false")
                {
                    dataGridViewDevices.Rows[i].Cells["Device"].Value = comboBoxDevice.SelectedItem.ToString();
                    dataGridViewDevices.Rows[i].Cells["AES50"].Value = comboBoxAES50.SelectedItem.ToString();
                    dataGridViewDevices.Rows[i].Cells["Output"].Value = comboBoxOutput.SelectedItem.ToString();
                }
                dataGridViewDevices.Rows[i].Cells["Name"].Value = tbxName.Text;
            }
            catch { }
        }
    }
}
