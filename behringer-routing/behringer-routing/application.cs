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
        private List<Devices> devices = new List<Devices>();
        DeviceTypes[] deviceTypes;

        enum ColumnName
        {
            Device,
            i1_8,
            i9_16,
            i17_24,
            i25_32,
            output,
            name,
            description
        };

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
                return;
            }

            deviceTypes = new DeviceTypes[3];
            deviceTypes[0] = new DeviceTypes("X32 Compact", 16, 8);
            deviceTypes[1] = new DeviceTypes("SD8", 8, 8);
            deviceTypes[2] = new DeviceTypes("SD16", 16, 8);

            devices.Add(new Devices(deviceTypes[0]));   // Add X32 Compact
            devices[0].master = true;
            devices[0].name = "Main Console";
            dataGridCreateColumns();
            dataGridUpdate();
        }

        private void application_Shown(object sender, EventArgs e)
        {

        }

        private void dataGridViewDevices_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void dataGridCreateColumns()
        {
            DataGridViewColumn column;
            DataGridViewColumn comboboxColumn;
            DataGridViewComboBoxCell comboboxCell = new DataGridViewComboBoxCell();
            comboboxCell.Items.Add("1");
            comboboxCell.Items.Add("2");
            comboboxCell.Items.Add("3");

            column = new DataGridViewColumn();
            column.Name = "Device";
            column.ReadOnly = true;
            column.Width = 150;
            column.CellTemplate = new DataGridViewTextBoxCell();
            dataGridViewDevices.Columns.Add(column);
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "1-8";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 85;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCell;
            dataGridViewDevices.Columns.Add(comboboxColumn);
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "9-16";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 85;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCell;
            dataGridViewDevices.Columns.Add(comboboxColumn);
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "17-24";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 85;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCell;
            dataGridViewDevices.Columns.Add(comboboxColumn);
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "25-32";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 85;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCell;
            dataGridViewDevices.Columns.Add(comboboxColumn);
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "Output";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 85;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCell;
            dataGridViewDevices.Columns.Add(comboboxColumn);
            column = new DataGridViewColumn();
            column.Name = "Name";
            column.ReadOnly = false;
            column.Width = 120;
            column.SortMode = DataGridViewColumnSortMode.NotSortable;
            column.CellTemplate = new DataGridViewTextBoxCell();
            dataGridViewDevices.Columns.Add(column);
            column = new DataGridViewColumn();
            column.Name = "Description";
            column.ReadOnly = false;
            column.AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
            column.SortMode = DataGridViewColumnSortMode.NotSortable;
            column.CellTemplate = new DataGridViewTextBoxCell();
            dataGridViewDevices.Columns.Add(column);
        }
        private void dataGridUpdate()
        {
            dataGridViewDevices.Rows.Clear();

            for(int i = 0; i < devices.Count; i++)
            {
                dataGridViewDevices.Rows.Add();
                dataGridViewDevices["Device", i].Value = devices[i].type.name;
                //dataGridViewDevices["locked", 0].Value = devices[0].type.name;
                dataGridViewDevices["Name", i].Value = devices[i].name;
                dataGridViewDevices["Description", i].Value = devices[i].description;
            }
        }

        private void dataGridViewDevices_CellClick(object sender, DataGridViewCellEventArgs e)
        {
        }

        private void SelectRow(int row)
        {
        }

        private void dataGridViewDevices_CellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            switch(dataGridViewDevices.CurrentCell.ColumnIndex)
            {
                case (int)ColumnName.name:
                    devices[dataGridViewDevices.CurrentCell.RowIndex].name = (string)dataGridViewDevices.CurrentCell.Value;
                    break;
                case (int)ColumnName.description:
                    devices[dataGridViewDevices.CurrentCell.RowIndex].description = (string)dataGridViewDevices.CurrentCell.Value;
                    break;
                default:
                    break;
            }
        }

        private void saveToolStripMenuItem_Click(object sender, EventArgs e)
        {
        }

        private void buttonDown_Click(object sender, EventArgs e)
        {
        }

        private void buttonUp_Click(object sender, EventArgs e)
        {
        }

        private void buttonRemove_Click(object sender, EventArgs e)
        {
            int lastIndex = 0;
            for (int i = 0; i < dataGridViewDevices.SelectedRows.Count; i++)
            {
                int index = dataGridViewDevices.SelectedRows[i].Index;
                if (index != 0)
                {
                    devices.RemoveAt(dataGridViewDevices.SelectedRows[i].Index);
                }
                lastIndex = index;
            }
            dataGridUpdate();
            dataGridViewDevices.Rows[0].Selected = false;
            dataGridViewDevices.Rows[lastIndex > dataGridViewDevices.RowCount-1 ? dataGridViewDevices.RowCount - 1 : lastIndex].Selected = true;
        }

        private void buttonAdd_Click(object sender, EventArgs e)
        {
            devices.Add(new Devices(deviceTypes[1]));
            dataGridUpdate();
            dataGridViewDevices.Rows[0].Selected = false;
            dataGridViewDevices.Rows[dataGridViewDevices.RowCount - 1].Selected = true;
        }

        private void buttonSaveSettings_Click(object sender, EventArgs e)
        {
        }
    }
}
