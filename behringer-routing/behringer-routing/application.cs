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
        string consoleType;

        List<device> devices = new List<device>();

        public application()
        {
            InitializeComponent();
        }

        List<device> initDevices()
        {
            var list = new List<device>();
            int i = 0;
            device device = new device();

            using (XmlReader reader = XmlReader.Create(workingPath + "\\settings.xml"))
            {
                while (reader.Read())
                {
                    if (reader.NodeType == XmlNodeType.Element && reader.Name == "device")
                    {
                        list.Add(new device());
                        list[i].connection = new string[4];
                        do
                        {
                            reader.Read();
                            //return only when you have START tag
                            switch (reader.Name)
                            {
                                case "type":
                                    list[i].type = reader.ReadString();
                                    break;
                                case "locked":
                                    string read = reader.ReadString();
                                    if (read == "true")
                                    {
                                        list[i].locked = true;
                                    }
                                    else if (read == "false")
                                    {
                                        list[i].locked = false;
                                    }
                                    break;
                                case "name":
                                    list[i].name = reader.ReadString();
                                    break;
                                case "first":
                                    list[i].connection[0] = reader.ReadString();
                                    break;
                                case "second":
                                    list[i].connection[1] = reader.ReadString();
                                    break;
                            }
                        } while (reader.NodeType != XmlNodeType.EndElement || reader.Name != "device");

                        if (reader.NodeType == XmlNodeType.EndElement && reader.Name == "device")
                        {
                            i++;
                            device = new device();
                        }
                    }
                }
            }

            return list;
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

            devices = initDevices();

            consoleType = devices[0].type;

            dataGridUpdate();
            // x32 = new X32scene(workingPath);
        }

        private void application_Shown(object sender, EventArgs e)
        {

        }

        private void dataGridViewDevices_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                var selectedDevice = dataGridViewDevices.SelectedRows[0].DataBoundItem as device;
                if (selectedDevice.locked)
                {
                    buttonEdit.Enabled = false;
                }
                else buttonEdit.Enabled = true;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Some error occured: " + ex.Message + " - " + ex.Source, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void buttonEdit_Click(object sender, EventArgs e)
        {
            editDevice edit = new editDevice();
            try
            {
                var selectedDevice = dataGridViewDevices.SelectedRows[0].DataBoundItem as device;
                edit.deviceType = selectedDevice.type;
                //edit.connection = selectedDevice.connection;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Some error occured: " + ex.Message + " - " + ex.Source, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            if (edit.ShowDialog() == DialogResult.OK)
            {
                try
                {
                    var selectedDevice = dataGridViewDevices.SelectedRows[0].DataBoundItem as device;
                    selectedDevice.type = edit.deviceType;
                    //selectedDevice.connection = edit.connection;
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Some error occured: " + ex.Message + " - " + ex.Source, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void buttonAdd_Click(object sender, EventArgs e)
        {
            editDevice edit = new editDevice();
            if (edit.ShowDialog() == DialogResult.OK)
            {
                //devices.Add(new device { type = edit.deviceType, Connection = edit.connection, locked = false });
                dataGridUpdate();
            }
        }

        private void dataGridUpdate()
        {
            List<string> first = new List<string>();
            List<string> second = new List<string>();
            List<string> third = new List<string>();
            List<string> fourth = new List<string>();
            foreach (device device in devices)
            {
                first.Add(device.connection[0]);
                second.Add(device.connection[1]);
                //third.Add(device.connection[2]);
                //fourth.Add(device.connection[3]);
            }

            dataGridViewDevices.ColumnCount = 7;
            dataGridViewDevices.Columns[0].Name = "Device";
            dataGridViewDevices.Columns[1].Name = "1-8";
            dataGridViewDevices.Columns[2].Name = "9-16";
            dataGridViewDevices.Columns[3].Name = "17-24";
            dataGridViewDevices.Columns[4].Name = "25-32";
            dataGridViewDevices.Columns[5].Name = "Name";
            dataGridViewDevices.Columns[6].Name = "locked";
            dataGridViewDevices.Columns["Device"].ReadOnly = true;
            dataGridViewDevices.Columns["Device"].FillWeight = 150;
            dataGridViewDevices.Columns["1-8"].ReadOnly = true;
            dataGridViewDevices.Columns["9-16"].ReadOnly = true;
            dataGridViewDevices.Columns["17-24"].ReadOnly = true;
            dataGridViewDevices.Columns["25-32"].ReadOnly = true;
            dataGridViewDevices.Columns["Name"].AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
            dataGridViewDevices.Columns["Name"].ReadOnly = false;
            dataGridViewDevices.Columns["locked"].Visible = false;

            for (int i = 0; i < devices.Count; i++)
            {
                object[] row = { devices[i].type, devices[i].connection[0], devices[i].connection[1], devices[i].connection[2], devices[i].connection[3], devices[i].name, devices[i].locked };
                dataGridViewDevices.Rows.Add(row);
            }
        }
    }
}
