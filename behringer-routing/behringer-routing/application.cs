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
            list.Add(new device { Type = "X32 Local 1-8", Connection = "Local 1-8", locked = true });
            list.Add(new device { Type = "X32 Local 9-16", Connection = "Local 9-16", locked = true });
            if (consoleType != "Behringer X32 Compact")
            {
                list.Add(new device { Type = "X32 Local 17-24", Connection = "Local 17-24", locked = true });
                list.Add(new device { Type = "X32 Local 25-32", Connection = "Local 25-32", locked = true });
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

            using (StreamReader reader = new StreamReader(Path.Combine(workingPath, "settings.brt")))
            {
                consoleType = reader.ReadLine();
            }
            devices = initDevices();
            dataGridViewDevices.DataSource = devices;
            dataGridViewDevices.Columns["locked"].Visible = false;
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
                edit.deviceType = selectedDevice.Type;
                edit.connection = selectedDevice.Connection;
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
                    selectedDevice.Type = edit.deviceType;
                    selectedDevice.Connection = edit.connection;
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
                devices.Add(new device { Type = edit.deviceType, Connection = edit.connection, locked = false });
                dataGridViewDevices.Update();
            }
        }
    }
}
