﻿using System;
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

        private List<device> devices = new List<device>();

        public application()
        {
            InitializeComponent();
        }

        private List<device> initDevices()
        {
            List<device> list = new List<device>();
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

        private List<device> saveDevices()
        {
            List<device> list = new List<device>();

            for (int i = 0; i < dataGridViewDevices.Rows.Count-1; i++)
            {
                device device = new device();
                device.connection = new string[4];
                try
                {
                    device.type = dataGridViewDevices.Rows[i].Cells["Device"].Value.ToString();
                }
                catch { }
                for (int j = 0; j < 4; j++)
                {
                    try
                    {
                        device.connection[j] = (dataGridViewDevices.Rows[i].Cells[j+1] as DataGridViewComboBoxCell).Value.ToString();
                    }
                    catch
                    {
                        
                    }
                }
                try
                {
                    device.name = dataGridViewDevices.Rows[i].Cells["Name"].Value.ToString();
                }
                catch
                {
                    device.name = "";
                }
                try
                {
                    device.locked = (bool)dataGridViewDevices.Rows[i].Cells["locked"].Value;
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
                writer.WriteStartElement("devices");
                foreach (device device in devices)
                {
                    writer.WriteStartElement("device");
                    writer.WriteElementString("type", device.type);
                    writer.WriteElementString("locked", device.locked.ToString());
                    writer.WriteElementString("name", device.name);
                    writer.WriteStartElement("connexion");
                    writer.WriteElementString("first", device.connection[0]);
                    writer.WriteElementString("second", device.connection[1]);
                    writer.WriteElementString("third", device.connection[2]);
                    writer.WriteElementString("fourth", device.connection[3]);
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

        }

        private void dataGridUpdate()
        {
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

            string[] connexions = { "AES50A 1-8", "AES50A 9-16", "AES50A 17-24", "AES50A 25-32", "AES50A 33-40", "AES50A 41-48" };
            string[] device = { "SD16", "SD8" };

            for (int i = 0; i < devices.Count; i++)
            {
                if (!devices[i].locked)
                {
                    DataGridViewComboBoxCell cell = new DataGridViewComboBoxCell();
                    cell.Items.AddRange(device);
                    dataGridViewDevices["Device", i] = cell;
                    dataGridViewDevices["Device", i].ReadOnly = false;
                    cell = new DataGridViewComboBoxCell();
                    cell.Items.AddRange(connexions);
                    dataGridViewDevices["1-8", i] = cell;
                    dataGridViewDevices["1-8", i].ReadOnly = false;
                }
                object[] row = { devices[i].type, devices[i].connection[0], devices[i].connection[1], devices[i].connection[2], devices[i].connection[3], devices[i].name, devices[i].locked };
                dataGridViewDevices.Rows.Add(row);
            }
        }

        private void dataGridViewDevices_CellClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void dataGridViewDevices_CellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            devices = saveDevices();
        }

        private void saveToolStripMenuItem_Click(object sender, EventArgs e)
        {
            devices = saveDevices();
            saveXML();
        }
    }
}
