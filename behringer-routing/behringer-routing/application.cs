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
        private struct channel
        {
            public string name;
            public bool phantom;
            public bool phase;
            public string icon;
            public string color;
            public bool invert;
        }
        private struct device
        {
            public string type;
            public string connection;
            public string output;
            public bool locked;
            public string name;
            public channel[] input;
        }

        // X32scene x32;
        string workingPath;

        device mainConsole = new device();
        private List<device> devicesA = new List<device>();
        private List<device> devicesB = new List<device>();

        public application()
        {
            InitializeComponent();
        }

        private bool StringToBool(string text)
        {
            if (text == "True" || text == "true")
                return true;
            else if (text == "False" || text == "false")
                return false;
            else
                return false;
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
                                    if (device.type == "Behringer X32 Compact" || device.type == "SD16")
                                        device.input = new channel[16];
                                    else if (device.type == "SD8")
                                        device.input = new channel[8];
                                    break;
                                case "locked":
                                    device.locked = StringToBool(reader.ReadString());
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
                            if (reader.NodeType == XmlNodeType.Element && reader.Name == "channel")
                            {
                                int i = 0;
                                do
                                {
                                    reader.Read();
                                    switch (reader.Name)
                                    {
                                        case "name":
                                            break;
                                        case "phantom":
                                            device.input[i].phantom = StringToBool(reader.ReadString());
                                            break;
                                        case "phase":
                                            device.input[i].phase = StringToBool(reader.ReadString());
                                            break;
                                        case "icon":
                                            break;
                                        case "color":
                                            break;
                                        case "invert":
                                            device.input[i].invert = StringToBool(reader.ReadString());
                                            break;
                                    }
                                } while (reader.NodeType != XmlNodeType.EndElement || reader.Name != "channel");
                                i++;
                            }
                        } while (reader.NodeType != XmlNodeType.EndElement || reader.Name != "device");

                        if (reader.NodeType == XmlNodeType.EndElement && reader.Name == "device")
                        {
                            addDevice(device);
                        }
                    }
                }
            }
        }

        private void addDevice(device device)
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

        private void saveDevices()
        {
            mainConsole = new device();
            devicesA.Clear();
            devicesB.Clear();

            for (int i = 0; i < dataGridViewDevices.Rows.Count; i++)
            {
                device device = new device();
                try
                {
                    //device.connection = new string[4];
                    device.locked = StringToBool(dataGridViewDevices.Rows[i].Cells["locked"].Value.ToString());
                    device.type = dataGridViewDevices.Rows[i].Cells["Device"].Value.ToString();
                    device.connection = dataGridViewDevices.Rows[i].Cells["AES50"].Value.ToString();
                    device.name = dataGridViewDevices.Rows[i].Cells["Name"].Value.ToString();
                    device.output = dataGridViewDevices.Rows[i].Cells["Output"].Value.ToString();
                    for (int j = 0; j < dataGridViewChannels.Rows.Count; j++)
                    {
                        device.input[j].name = dataGridViewChannels.Rows[j].Cells["Name"].Value.ToString();
                        device.input[j].phantom = StringToBool(dataGridViewChannels.Rows[j].Cells["Phantom"].Value.ToString());
                        device.input[j].phase = StringToBool(dataGridViewChannels.Rows[j].Cells["Phase"].Value.ToString());
                        device.input[j].icon = dataGridViewChannels.Rows[j].Cells["Icon"].Value.ToString();
                        device.input[j].color = dataGridViewChannels.Rows[j].Cells["Color"].Value.ToString();
                        device.input[j].invert = StringToBool(dataGridViewChannels.Rows[j].Cells["Invert"].Value.ToString());
                    }
                }
                catch { }
                switch (device.connection)
                {
                    case "A":
                        devicesA.Add(device);
                        break;
                    case "B":
                        devicesB.Add(device);
                        break;
                    default:
                        mainConsole = device;
                        break;
                }
            }
        }

        private void saveXML()
        {
            using (XmlWriter writer = XmlWriter.Create(workingPath + "\\settings.xml"))
            {
                writeDevice(writer, mainConsole);
                foreach (device device in devicesA)
                {
                    writeDevice(writer, device);
                }
                foreach (device device in devicesB)
                {
                    writeDevice(writer, device);
                }
                writer.WriteEndElement();
                writer.Flush();
            }
        }

        private void writeDevice(XmlWriter writer, device device)
        {
            writer.WriteStartElement("device");
            writer.WriteElementString("type", device.type);
            writer.WriteElementString("locked", device.locked.ToString());
            writer.WriteElementString("name", device.name);
            writer.WriteElementString("connection", device.connection);
            writer.WriteStartElement("channels");
            foreach (channel input in device.input)
            {
                writer.WriteStartElement("channel");
                writer.WriteElementString("name", input.name);
                writer.WriteElementString("phantom", input.phantom.ToString());
                writer.WriteElementString("phase", input.phase.ToString());
                writer.WriteElementString("icon", input.icon);
                writer.WriteElementString("color", input.color);
                writer.WriteElementString("invert", input.invert.ToString());
                writer.WriteEndElement();
            }
            writer.WriteEndElement();
            writer.WriteEndElement();
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
            dataGridViewDevices.Rows[dataGridViewDevices.Rows.Count - 1].Selected = true;
            SelectRow(0);
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
            dataGridViewDevices.Columns["Device"].Width = 150;
            dataGridViewDevices.Columns["1-8"].Width = 80;
            dataGridViewDevices.Columns["9-16"].Width = 80;
            dataGridViewDevices.Columns["17-24"].Width = 80;
            dataGridViewDevices.Columns["25-32"].Width = 80;
            dataGridViewDevices.Columns["Output"].Width = 80;
            dataGridViewDevices.Columns["AES50"].ReadOnly = true;
            dataGridViewDevices.Columns["Output"].ReadOnly = true;
            dataGridViewDevices.Columns["Name"].AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
            dataGridViewDevices.Columns["Name"].ReadOnly = true;
            dataGridViewDevices.Columns["locked"].Visible = false;
            dataGridViewDevices.Columns["AES50"].Visible = false;

            foreach (DataGridViewColumn column in dataGridViewDevices.Columns)
            {
                column.SortMode = DataGridViewColumnSortMode.NotSortable;
            }

            dataGridViewDevices.Rows.Add();
            dataGridViewDevices["Device", 0].Value = mainConsole.type;
            dataGridViewDevices["locked", 0].Value = mainConsole.locked.ToString();
            dataGridViewDevices["name", 0].Value = mainConsole.name;
            fillAES50(0, mainConsole);
            dataGridViewDevices["Output", 0].Value = mainConsole.output;
            dataGridViewDevices["AES50", 0].Value = mainConsole.connection;

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
            string connection = "AES50";
            int channel;
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
                    connection += "A ";
                    channel = 1;
                    for (int i = row; i > 1; i--)
                    {
                        channel += devicesA[i - 1].input.Length;
                    }
                    values[0] = connection + channel + "-" + (channel + 7);
                    switch (device.type)
                    {
                        case "SD8":
                            break;
                        case "SD16":
                            values[1] = connection + (channel + 8) + "-" + (channel + 15);
                            break;
                    }
                    break;
                case "B":
                    connection += "B ";
                    channel = 1;
                    for (int i = row; i > 1 + devicesA.Count; i--)
                    {
                        channel += devicesA[i - 1].input.Length;
                    }
                    values[0] = connection + channel + "-" + (channel + 7);
                    switch (device.type)
                    {
                        case "SD8":
                            break;
                        case "SD16":
                            values[1] = connection + (channel + 8) + "-" + (channel + 15);
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
            int index = 0;
            foreach(DataGridViewRow row in dataGridViewDevices.Rows)
            {
                if (row.Selected == true)
                {
                    index = row.Index;
                    break;
                }
            }
            SelectRow(index);
        }

        private void SelectRow(int row)
        {
            dataGridViewDevices.ClearSelection();
            dataGridViewDevices.Rows[row].Selected = true;
            device device = new device();
            try
            {
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
                device.output = dataGridViewDevices.Rows[i].Cells["Output"].Value.ToString();
                device.name = dataGridViewDevices.Rows[i].Cells["Name"].Value.ToString();
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
            device newDevice = new device();
            newDevice.locked = false;
            if (comboBoxDevice.Enabled && comboBoxDevice.Text != "" && comboBoxOutput.Text != "" && comboBoxAES50.Text != "")
            {
                newDevice.type = comboBoxDevice.SelectedItem.ToString();
                newDevice.connection = comboBoxAES50.SelectedItem.ToString();
                newDevice.output = comboBoxOutput.SelectedItem.ToString();
                newDevice.name = tbxName.Text;
            }
            else
            {
                newDevice.type = "SD8";
                newDevice.connection = "A";
                newDevice.output = "1-8";
                newDevice.name = tbxName.Text;
            }
            addDevice(newDevice);
            dataGridUpdate();
            SelectRow(dataGridViewDevices.Rows.Count - 1);
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

            saveDevices();
            dataGridUpdate();
        }
    }
}
